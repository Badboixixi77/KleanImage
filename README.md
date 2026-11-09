# Klean Image — Creative Printing Solutions Website

Production-ready Next.js website for **Klean Image Creative Printing Solutions**, a printing press at 43 Shipeolu Street, Shomolu, Lagos, Nigeria.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) + TypeScript strict |
| Styling | Tailwind CSS v4 + custom brand tokens |
| UI Components | Custom components (shadcn/ui patterns) |
| Forms | React Hook Form + Zod |
| Database + Storage + Auth | Supabase |
| CMS | Sanity (headless) |
| Email | Resend |
| Analytics | Plausible (privacy-first) |
| Error tracking | Sentry |
| Bot protection | Cloudflare Turnstile |
| Hosting | Vercel |
| DNS | Cloudflare |
| Tests | Vitest (unit) + Playwright (E2E) |

---

## Prerequisites

- **Node.js** ≥ 20 (see `.nvmrc`) — use `nvm use` to switch
- **npm** ≥ 10
- A **Supabase** project (free tier) — [supabase.com](https://supabase.com)
- A **Sanity** project (free tier) — [sanity.io](https://sanity.io)
- A **Resend** account (free tier) — [resend.com](https://resend.com)
- A **Cloudflare** account (free) for DNS + Turnstile

---

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/Badboixixi77/KleanImage.git
cd KleanImage
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in all values. See the [Environment Variables](#environment-variables) table below.

### 3. Run the database migration

In your Supabase project → SQL Editor, paste and run the contents of:

```
supabase/migrations/001_initial_schema.sql
```

This creates all tables, enums, indexes, triggers, and RLS policies.

### 4. Set up Sanity CMS

```bash
cd sanity
npm install
npx sanity deploy    # deploys the Studio to manage.sanity.io
cd ..
```

Then open your Sanity Studio URL and add content for at least one Service so the home page has data to display.

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in each value:

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SITE_URL` | Production URL (no trailing slash) | Your domain |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (safe to expose) | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (**secret**) | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | manage.sanity.io |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (usually `production`) | manage.sanity.io |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version date | Use `2024-01-01` |
| `SANITY_API_TOKEN` | Sanity read/write token (**secret**) | manage.sanity.io → API → Tokens |
| `SANITY_REVALIDATE_SECRET` | Random string to verify CMS webhooks | Generate with `openssl rand -hex 32` |
| `RESEND_API_KEY` | Resend API key (**secret**) | resend.com → API Keys |
| `RESEND_FROM_EMAIL` | Verified sending email address | Resend → Domains |
| `OWNER_EMAIL` | Owner's email to receive quote notifications | Owner to provide |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key | Cloudflare → Turnstile |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key (**secret**) | Cloudflare → Turnstile |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking | sentry.io → Project Settings |
| `SENTRY_AUTH_TOKEN` | Sentry auth token for source maps (CI only) | sentry.io → Settings → Auth Tokens |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Domain registered in Plausible | plausible.io |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps Embed API key | Google Cloud Console |
| `NEXT_PUBLIC_FEATURE_PAYSTACK` | Set `"true"` to enable Phase 2 payments | Keep `"false"` until Phase 2 |

---

## Available Scripts

```bash
npm run dev          # Start local dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server (after build)
npm run lint         # ESLint check
npm run typecheck    # TypeScript check (tsc --noEmit)
npm run format       # Prettier format
npm run test         # Vitest unit tests (single run)
npm run test:watch   # Vitest in watch mode
npm run test:e2e     # Playwright E2E tests
```

---

## Deployment (Vercel + Supabase + Sanity)

### Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add all environment variables from `.env.example` to the Vercel project settings
4. Deploy — Vercel auto-deploys on every push to `main`

### Sanity Revalidation Webhook

After deploying to Vercel:

1. In Sanity: **API → Webhooks → Create webhook**
2. URL: `https://yourdomain.com/api/revalidate`
3. Method: `POST`
4. HTTP Headers: `Authorization: Bearer YOUR_SANITY_REVALIDATE_SECRET`
5. Trigger on: Publish, Unpublish, Delete

### Cloudflare DNS

1. Add your domain to Cloudflare
2. In Vercel: **Settings → Domains → Add your domain**
3. In Cloudflare: create a `CNAME` record pointing to Vercel's DNS target (`cname.vercel-dns.com`)
4. Enable **Proxied** mode in Cloudflare

---

## Project Architecture

See [`design.md`](./design.md) for:
- System context and container diagrams (Mermaid)
- Full folder structure
- Database schema and RLS policies
- API contracts
- Sanity CMS schemas
- Sequence diagrams for key flows
- ADRs (architecture decision records)
- Cost estimate

See [`requirements.md`](./requirements.md) for all functional and non-functional requirements in EARS format.

See [`tasks.md`](./tasks.md) for the implementation task list with acceptance criteria.

---

## TODOs Before Go-Live

The following must be provided by the owner before the site goes live:

- [ ] Real phone number → update `src/config/site.ts`
- [ ] Real email address → update `src/config/site.ts` + `OWNER_EMAIL` env var
- [ ] Social media URLs (Instagram, Facebook, X) → update `src/config/site.ts`
- [ ] Google Business Profile claimed + Maps embed src → update `src/config/site.ts`
- [ ] Real logo PNG → replace `public/logo.svg` with `public/logo.png` and update Navbar + Footer
- [ ] Service prices, specs, MOQ, turnaround times → enter in Sanity CMS
- [ ] Real portfolio photos → enter in Sanity CMS (Gallery)
- [ ] Real customer testimonials → enter in Sanity CMS
- [ ] Team bios and photos → update `src/app/(public)/about/page.tsx`
- [ ] Verified sending domain in Resend → update `RESEND_FROM_EMAIL`
- [ ] CAC registration number → add to Privacy Policy
- [ ] Launch date confirmed

---

## Contributing

Branch naming: `feat/task-N-short-description` or `fix/short-description`  
Commit format: [Conventional Commits](https://www.conventionalcommits.org/) — enforced by Commitlint  
Pre-commit: ESLint + Prettier run automatically via Husky + lint-staged

---

## Owner Handover

See [`OWNER_GUIDE.md`](./OWNER_GUIDE.md) for non-technical instructions on:
- Editing services, prices, and gallery in Sanity
- Managing quote requests in the admin dashboard
- Replying to customers via WhatsApp
