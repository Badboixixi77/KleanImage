-- ============================================================
-- Klean Image — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Run via: Supabase Dashboard → SQL Editor, or supabase db push
-- ============================================================

-- ── Enums ────────────────────────────────────────────────────────────────────

CREATE TYPE quote_status AS ENUM (
  'new',
  'quoted',
  'confirmed',
  'in_production',
  'ready',
  'delivered',
  'cancelled'
);

CREATE TYPE delivery_method AS ENUM ('pickup', 'delivery');

CREATE TYPE admin_role AS ENUM ('owner', 'staff');

-- ── Reference number sequence ─────────────────────────────────────────────────

CREATE SEQUENCE IF NOT EXISTS quote_ref_seq START 1;

-- ── Tables ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS quote_requests (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_number            TEXT NOT NULL UNIQUE,
  service_slug          TEXT NOT NULL,
  service_name          TEXT NOT NULL,
  size                  TEXT,
  quantity              INTEGER NOT NULL CHECK (quantity > 0),
  paper_finish          TEXT,
  finish_options        TEXT,
  deadline              DATE NOT NULL,
  delivery_method       delivery_method NOT NULL DEFAULT 'pickup',
  delivery_area         TEXT,
  customer_name         TEXT NOT NULL,
  customer_phone        TEXT NOT NULL,
  customer_email        TEXT,
  status                quote_status NOT NULL DEFAULT 'new',
  has_artwork           BOOLEAN NOT NULL DEFAULT FALSE,
  artwork_upload_failed BOOLEAN NOT NULL DEFAULT FALSE,
  consent_given         BOOLEAN NOT NULL DEFAULT FALSE,
  honeypot_passed       BOOLEAN NOT NULL DEFAULT TRUE,
  ip_address            INET,
  -- Phase 2 columns (nullable, not used in Phase 1)
  customer_id           UUID,
  paystack_ref          TEXT,
  deposit_paid          BOOLEAN DEFAULT FALSE,
  deposit_amount        NUMERIC(12, 2),
  invoice_pdf_path      TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quote_files (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id            UUID NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
  storage_path        TEXT NOT NULL,
  original_name       TEXT NOT NULL,
  mime_type           TEXT NOT NULL,
  size_bytes          BIGINT NOT NULL,
  virus_scan_status   TEXT NOT NULL DEFAULT 'pending',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quote_status_history (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id      UUID NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
  from_status   quote_status,
  to_status     quote_status NOT NULL,
  changed_by    UUID REFERENCES auth.users(id),
  note          TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_notes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id    UUID NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
  author_id   UUID NOT NULL REFERENCES auth.users(id),
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  TEXT NOT NULL,
  role          admin_role NOT NULL DEFAULT 'staff',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS email_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id        UUID REFERENCES quote_requests(id) ON DELETE SET NULL,
  recipient       TEXT NOT NULL,
  template        TEXT NOT NULL,
  status          TEXT NOT NULL,
  attempt_count   INTEGER NOT NULL DEFAULT 1,
  resend_id       TEXT,
  error_message   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_quote_requests_status    ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created   ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_ref       ON quote_requests(ref_number);
CREATE INDEX IF NOT EXISTS idx_quote_requests_phone     ON quote_requests(customer_phone);
CREATE INDEX IF NOT EXISTS idx_quote_files_quote_id     ON quote_files(quote_id);
CREATE INDEX IF NOT EXISTS idx_qsh_quote_id             ON quote_status_history(quote_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_quote_id     ON admin_notes(quote_id);
CREATE INDEX IF NOT EXISTS idx_email_log_quote_id       ON email_log(quote_id);
CREATE INDEX IF NOT EXISTS idx_email_log_status         ON email_log(status);

-- ── Triggers ─────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_quote_requests_updated_at
BEFORE UPDATE ON quote_requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION generate_ref_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ref_number = 'KI-' || EXTRACT(YEAR FROM now())::TEXT || '-' ||
                   LPAD(nextval('quote_ref_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_quote_ref_number
BEFORE INSERT ON quote_requests
FOR EACH ROW EXECUTE FUNCTION generate_ref_number();

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE quote_requests        ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_files           ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_status_history  ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_log             ENABLE ROW LEVEL SECURITY;

-- Public (anon) can INSERT quotes only
CREATE POLICY "public_insert_quotes"
  ON quote_requests FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated admins have full access to quotes
CREATE POLICY "admin_all_quotes"
  ON quote_requests FOR ALL
  TO authenticated
  USING (true);

-- Status history — admins only
CREATE POLICY "admin_all_status_history"
  ON quote_status_history FOR ALL
  TO authenticated
  USING (true);

-- Admin notes — admins only
CREATE POLICY "admin_all_notes"
  ON admin_notes FOR ALL
  TO authenticated
  USING (true);

-- Admin profiles — each admin reads own; owners manage all
CREATE POLICY "admin_read_own_profile"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "owner_manage_profiles"
  ON admin_profiles FOR ALL
  TO authenticated
  USING (
    (SELECT role FROM admin_profiles WHERE id = auth.uid()) = 'owner'
  );

-- email_log — service role only (no anon/authenticated policy = blocked for non-service-role)
