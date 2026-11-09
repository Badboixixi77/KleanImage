# Tasks — Klean Image Creative Printing Solutions
**Version:** 1.0  
**Date:** 09 November 2026  
**Status:** DRAFT — awaiting client approval

---

## How to read this file

- Tasks are numbered and must be completed in order within each phase unless marked **(parallel ok)**.
- Each task has: **Goal**, **Acceptance Criteria (AC)**, and **Verify** (how to confirm it's done).
- A task is only "done" when every AC passes and the Verify step produces the expected output.
- Commit after every task using conventional commit format: `feat(task-N): description`.

---

## Phase 0 — Project Foundation

### TASK-01 · Initialise Next.js project

**Goal:** Create the Next.js 14+ App Router project with TypeScript strict mode, Tailwind CSS, ESLint, Prettier, and the correct folder structure from design.md.

**Steps:**
1. `npx create-next-app@latest kleanimage --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
2. Add Prettier config (`.prettierrc`) and `eslint-config-prettier`
3. Create the full folder skeleton from design.md section 3 (empty `index.ts` files as placeholders)
4. Set `strict: true` in `tsconfig.json`
5. Add `.nvmrc` with the current LTS Node version

**AC:**
- `npm run build` passes with zero errors
- `npm run lint` passes with zero errors
- `npm run typecheck` (`tsc --noEmit`) passes
- Folder structure matches design.md exactly

**Verify:** Run `npm run build && npm run lint && npx tsc --noEmit`. All three exit 0.

---

### TASK-02 · Configure Tailwind design tokens and fonts

**Goal:** Wire the Klean Image brand colours and typography into Tailwind so every component can use `bg-brand-magenta`, `text-brand-cyan`, etc.

**Steps:**
1. Extend `tailwind.config.ts` with the colour tokens from design.md section 4
2. Add Google Fonts (Inter + Montserrat) via `next/font/google` in `src/app/layout.tsx`
3. Create `src/config/site.ts` with site name, URL, WhatsApp number, address, hours
4. Create `src/config/featureFlags.ts` with `FEATURE_PAYSTACK = false`

**AC:**
- A test page at `/` renders text in Montserrat using `font-display` class
- `bg-brand-magenta` applies `#E91E8C` correctly (inspect in browser)
- No layout shift from font loading (use `display: swap`)

**Verify:** `npm run build` passes. Open dev server, confirm font and colour in browser DevTools.

---

### TASK-03 · Install and configure shadcn/ui

**Goal:** Initialise shadcn/ui and install the baseline component set needed across the site.

**Components to install:** Button, Input, Textarea, Select, Checkbox, Label, Badge, Card, Dialog, Sheet, Separator, Skeleton, Toast/Sonner, Form, Tabs, DropdownMenu

**Steps:**
1. `npx shadcn@latest init` — choose the project's colour scheme
2. Install each component via `npx shadcn@latest add <component>`
3. Confirm all shadcn components use the brand colour CSS variables

**AC:**
- All listed components exist under `src/components/ui/`
- `npm run build` still passes

**Verify:** `npm run build` exits 0. Import `Button` in a test page and confirm it renders.

---

### TASK-04 · Set up Husky, lint-staged, and Commitlint

**Goal:** Enforce code quality and conventional commits on every commit.

**Steps:**
1. `npm install -D husky lint-staged @commitlint/cli @commitlint/config-conventional`
2. `npx husky init`
3. Configure `.husky/pre-commit` to run `npx lint-staged`
4. Configure `.husky/commit-msg` to run `npx --no -- commitlint --edit $1`
5. Add `lint-staged` config to `package.json` — run ESLint + Prettier on staged `.ts/.tsx` files
6. Add `commitlint.config.js`

**AC:**
- A commit with message `bad commit message` is rejected
- A commit with message `feat(test): add test` is accepted
- Committing a file with a lint error is blocked

**Verify:** Make a deliberate lint error in a `.tsx` file, stage it, and attempt to commit. Confirm the pre-commit hook blocks it.

---

### TASK-05 · Configure GitHub Actions CI

**Goal:** Run lint, typecheck, test, and build on every push and pull request.

**Steps:**
1. Create `.github/workflows/ci.yml`
2. Steps: checkout → setup Node (LTS, cached) → `npm ci` → `npm run lint` → `npm run typecheck` → `npm run test` (Vitest) → `npm run build`
3. Add Vitest config (`vitest.config.ts`) with `environment: 'jsdom'`
4. Add a trivial passing test to `src/lib/whatsapp/buildMessage.test.ts` so CI has something to run

**AC:**
- CI passes on the `main` branch with a green badge
- A deliberate lint error in a PR causes CI to fail

**Verify:** Push to a branch and confirm the GitHub Actions workflow runs and passes.

---

### TASK-06 · Configure Supabase project and run migrations

**Goal:** Create Supabase project, run the full DB schema from design.md, enable RLS, and generate TypeScript types.

**Steps:**
1. Create a Supabase project (free tier)
2. Run the SQL from design.md section 5 (enums, tables, indexes, triggers, sequence)
3. Run the RLS policies from design.md section 6
4. Install `supabase` CLI, run `supabase gen types typescript --project-id ... > src/types/supabase.ts`
5. Create `src/lib/supabase/client.ts` (browser) and `src/lib/supabase/server.ts` (server, uses service role)
6. Populate `.env.local` from `.env.example`

**AC:**
- All 6 tables exist in Supabase with correct columns and types
- RLS is enabled on all tables
- `src/types/supabase.ts` is generated and imports without errors
- `npm run typecheck` passes

**Verify:** Open Supabase table editor — confirm all tables. Run `npx tsc --noEmit` — passes.

---

### TASK-07 · Configure Sanity CMS

**Goal:** Create the Sanity project and deploy all 5 schemas so the owner can start entering content.

**Steps:**
1. `npm create sanity@latest` inside `sanity/` directory
2. Create all 5 schema files from design.md section 7 (`service`, `galleryItem`, `testimonial`, `siteSettings`, `faq`)
3. Register schemas in `sanity/schemas/index.ts`
4. Deploy studio: `npx sanity deploy`
5. Add Sanity client, GROQ queries, and image builder to `src/lib/sanity/`
6. Add env vars to `.env.local`

**AC:**
- Sanity Studio is accessible at the deployed URL
- All 5 document types are visible in the Studio
- Creating a test `service` document works and saves
- `src/lib/sanity/client.ts` connects and `npm run typecheck` passes

**Verify:** Open the Studio URL → create a Service document → publish → confirm it appears in the dataset.

---

### TASK-08 · Configure Resend

**Goal:** Set up Resend for transactional email with the owner's sending domain.

**Steps:**
1. Create Resend account (free tier)
2. Add and verify the sending domain (TODO: owner to provide domain — use sandbox for now)
3. Install `resend` and `@react-email/components`
4. Create `src/lib/email/resend.ts` with the Resend client
5. Create placeholder email templates: `quoteConfirmation.tsx` and `quoteNotification.tsx` (real copy — not lorem ipsum except TODO fields)
6. Write a unit test that renders each template and confirms key strings are present

**AC:**
- `src/lib/email/resend.ts` exports a working client
- Both email templates render without errors in tests
- `npm run test` passes

**Verify:** `npm run test` — both email template tests pass.

---

### TASK-09 · Configure Sentry and Plausible

**Goal:** Add error tracking and privacy-first analytics.

**Steps:**
1. `npm install @sentry/nextjs`; run `npx @sentry/wizard@latest -i nextjs`
2. Configure Sentry in `next.config.ts` — disable source map upload in dev
3. Add Plausible script to `src/app/layout.tsx` using `next/script strategy="afterInteractive"`
4. Add `NEXT_PUBLIC_SENTRY_DSN` and `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to `.env.example`

**AC:**
- A deliberate `throw new Error('test')` in a Server Component is captured in Sentry
- Plausible script loads on the home page (verify in Network tab)
- `npm run build` passes

**Verify:** Trigger a test error, check Sentry dashboard. Inspect Network tab for Plausible script.

---

## Phase 1 — Layout and Navigation

### TASK-10 · Build Navbar component

**Goal:** Responsive sticky navigation with logo, links, and CTA button.

**Steps:**
1. Create `src/components/layout/Navbar.tsx`
2. Desktop: logo left, nav links centre, "Get Quote" button right
3. Mobile (≤ 768px): hamburger menu using shadcn Sheet component
4. Active route highlighted using `usePathname()`
5. Logo: use `public/logo.png` as `next/image` with correct dimensions and alt text

**AC:**
- Navbar is sticky (stays visible on scroll)
- Mobile hamburger opens a slide-out drawer with all nav links
- "Get Quote" button links to `/quote`
- Active route link is visually distinct
- Passes keyboard navigation (Tab through all links, Enter to activate)
- Renders correctly at 360 px width

**Verify:** Open at 360 px in DevTools — no horizontal scroll. Tab through all links — focus is visible. Click each nav link — correct page loads.

---

### TASK-11 · Build Footer component

**Goal:** Full-width footer with address, links, and social icons. All placeholder TODO fields clearly marked.

**Steps:**
1. Create `src/components/layout/Footer.tsx`
2. Three-column layout (single column on mobile): About + contact details | Quick links | Services links
3. Bottom bar: copyright, Privacy Policy, Terms, Refund Policy links
4. Social icons (IG, FB, X) from `lucide-react` or inline SVGs — link to `#` as placeholder
5. WhatsApp and phone links use `tel:` and `wa.me/` protocols
6. All TODO fields displayed as "Coming Soon" or similar, with a code comment `// TODO: owner to provide`

**AC:**
- Footer renders on every page (added to root layout)
- All legal page links work
- Click-to-WhatsApp opens `wa.me/2348082996711`
- Renders correctly at 360 px
- Passes colour contrast check (WCAG AA)

**Verify:** Click WhatsApp link — opens correct number. Inspect contrast in browser accessibility tools.

---

### TASK-12 · Build FloatingWhatsApp and MobileCTABar

**Goal:** Floating WhatsApp FAB and sticky mobile bottom bar present on all public pages.

**Steps:**
1. `src/components/layout/FloatingWhatsApp.tsx` — fixed bottom-right circle button, magenta background, WhatsApp icon, default prefilled message
2. Accept a `message` prop so service pages can pass a context-aware message
3. `src/components/layout/MobileCTABar.tsx` — fixed bottom bar, visible only on `md:hidden`, three buttons: Call (`tel:`), WhatsApp (`wa.me/`), Get Quote (`/quote`)
4. Add both to the public route group layout `src/app/(public)/layout.tsx`

**AC:**
- Floating button is not hidden by the mobile bottom bar (z-index managed correctly)
- Both components are absent from admin pages
- Floating button uses `aria-label="Chat with us on WhatsApp"`
- Mobile bar buttons are min 44×44 px touch targets

**Verify:** At 360 px, both elements are visible and tappable. Tab to floating button — focus ring visible. Admin dashboard — neither component present.

---

## Phase 2 — Public Pages (Static / ISR)

### TASK-13 · Build Home page — Hero and ServicesOverview sections

**Goal:** Above-the-fold hero with dual CTAs, and 6-up services overview grid.

**Steps:**
1. `src/components/sections/Hero.tsx` — headline ("Your Vision, Printed Perfectly"), subline, primary CTA "Get a Free Quote" → `/quote`, secondary CTA "See Our Work" → `/gallery`, hero image placeholder
2. `src/components/sections/ServicesOverview.tsx` — fetch active services from Sanity (up to 6), render as responsive card grid with icon, name, short description, "Learn More" link
3. Add skeleton loaders for the services grid (Suspense boundary)
4. Wire both into `src/app/(public)/page.tsx` with ISR `revalidate: 60`

**AC:**
- Hero renders at 360 px without horizontal scroll
- "Get a Free Quote" navigates to `/quote`
- Services grid shows up to 6 cards from Sanity
- Skeleton loaders appear before Sanity data resolves
- Lighthouse Performance ≥ 90 on the hero section alone (LCP image preloaded)

**Verify:** `npm run build` → open built home page → verify services load from Sanity → resize to 360 px → no scroll.

---

### TASK-14 · Build Home page — HowItWorks, FeaturedWork, Testimonials, CtaBanner

**Goal:** Complete the home page below the fold.

**Steps:**
1. `HowItWorks.tsx` — 3 numbered steps with icons: "Tell us what you need", "We prepare your quote", "We print and deliver"
2. `FeaturedWork.tsx` — fetch up to 6 `featured: true` gallery items from Sanity, render as image grid, each linking to `/gallery`
3. `Testimonials.tsx` — fetch active testimonials from Sanity, render as a simple card list or carousel; show name, role, body, star rating
4. `CtaBanner.tsx` — magenta background, "Ready to Print?" headline, "Request a Quote" button + "Chat on WhatsApp" button
5. Compose all sections in `page.tsx`

**AC:**
- All four sections render with real CMS data (or graceful placeholders if no content yet)
- CtaBanner WhatsApp button uses the correct `wa.me` URL
- Page Lighthouse Performance ≥ 90 (throttled 4G)

**Verify:** Add a testimonial in Sanity → trigger ISR revalidation → refresh page → testimonial appears.

---

### TASK-15 · Build Services listing and detail pages

**Goal:** `/services` grid and `/services/[slug]` individual pages with all spec fields.

**Steps:**
1. `src/app/(public)/services/page.tsx` — fetch all active services from Sanity, render as category-filtered grid; ISR `revalidate: 60`
2. `src/app/(public)/services/[slug]/page.tsx` — `generateStaticParams` from Sanity slugs; render service name, description, sizes, paper options, finish options, starting price (₦ formatted or "Request Quote"), turnaround, MOQ
3. "Get a Quote for This" CTA passes `?service=slug` to `/quote`
4. FloatingWhatsApp on service pages passes the service name in the message prop
5. JSON-LD `Service` structured data on each detail page

**AC:**
- `/services` shows all 15 services from the catalogue
- `/services/business-cards` renders correctly (add seed data in Sanity)
- Price displays as "₦3,500" (thousands-separated, ₦ symbol) when set, or "Request Quote" when null
- `?service=business-cards` pre-selects the correct option in the quote form
- JSON-LD is present in the page `<head>`

**Verify:** `npm run build` → `curl` the service page HTML → grep for JSON-LD. Visit `/services/business-cards` → confirm price format.

---

### TASK-16 · Build Gallery page with filters and lightbox

**Goal:** Filterable portfolio grid with accessible lightbox.

**Steps:**
1. `src/app/(public)/gallery/page.tsx` — fetch all gallery items from Sanity; ISR `revalidate: 60`
2. `GalleryFilters.tsx` — client component; category filter pills; "All" selected by default
3. `GalleryGrid.tsx` — responsive masonry or CSS grid; `next/image` with WebP/AVIF; lazy load
4. `Lightbox.tsx` — client component; Dialog (shadcn); focus trap; Escape to close; arrow key navigation between images; visible close button; image alt text displayed

**AC:**
- Filter pills update the visible images without page reload
- Lightbox opens on image click/Enter keypress
- Escape key closes the lightbox
- Screen reader: lightbox has `role="dialog"` and `aria-label`
- At 360 px: grid is single column, no horizontal scroll

**Verify:** Open gallery → click a filter → confirm correct images shown → open lightbox → press Escape → closed. Run with keyboard only — all actions reachable.

---

### TASK-17 · Build About page

**Goal:** Company story, team, machines, and shop photos — all with clear TODOs for real content.

**Steps:**
1. `src/app/(public)/about/page.tsx` — static page (SSG)
2. Sections: CompanyStory, TeamSection, MachinesSection, ShopPhotos, AboutCTA
3. All text content uses real brand copy ("Klean Image Creative Printing Solutions, based in Shomolu, Lagos...") — no lorem ipsum. All missing specifics marked `{/* TODO: owner to provide */}` in JSX comments
4. Hero image: placeholder with correct aspect ratio and alt text

**AC:**
- Page renders without errors
- No lorem ipsum text anywhere on the page
- All image placeholders have descriptive alt text
- CTA section links to `/quote` and `wa.me/2348082996711`

**Verify:** `npm run build` passes. Grep source for "lorem" — zero results.

---

### TASK-18 · Build Contact page

**Goal:** Map, contact details, hours, click-to-call, click-to-WhatsApp.

**Steps:**
1. `src/app/(public)/contact/page.tsx` — static page (SSG)
2. `MapEmbed.tsx` — Google Maps iframe using address string; fallback plain text + "Open in Maps" link if iframe errors; uses `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. Contact details block: address, hours, phone (`tel:` link), WhatsApp (`wa.me/` link), email (`mailto:` link — placeholder until owner provides)
4. Mobile: call and WhatsApp shown as large full-width buttons

**AC:**
- Map loads using address "43 Shipeolu Street, Shomolu, Lagos"
- `tel:`, `wa.me/`, `mailto:` links all correct
- If iframe blocked by CSP, fallback text is displayed
- Buttons are min 44 px height on mobile

**Verify:** Load page on mobile viewport → tap WhatsApp button → correct number opens. Disable iframe in DevTools → fallback text visible.

---

### TASK-19 · Build Legal pages

**Goal:** Privacy Policy, Terms and Conditions, Refund/Reprint Policy — real content, NDPA-aware.

**Steps:**
1. Three static pages: `legal/privacy/page.tsx`, `legal/terms/page.tsx`, `legal/refund-policy/page.tsx`
2. Privacy Policy covers: data collected (name, phone, optional email, artwork), purpose (quote processing), retention (90 days post-delivery), third-party processors (Supabase, Resend, Cloudinary, Sentry, Plausible), customer rights under NDPA 2023, contact for data requests (TODO: owner email)
3. Terms covers: scope, payment terms, IP (customer artwork remains customer's), liability, governing law (Nigeria)
4. Refund Policy covers: conditions for reprint (printing error), refund (unrecoverable error), claims process (must contact within 48 hours)
5. Last-updated date on each page

**AC:**
- All three pages render without errors
- No lorem ipsum
- "Last updated: November 2026" visible on each
- NDPA data processor list is complete

**Verify:** `npm run build` passes. Visit each URL — pages render. Grep for "lorem" — zero results.

---

## Phase 3 — Quote Request Flow

### TASK-20 · Build Zod schemas and phone normalisation

**Goal:** Shared validation schemas used by both the client form and the server route handler.

**Steps:**
1. `src/schemas/phone.ts` — Zod custom refinement that accepts Nigerian phone formats (+234, 080x, 070x, 081x, 090x, 091x) and transforms to E.164
2. `src/schemas/quote.ts` — `QuoteRequestSchema` covering all fields from design.md API contract; `QuoteUpdateSchema` for admin PATCH
3. `src/schemas/uploadFile.ts` — MIME type allowlist and 25 MB size cap
4. Unit tests for phone normalisation covering all valid formats and edge cases

**AC:**
- `+2348082996711` → `+2348082996711` ✓
- `08082996711` → `+2348082996711` ✓
- `07082996711` → `+2347082996711` ✓
- `+44...` → rejected ✗
- `1234` → rejected ✗
- `npm run test` passes for all phone schema tests

**Verify:** `npm run test -- src/schemas/phone.test.ts` — all cases pass.

---

### TASK-21 · Build signed upload URL API route

**Goal:** `GET /api/upload-url` generates a Supabase Storage signed upload URL.

**Steps:**
1. `src/app/api/upload-url/route.ts`
2. Validate `filename` and `mimeType` query params against `uploadFile` Zod schema
3. Generate a storage path: `artwork/{nanoid()}/{sanitised-filename}`
4. Call Supabase `createSignedUploadUrl` (server-side, service role)
5. Rate limit: 5 requests per IP per hour
6. Return `{ uploadUrl, storagePath }`

**AC:**
- Valid request returns 200 with `uploadUrl` and `storagePath`
- Invalid MIME type returns 400 `INVALID_MIME_TYPE`
- 6th request from same IP within an hour returns 429

**Verify:** Use `curl` to call the endpoint with a valid and invalid MIME type — confirm response shapes.

---

### TASK-22 · Build quote submission API route

**Goal:** `POST /api/quotes` — the core endpoint that stores a quote and sends emails.

**Steps:**
1. `src/app/api/quotes/route.ts`
2. Validate Cloudflare Turnstile token (server-to-server POST to Cloudflare API)
3. Check honeypot field is empty
4. Validate full body with `QuoteRequestSchema` (Zod)
5. Rate limit: 10 per IP per hour
6. Normalise phone to E.164
7. INSERT into `quote_requests` using service role client
8. INSERT into `quote_status_history` (null → new)
9. If `artworkStoragePath` provided: INSERT into `quote_files`
10. Send emails via Resend (non-blocking — `Promise.allSettled`, log results to `email_log`)
11. Build and return `whatsappUrl` using `src/lib/whatsapp/buildMessage.ts`
12. Return 201 `{ quoteId, refNumber, whatsappUrl }`

**AC:**
- Valid submission → 201, quote in DB, emails sent (check Resend dashboard)
- Empty honeypot with valid Turnstile → accepted
- Non-empty honeypot → 400 `HONEYPOT_TRIGGERED`, nothing stored
- Failed Turnstile → 400 `TURNSTILE_FAILED`, nothing stored
- Phone `08082996711` stored as `+2348082996711`
- Email failure does NOT cause 500 — still returns 201

**Verify:** Submit a test quote via `curl` → check Supabase table → check Resend dashboard → confirm WhatsApp URL in response is correctly formatted.

---

### TASK-23 · Build multi-step QuoteForm component

**Goal:** The four-step quote form — the primary conversion tool on the site.

**Steps:**
1. `src/components/forms/QuoteForm/index.tsx` — manages step state, React Hook Form with Zod resolver
2. `Step1Product.tsx` — service Select (pre-populated from Sanity), size Input, quantity Input
3. `Step2Finish.tsx` — paper/finish Select, finish options Checkboxes, deadline date picker, delivery method radio + conditional delivery area Input
4. `Step3Contact.tsx` — full name, phone (Nigerian format hint), email (optional), file upload with drag-and-drop; calls `GET /api/upload-url` then uploads directly to Supabase Storage
5. `Step4Review.tsx` — read-only summary of all fields, consent Checkbox, Submit button, "Continue on WhatsApp" button
6. `SuccessScreen.tsx` — shown after successful submit; displays ref number, WhatsApp CTA button, "What happens next" copy
7. `StepIndicator.tsx` — visual step progress (1 of 4)

**AC:**
- Cannot advance past Step 1 without selecting a service and entering a valid quantity ≥ 1
- Cannot advance past Step 3 without a valid Nigerian phone number
- File upload rejects non-allowlisted types with an inline error message
- File upload rejects files > 25 MB with an inline error message
- Consent checkbox must be checked before submit button is enabled
- Success screen shows the ref number from the API response
- WhatsApp button on success screen opens a correctly prefilled message
- Full flow works at 360 px with no horizontal scroll

**Verify:** Complete the full form flow in the browser (dev mode). Upload a `.pdf` file → succeeds. Try a `.exe` file → rejected. Submit → success screen with ref number. Tap WhatsApp button → prefilled message in WhatsApp.

---

### TASK-24 · Wire `?service=slug` pre-selection and context-aware WhatsApp

**Goal:** Service pages pre-select the right service in the quote form and pass the service name to the WhatsApp button.

**Steps:**
1. In `QuoteForm`, read `useSearchParams()` on mount; if `?service=slug` present, set the service field default value
2. In `src/lib/whatsapp/buildMessage.ts`, accept a `context` param: `{ type: 'service'; serviceName: string }` and build the prefilled message
3. Pass `context` from service detail page to `FloatingWhatsApp` via a prop
4. Unit test `buildMessage` covering default message, service context, and quote summary context

**AC:**
- Visiting `/quote?service=business-cards` pre-selects "Business Cards" in Step 1
- FloatingWhatsApp on `/services/business-cards` sends "Hello Klean Image, I'm interested in Business Cards printing"
- `buildMessage` unit tests pass

**Verify:** Visit `/services/business-cards` → click floating WhatsApp → verify prefilled message. Visit `/quote?service=business-cards` → Step 1 has Business Cards selected.

---

## Phase 4 — SEO and Metadata

### TASK-25 · Add per-page metadata, Open Graph, and JSON-LD

**Goal:** Every page has unique title, description, OG tags, and structured data where applicable.

**Steps:**
1. Create `src/lib/metadata.ts` helper that builds `Metadata` objects from a page-specific config
2. Add `generateMetadata()` export to: Home, Services listing, each Service detail, Gallery, About, Contact, Quote, all Legal pages
3. Home: JSON-LD `LocalBusiness` (name, address, telephone, openingHours, geo — lat/lng for 43 Shipeolu Street Shomolu)
4. Service detail: JSON-LD `Service`
5. Default OG image: `public/og-default.jpg` (1200×630, magenta branded)
6. `src/app/sitemap.ts` — generates `sitemap.xml` with all public pages + service pages
7. `public/robots.txt` — allow all public, disallow `/admin`

**AC:**
- `<title>` on home page: "Klean Image — Creative Printing Solutions in Lagos"
- `<meta name="description">` is present and unique on every page
- `og:image` resolves to a real image URL
- `sitemap.xml` is accessible at `/sitemap.xml` and lists all service pages
- `robots.txt` disallows `/admin`
- JSON-LD on home page passes Google Rich Results Test

**Verify:** `npm run build` → `curl https://localhost:3000/sitemap.xml` → all service slugs present. Paste home page URL into Google Rich Results Test (or use the validator locally).

---

### TASK-26 · Image optimisation and performance budget

**Goal:** All images served as WebP/AVIF, lazy-loaded, within the 150 KB JS budget.

**Steps:**
1. Configure `next.config.ts`: `images.formats: ['image/avif', 'image/webp']`, add Sanity CDN and Supabase to `images.remotePatterns`
2. Audit every `<img>` tag — replace with `next/image`
3. Hero image: `priority={true}` to avoid LCP penalty
4. Run `npm run build` and inspect the bundle analyser output (add `@next/bundle-analyzer`)
5. If any public page chunk exceeds 150 KB gzipped, identify and fix (dynamic import, tree-shake)

**AC:**
- Zero `<img>` tags outside of `next/image` in public pages
- First Load JS on home page ≤ 150 KB (shown in `next build` output)
- Lighthouse Performance ≥ 90 on throttled 4G (run with `npx lighthouse` or Chrome DevTools)

**Verify:** `npm run build` output — inspect "First Load JS" column. Run Lighthouse on home page.

---

## Phase 5 — Admin Dashboard

### TASK-27 · Admin auth — login page and route guard

**Goal:** Protect all `/admin` routes; only authenticated admins can access them.

**Steps:**
1. `src/app/(admin)/admin/login/page.tsx` — email + password form, Supabase Auth `signInWithPassword`
2. `src/app/(admin)/layout.tsx` — server-side session check using Supabase server client; redirect to `/admin/login` if not authenticated
3. Lockout: after 3 failed attempts in 5 minutes, show lockout message (track client-side; Supabase handles server-side rate limiting natively)
4. Session expiry: Supabase JWT default is 1 hour with refresh token; set `AUTH_SESSION_TIMEOUT` to 8 hours by configuring the Supabase project Auth settings
5. `AdminShell.tsx` — sidebar layout with: Quotes (link), Settings (owner only), Sign Out button

**AC:**
- `GET /admin/quotes` unauthenticated → redirects to `/admin/login`
- Valid credentials → redirected to `/admin/quotes`
- Invalid credentials ×3 → lockout message shown
- Sign Out clears session and redirects to `/admin/login`

**Verify:** Clear cookies → visit `/admin/quotes` → redirected to login. Sign in → `/admin/quotes` accessible. Sign out → `/admin/quotes` redirects again.

---

### TASK-28 · Build admin quote dashboard list view

**Goal:** Paginated, filterable list of all quote requests.

**Steps:**
1. `src/app/api/quotes/route.ts` — GET handler: auth check, query params (`status`, `page`, `perPage`, `search`), Supabase query with RLS
2. `src/app/(admin)/admin/quotes/page.tsx` — server component; fetch quotes; render `QuoteTable`
3. `QuoteTable.tsx` — columns: ref number, customer name, service, quantity, date, status badge; clicking a row navigates to detail
4. `QuoteFilters.tsx` — client component; status tab bar, search input; updates URL query params
5. Pagination controls (prev/next)
6. `ExportCsvButton.tsx` — calls `GET /api/export-quotes`, triggers download

**AC:**
- Dashboard loads with all quotes, newest first
- Clicking "New" tab shows only `status = 'new'` quotes
- Search by name or ref number filters the list
- Export CSV button downloads a valid CSV with correct columns
- Status badges are colour-coded (New = blue, In Production = amber, Delivered = green, Cancelled = red)

**Verify:** Submit 3 test quotes with different statuses → open dashboard → filter by each status → confirm correct rows. Export CSV → open in spreadsheet → correct data.

---

### TASK-29 · Build admin quote detail view

**Goal:** Full quote detail with artwork download, status update, notes, and communication links.

**Steps:**
1. `src/app/api/quotes/[id]/route.ts` — GET: fetch quote + files (signed URLs, 10 min expiry) + history + notes; PATCH: update status + insert history + optional note
2. `src/app/(admin)/admin/quotes/[id]/page.tsx` — compose all sub-components
3. `QuoteSummaryCard.tsx` — all submitted fields, formatted (₦ price, DD/MM/YYYY date, E.164 → local phone format for display)
4. `ArtworkSection.tsx` — list of uploaded files with signed download links; "No artwork uploaded" if none
5. `StatusUpdateForm.tsx` — status Select + optional note Textarea + Save button; optimistic UI update
6. `StatusHistory.tsx` — timeline list of all status changes with timestamp and admin name
7. `AdminNotes.tsx` — list of notes + `AdminNoteForm.tsx` to add a new note
8. `ContactActions.tsx` — "Reply on WhatsApp" (`wa.me/[phone]?text=...` with ref number) + "Send Email" (`mailto:`)

**AC:**
- Status can be updated from "New" to any valid next status
- Status history shows the change immediately after saving
- Artwork signed URL downloads the correct file
- WhatsApp reply link opens with ref number prefilled
- Staff role can update status; owner role can do everything

**Verify:** Open a quote → update status → history timeline shows new entry → click artwork download → file downloads. Confirm staff-role user can update status but cannot access Settings.

---

### TASK-30 · Build CSV export route

**Goal:** `GET /api/export-quotes` returns a correctly formatted CSV.

**Steps:**
1. `src/app/api/export-quotes/route.ts` — auth check (owner role only), query Supabase with same filters as dashboard, serialise using `src/lib/csv/exportQuotes.ts`
2. CSV columns: Ref Number, Date, Customer Name, Phone, Email, Service, Quantity, Size, Paper/Finish, Deadline, Delivery Method, Delivery Area, Status, Consent Given
3. Dates in DD/MM/YYYY format, prices in ₦ without symbols (raw number), phone in E.164

**AC:**
- Staff role receives 403
- Owner role receives a valid CSV file download
- CSV opens correctly in Excel and Google Sheets
- Phone numbers in CSV are in E.164 format

**Verify:** Download CSV as owner → open in Google Sheets → confirm column headers and data. Attempt download as staff → 403.

---

## Phase 6 — Testing

### TASK-31 · Write Vitest unit tests

**Goal:** Unit test coverage for all pure logic functions.

**Test targets:**
1. `src/schemas/phone.ts` — all valid/invalid Nigerian phone formats (already started in TASK-20)
2. `src/lib/whatsapp/buildMessage.ts` — all context types
3. `src/lib/csv/exportQuotes.ts` — correct CSV output for a known input
4. `src/lib/email/templates/` — both templates render without errors
5. `src/schemas/quote.ts` — happy path and all validation error cases
6. `src/schemas/uploadFile.ts` — MIME allowlist and size cap

**AC:**
- All tests pass (`npm run test`)
- Zero skipped tests
- Each function has at least one test for a valid input and one for each invalid case

**Verify:** `npm run test -- --reporter=verbose` — all green.

---

### TASK-32 · Write Playwright end-to-end tests

**Goal:** E2E tests covering the three most critical user flows.

**Test files:**
1. `e2e/quote-flow.spec.ts` — complete the four-step quote form with a file upload; assert success screen shows ref number and WhatsApp CTA
2. `e2e/admin-login.spec.ts` — unauthenticated redirect; successful login; access quote dashboard; update a quote status; log out
3. `e2e/navigation.spec.ts` — visit home, services, gallery, about, contact; assert no console errors; assert correct page titles

**AC:**
- All three spec files pass against the dev server (`npm run dev`)
- Tests run in CI (`npm run test:e2e`)
- No flaky tests (run 3 times consecutively)

**Verify:** `npx playwright test` — all tests pass. Run 3 times — no failures.

---

## Phase 7 — Deployment

### TASK-33 · Deploy to Vercel

**Goal:** Production deployment on Vercel with all environment variables set.

**Steps:**
1. Push repository to GitHub
2. Connect GitHub repo to Vercel project
3. Add all production environment variables from `.env.example` to Vercel dashboard
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain
5. Configure Sanity webhook: Sanity → `POST https://[domain]/api/revalidate` with Bearer token
6. Run `vercel --prod` or merge to `main` to trigger deployment
7. Confirm CI/CD pipeline: push to `main` → GitHub Actions CI → Vercel deploy

**AC:**
- Production URL loads the home page
- `/api/health` returns `{ status: "ok" }`
- `/sitemap.xml` is accessible
- `/admin/quotes` redirects to login when unauthenticated
- No secrets in the client bundle (`window.__NEXT_DATA__` must not contain any key from the secret list)

**Verify:** Open production URL → check all pages load. Run `curl [url]/api/health`. Inspect `window.__NEXT_DATA__` in browser console — no API keys present.

---

### TASK-34 · Configure Cloudflare DNS and security

**Goal:** Point the domain to Vercel via Cloudflare; confirm security headers.

**Steps:**
1. Add the domain to Vercel (Settings → Domains)
2. In Cloudflare: set DNS CNAME records to Vercel's DNS targets; enable proxied mode
3. Enable Cloudflare "Always Use HTTPS"
4. Verify security headers using `https://securityheaders.com`
5. Set up Cloudflare Turnstile for the production domain

**AC:**
- Domain resolves to the Vercel deployment
- `https://securityheaders.com` scan returns grade A or better
- HSTS header present with `max-age=63072000`
- Turnstile widget works on the quote form in production

**Verify:** Run `https://securityheaders.com` on the production domain — grade A. Submit a quote in production — Turnstile completes.

---

## Phase 8 — Seed Data and Documentation

### TASK-35 · Create seed data and sample CMS content

**Goal:** The site looks complete and professional in both dev and staging.

**Steps:**
1. Create a Sanity seed script (`sanity/seed.ts`) that creates:
   - All 15 services with real descriptions, placeholder starting prices, and turnaround times
   - 12 gallery items across all categories (using royalty-free print-industry stock images, clearly labelled `TODO: replace with real photos`)
   - 4 testimonials (clearly labelled `TODO: replace with real customer reviews`)
   - 1 siteSettings document with all known values filled and TODO fields marked
   - 5 FAQs
2. Create a Supabase seed SQL file `supabase/seed.sql` with 5 sample quote requests in various statuses

**AC:**
- Running `npx ts-node sanity/seed.ts` populates all content
- Home page, services page, and gallery all look visually complete
- No lorem ipsum anywhere
- Seed images are clearly watermarked or labelled as placeholders

**Verify:** Run seed → open home page in browser → all sections populated → no empty states.

---

### TASK-36 · Write README.md

**Goal:** Complete developer setup guide.

**Sections:**
1. Project overview (one paragraph)
2. Prerequisites (Node version, Supabase CLI, Sanity CLI)
3. Local setup (step-by-step clone → install → env vars → DB migration → Sanity → run dev)
4. Environment variables table (variable name, description, where to get it)
5. Available scripts (`dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`)
6. Deployment steps (Vercel + Supabase + Sanity)
7. Architecture overview (link to `design.md`)
8. Contributing guide (branch naming, commit format)

**AC:**
- A developer with no prior context can set up the project locally following only the README
- All environment variables are documented
- No secrets in the README

**Verify:** Ask a second developer (or follow the README yourself in a clean directory) — setup completes without any undocumented steps.

---

### TASK-37 · Write owner handover guide

**Goal:** Non-technical guide for the Klean Image owner.

**File:** `OWNER_GUIDE.md`

**Sections:**
1. Logging into Sanity (with screenshots placeholders)
2. Editing a service (name, price, description, images)
3. Adding a gallery photo
4. Adding a testimonial
5. Editing business hours or contact details
6. Logging into the admin dashboard
7. Managing a quote: viewing, updating status, adding notes, replying on WhatsApp
8. Exporting quotes to Excel
9. What to do when something looks wrong (contact developer — TODO: developer contact)

**AC:**
- Every step uses plain English with no technical jargon
- Each section has numbered steps
- No lorem ipsum

**Verify:** Read through as a non-technical person — every step is clear without prior knowledge.

---

## Summary Table

| Phase | Tasks | Description |
|-------|-------|-------------|
| 0 — Foundation | 01–09 | Project init, tooling, integrations |
| 1 — Layout | 10–12 | Navbar, Footer, WhatsApp FAB, Mobile CTA |
| 2 — Public Pages | 13–19 | All public-facing pages |
| 3 — Quote Flow | 20–24 | Form, API, validation, WhatsApp integration |
| 4 — SEO | 25–26 | Metadata, JSON-LD, sitemap, performance budget |
| 5 — Admin | 27–30 | Auth, dashboard, detail view, CSV export |
| 6 — Testing | 31–32 | Vitest unit tests, Playwright E2E |
| 7 — Deployment | 33–34 | Vercel, Cloudflare DNS, security headers |
| 8 — Docs & Seed | 35–37 | Seed data, README, owner guide |

**Total tasks: 37**  
**Estimated implementation time: 8–12 working days**

---

*End of tasks.md v1.0*
