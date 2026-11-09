# Requirements — Klean Image Creative Printing Solutions
**Format:** EARS (Easy Approach to Requirements Syntax)  
**Version:** 1.1  
**Date:** 09 November 2026  
**Status:** DRAFT — awaiting client approval

**Changelog:** v1.1 — Added complete 15-service catalogue (Brand Design, Box Branding, Amazing Souvenirs, Business Branding added to original list)

---

## 0. Project Glossary

| Term | Definition |
|------|-----------|
| Quote Request | A customer-submitted form requesting a price estimate for a print job |
| Artwork | Customer-supplied design files uploaded with a quote request |
| Admin | The Klean Image owner or authorised staff member with dashboard access |
| CMS | Sanity headless CMS — used by the owner to edit content without a developer |
| ISR | Incremental Static Regeneration — Next.js feature for cached, fast public pages |
| WhatsApp CTA | A `wa.me` deep-link that opens WhatsApp with a prefilled message |
| Feature Flag | A runtime toggle that enables/disables Phase 2 Paystack features without a code deploy |

---

## 1. Business Context

**Client:** Klean Image Creative Printing Solutions  
**Address:** 43, Shipeolu Street, Shomolu, Lagos, Nigeria  
**WhatsApp:** +2348082996711  
**Phone:** TODO: owner to provide  
**Email:** TODO: owner to provide  
**Hours:** Monday – Friday 8:00 am – 6:00 pm WAT; Saturday 9:00 am – 4:00 pm WAT; Sunday Closed  
**Social:** TODO: owner to provide Instagram, Facebook, X handles  
**Google Maps:** TODO: owner to claim Google Business Profile and provide Place ID  

**Primary objective:** Increase WhatsApp enquiries and quote requests from Nigerian individuals, SMEs, churches, schools, and event planners.  
**Secondary objective:** Rank locally for "printing press in Shomolu / Lagos" and establish online credibility.

---

## 2. Stakeholders and User Roles

| Role | Description |
|------|-------------|
| Visitor | Any unauthenticated public user browsing the site |
| Customer | A visitor who submits a quote request |
| Admin (Owner) | Authenticated owner who manages quotes and content |
| Staff (optional) | Authenticated employee with read/write on quotes, no settings access |

---

## 3. Functional Requirements

### 3.1 Navigation and Global UI

**REQ-NAV-01** — UBIQUITOUS  
The system shall display a sticky top navigation bar on every page containing the Klean Image logo, links to Home, Services, Gallery, About, and Contact, and a prominent "Get Quote" button.

**REQ-NAV-02** — UBIQUITOUS  
The system shall display a floating WhatsApp button on every public page that, when activated, opens WhatsApp with a context-aware prefilled message (default: "Hello Klean Image, I'd like to enquire about your printing services").

**REQ-NAV-03** — UBIQUITOUS  
On mobile viewports (≤ 768 px), the system shall display a sticky bottom action bar containing three tappable buttons: Call, WhatsApp, and Get Quote.

**REQ-NAV-04** — UBIQUITOUS  
The system shall display a footer on every page containing: address, WhatsApp link, phone, email, social media links, navigation links, Privacy Policy link, Terms link, and a copyright notice.  
*(All contact fields marked TODO shall render as placeholders until the owner provides real values.)*

---

### 3.2 Home Page

**REQ-HOME-01** — WHEN a visitor lands on the home page, the system shall display a hero section with a headline, a one-line value proposition, a primary "Get a Free Quote" CTA button, and a secondary "See Our Work" CTA button.

**REQ-HOME-02** — WHEN a visitor lands on the home page, the system shall display a services overview section listing at least six service categories, each with an icon, name, and short description, and each linking to the corresponding service page.

**REQ-HOME-03** — WHEN a visitor lands on the home page, the system shall display a "How It Works" section with exactly three numbered steps: (1) Tell us what you need, (2) We prepare your quote, (3) We print and deliver.

**REQ-HOME-04** — WHEN a visitor lands on the home page, the system shall display a "Featured Work" section showing a curated grid of up to six portfolio images sourced from the CMS gallery.

**REQ-HOME-05** — WHEN a visitor lands on the home page, the system shall display a testimonials section showing customer reviews sourced from the CMS, each displaying the reviewer's name, company or role, and review text.

**REQ-HOME-06** — WHEN a visitor lands on the home page, the system shall display a final CTA banner with a "Request a Quote" button and a "Chat on WhatsApp" button before the footer.

---

### 3.3 Services

**REQ-SVC-00** — The system shall support the following complete service catalogue (each maps to a CMS service record and an individual service page):

| # | Service | Category |
|---|---------|----------|
| 1 | Business Cards | Print |
| 2 | Flyers & Leaflets | Print |
| 3 | Banners & Flex | Large Format |
| 4 | Stickers & Labels | Print |
| 5 | Branded T-Shirts | Branded Merchandise |
| 6 | Branded Caps | Branded Merchandise |
| 7 | Branded Mugs | Branded Merchandise |
| 8 | Calendars | Print |
| 9 | Wedding & Event Materials | Events |
| 10 | Packaging | Packaging |
| 11 | ID Cards | Print |
| 12 | Brand Design (logo, brand identity, visual design) | Design Services |
| 13 | Box Branding (custom-printed packaging boxes) | Packaging |
| 14 | Amazing Souvenirs (custom promotional items) | Branded Merchandise |
| 15 | Business Branding (stationery sets, brand kits, corporate identity materials) | Design Services |

*(Prices, specs, MOQ, and turnaround times for each service are TODO: owner to provide.)*

**REQ-SVC-01** — WHEN a visitor navigates to the Services page, the system shall display all active service categories retrieved from the CMS as a grid of cards, each showing a thumbnail, service name, short description, and a "Learn More" link.

**REQ-SVC-02** — WHEN a visitor navigates to an individual service page, the system shall display: service name, description, available size options, paper/material/finish options, starting price (or "Request Quote" if no price is set), typical turnaround time, minimum order quantity, and a "Get a Quote for This" CTA button.

**REQ-SVC-03** — WHEN a visitor activates "Get a Quote for This" on a service page, the system shall navigate to the quote request form with the relevant service pre-selected.

**REQ-SVC-04** — WHERE a service page is active, the floating WhatsApp button shall prefill the message with the specific service name (e.g. "Hello Klean Image, I'm interested in Business Cards").

**REQ-SVC-05** — WHILE the CMS is unreachable, the system shall display a cached or static fallback version of the service pages rather than an error page.

---

### 3.4 Gallery / Portfolio

**REQ-GAL-01** — WHEN a visitor navigates to the Gallery page, the system shall display a filterable grid of portfolio images sourced from the CMS, with filter buttons for each category (e.g. Business Cards, Banners, T-Shirts, Events, Packaging).

**REQ-GAL-02** — WHEN a visitor activates a filter, the system shall update the visible images without a full page reload, showing only images matching the selected category.

**REQ-GAL-03** — WHEN a visitor clicks or taps a gallery image, the system shall open a lightbox displaying the full image, the item title, and navigation arrows to move between images.

**REQ-GAL-04** — WHEN the lightbox is open, the system shall trap keyboard focus within the lightbox and allow dismissal via the Escape key or a visible close button.

---

### 3.5 About Page

**REQ-ABOUT-01** — WHEN a visitor navigates to the About page, the system shall display: a company story section, a team/staff section (names, roles, optional photos), a machines/equipment section, and a shop/facility photos section.

**REQ-ABOUT-02** — WHEN a visitor navigates to the About page, the system shall display a CTA block encouraging visitors to request a quote or contact the business.

---

### 3.6 Contact Page

**REQ-CON-01** — WHEN a visitor navigates to the Contact page, the system shall display: an embedded Google Maps map centred on 43 Shipeolu Street, Shomolu, Lagos; the full address; business hours; a click-to-call phone link; a click-to-WhatsApp link; and the email address.

**REQ-CON-02** — WHEN the Google Maps embed fails to load, the system shall display the address as plain text with a fallback "Open in Google Maps" text link.

**REQ-CON-03** — WHEN a visitor views the Contact page on a mobile device, the click-to-call and click-to-WhatsApp elements shall be styled as large, easily tappable buttons.

---

### 3.7 Quote Request Flow

**REQ-QR-01** — WHEN a visitor activates any "Get a Quote" CTA, the system shall display a multi-step quote request form with the following steps:
- **Step 1 — Product:** service type (pre-selected if coming from a service page), size or dimensions, quantity
- **Step 2 — Finish & Deadline:** paper/material, finish options, required deadline (date picker), delivery method (pickup or delivery; delivery requires city/area input)
- **Step 3 — Contact:** full name, phone number (Nigerian formats accepted), email (optional), optional artwork file upload
- **Step 4 — Review:** summary of all entries, consent checkbox, submit button and "Continue on WhatsApp" button

**REQ-QR-02** — WHILE the customer is completing the form, the system shall validate each step before allowing progression to the next, showing inline error messages in plain English.

**REQ-QR-03** — WHEN a customer submits the form, the system shall:
1. Validate all fields server-side
2. Store the quote request in Supabase
3. Send a confirmation email to the customer (if email was provided) via Resend
4. Send a notification email to the owner via Resend
5. Display a success screen with a "Continue on WhatsApp" button containing a prefilled message summarising the request

**REQ-QR-04** — WHEN the "Continue on WhatsApp" button is activated, the system shall open `wa.me/2348082996711` with a prefilled message containing: the customer's name, service requested, quantity, size, finish, deadline, and delivery method.

**REQ-QR-05** — IF email delivery fails, the system shall still store the quote in Supabase, log the email failure, retry up to three times, and not display an error to the customer.

**REQ-QR-06** — IF Supabase storage is unavailable at upload time, the system shall accept the submission without the file, record the failure in the quote record, and notify the admin to request the artwork separately.

**REQ-QR-07** — WHEN a customer uploads an artwork file, the system shall accept only the following MIME types: PDF, PNG, JPG/JPEG, AI, PSD, CDR, ZIP; and reject files exceeding 25 MB with a clear error message.

**REQ-QR-08** — WHEN a customer uploads a file, the system shall use a signed upload URL so the file is sent directly to Supabase Storage without passing through the server.

**REQ-QR-09** — WHILE a customer is on Step 4 (Review), the system shall display a consent checkbox with text: "I agree to the Privacy Policy and consent to Klean Image storing my contact details and artwork to process this quote request." The form must not be submitted unless this checkbox is checked.

**REQ-QR-10** — WHEN the form is rendered, the system shall include a hidden honeypot field and integrate Cloudflare Turnstile for bot detection. Submissions that fail either check shall be silently discarded and logged.

---

### 3.8 Legal Pages

**REQ-LEGAL-01** — The system shall provide a Privacy Policy page compliant with the Nigeria Data Protection Act (NDPA) 2023, covering: data collected, purpose, retention period, third-party processors (Supabase, Resend, Cloudinary, Sentry, Plausible/GA4), customer rights, and contact for data requests.

**REQ-LEGAL-02** — The system shall provide a Terms and Conditions page covering: scope of service, payment terms, intellectual property (customer artwork), limitation of liability, and governing law (Federal Republic of Nigeria).

**REQ-LEGAL-03** — The system shall provide a Refund and Reprint Policy page as a standalone page linked from the footer, covering conditions for reprint, conditions where refund is applicable, and the claims process.

---

### 3.9 Admin — Authentication

**REQ-AUTH-01** — WHEN an unauthenticated user attempts to access any `/admin` route, the system shall redirect them to the admin login page.

**REQ-AUTH-02** — WHEN an admin enters valid credentials on the login page, the system shall authenticate via Supabase Auth and redirect to the quote dashboard.

**REQ-AUTH-03** — WHEN an admin enters invalid credentials three times within five minutes, the system shall display a lockout message and prevent further attempts for five minutes.

**REQ-AUTH-04** — The system shall support two roles: `owner` (full access) and `staff` (read/write on quotes, no access to settings or user management).

**REQ-AUTH-05** — WHEN an authenticated admin session is idle for more than 8 hours, the system shall automatically log out the user and redirect to the login page.

---

### 3.10 Admin — Quote Dashboard

**REQ-DASH-01** — WHEN an admin views the quote dashboard, the system shall display a paginated list of all quote requests, showing: reference number, customer name, service, quantity, submission date, and current status.

**REQ-DASH-02** — WHEN an admin applies a status filter, the system shall display only quotes matching the selected status: New, Quoted, Confirmed, In Production, Ready, Delivered, or Cancelled.

**REQ-DASH-03** — WHEN an admin opens a quote detail view, the system shall display: all submitted fields, uploaded artwork (with a signed download link), status history with timestamps, internal admin notes, and action buttons.

**REQ-DASH-04** — WHEN an admin updates a quote status, the system shall record the old status, new status, timestamp, and acting admin ID in a `quote_status_history` table.

**REQ-DASH-05** — WHEN an admin saves an internal note on a quote, the system shall store the note with a timestamp and the admin's ID, and display the full note history on the quote detail page.

**REQ-DASH-06** — WHEN an admin activates "Reply by WhatsApp" on a quote, the system shall open `wa.me/[customer_phone]` with a prefilled message containing the quote reference number and the customer's name.

**REQ-DASH-07** — WHEN an admin activates "Reply by Email" on a quote, the system shall open a pre-populated email compose dialog (using the `mailto:` protocol or a modal) addressed to the customer's email, if provided.

**REQ-DASH-08** — WHEN an admin activates "Export to CSV", the system shall generate and download a CSV file containing all currently filtered quotes with all fields except artwork binary data.

---

### 3.11 Phase 2 — Design Only, Not Built

**REQ-P2-01** — The database schema and API route structure shall include placeholder design for: customer accounts (Supabase Auth, customer role), order tracking page (public, token-authenticated), Paystack deposit payment flow, and invoice PDF generation.

**REQ-P2-02** — All Phase 2 routes and UI components shall be guarded behind a `NEXT_PUBLIC_FEATURE_PAYSTACK=false` feature flag so they are unreachable unless the flag is explicitly enabled.

---

## 4. Non-Functional Requirements

### 4.1 Performance

**REQ-PERF-01** — Public pages shall achieve Lighthouse scores of ≥ 90 for Performance, Accessibility, Best Practices, and SEO when tested on a simulated throttled 4G (Slow 4G) profile.

**REQ-PERF-02** — The JavaScript bundle delivered to the browser on first load of any public page shall not exceed 150 KB (gzipped).

**REQ-PERF-03** — All images shall be served in WebP or AVIF format, lazy-loaded below the fold, and sized responsively using `next/image`.

**REQ-PERF-04** — Public pages shall be statically generated (SSG) or use ISR with a revalidation interval of no more than 60 seconds, triggered by CMS webhooks.

---

### 4.2 Accessibility

**REQ-A11Y-01** — All interactive elements shall be keyboard-navigable with visible focus indicators meeting WCAG 2.1 AA contrast requirements.

**REQ-A11Y-02** — All images shall have descriptive `alt` text. Decorative images shall have `alt=""`.

**REQ-A11Y-03** — All form fields shall have associated `<label>` elements. Error messages shall be associated via `aria-describedby`.

**REQ-A11Y-04** — Colour contrast for text on backgrounds shall meet a minimum ratio of 4.5:1 for normal text and 3:1 for large text (WCAG 2.1 AA).

**REQ-A11Y-05** — The site shall be operable at 360 px viewport width without horizontal scrolling.

---

### 4.3 SEO

**REQ-SEO-01** — Every page shall have a unique `<title>`, `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`), and a canonical URL.

**REQ-SEO-02** — The site shall generate a `sitemap.xml` listing all public pages and service pages, updated on each CMS publish.

**REQ-SEO-03** — The site shall include a `robots.txt` that allows all public pages and disallows all `/admin` routes.

**REQ-SEO-04** — The home page shall include JSON-LD structured data for `LocalBusiness` (name, address, telephone, opening hours, geo coordinates).

**REQ-SEO-05** — Each service page shall include JSON-LD structured data for `Service` (name, description, provider, areaServed).

**REQ-SEO-06** — All URL slugs shall be lowercase, hyphenated, and human-readable (e.g. `/services/business-cards`).

---

### 4.4 Security

**REQ-SEC-01** — Every API route handler shall validate and sanitise all inputs server-side using shared Zod schemas, regardless of client-side validation.

**REQ-SEC-02** — The quote submission endpoint shall be rate-limited to 10 requests per IP per hour.

**REQ-SEC-03** — All Supabase tables shall have Row Level Security (RLS) policies enabled. Public users shall have INSERT-only access to `quote_requests`; admin users shall have full access via a service role key used only server-side.

**REQ-SEC-04** — Artwork files shall be uploaded to a private Supabase Storage bucket via signed URLs. Direct public URLs shall not be exposed; admin download links shall be time-limited signed URLs.

**REQ-SEC-05** — A virus-scan hook placeholder shall be included in the upload pipeline, commented and documented, ready to be wired to a real scanner in Phase 2.

**REQ-SEC-06** — The following HTTP security headers shall be set on every response: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.

**REQ-SEC-07** — No secret keys, service role keys, or API tokens shall be present in the client-side JavaScript bundle. Environment variables prefixed `NEXT_PUBLIC_` shall contain only non-secret values.

**REQ-SEC-08** — The admin session cookie shall be `HttpOnly`, `Secure`, and `SameSite=Lax`.

---

### 4.5 Privacy

**REQ-PRIV-01** — The quote request form shall collect the minimum personal data required: name, phone, optional email, optional artwork. It shall not collect data beyond what is listed in REQ-QR-01.

**REQ-PRIV-02** — Uploaded artwork files in Supabase Storage shall be retained for a maximum of 90 days after quote status is set to "Delivered" or "Cancelled", after which they shall be automatically deleted via a scheduled function.

**REQ-PRIV-03** — The site shall not load any third-party analytics or tracking scripts without the visitor being informed via the cookie/consent notice.

---

### 4.6 Observability

**REQ-OBS-01** — All unhandled server-side errors shall be captured by Sentry with sufficient context (route, request ID, error message) but without PII in the payload.

**REQ-OBS-02** — The system shall include basic web analytics via Plausible Analytics (privacy-first, no cookies) or Google Analytics 4 (with consent banner), owner's choice.

**REQ-OBS-03** — An uptime monitoring check shall be configured on the `/api/health` endpoint, which returns `{ status: "ok" }` and a 200 status code when the service is healthy.

---

### 4.7 Reliability

**REQ-REL-01** — A quote submission shall never be silently lost. If Supabase insert fails, the system shall retry up to three times with exponential backoff, then log the full payload to Sentry and return an error to the user.

**REQ-REL-02** — Email delivery (Resend) shall be non-blocking. Email failures shall be logged but shall not cause the quote submission to fail from the customer's perspective.

**REQ-REL-03** — If the CMS (Sanity) is unreachable, public pages shall serve their last valid cached/static build rather than returning an error.

---

### 4.8 Internationalisation and Localisation

**REQ-I18N-01** — All monetary values shall be displayed in Nigerian Naira (₦) with thousands separators (e.g. ₦3,500).

**REQ-I18N-02** — All dates displayed to users shall use DD/MM/YYYY format and WAT (UTC+1) timezone.

**REQ-I18N-03** — Phone number inputs shall accept Nigerian formats: +234XXXXXXXXXX, 080XXXXXXXX, 070XXXXXXXX, 081XXXXXXXX, 090XXXXXXXX, 091XXXXXXXX. All stored phone numbers shall be normalised to E.164 format (+234XXXXXXXXXX).

**REQ-I18N-04** — The site language shall be English (en-NG). No multilingual support is required in Phase 1.

---

## 5. Constraints

- **Budget:** Free tiers of Supabase, Sanity, Vercel, Resend, Cloudinary, and Sentry shall be sufficient for launch. Design.md shall note what triggers a paid upgrade.
- **Timeline:** TODO: owner to confirm launch date.
- **Content:** All service prices, exact specs, team bios, real photography, and testimonials are TODO and must be provided by the owner before go-live.
- **No payment processing in Phase 1:** No real money shall be handled by the site in Phase 1.

---

## 6. Out of Scope (Phase 1)

- Customer account registration and login
- Order tracking page (public)
- Paystack payment processing
- Invoice / receipt PDF generation
- Multilingual support
- Live chat (beyond WhatsApp)
- Customer reviews system (beyond manually curated CMS testimonials)

---

## 7. Acceptance Criteria Summary

Each requirement is testable. Verification methods are specified in `tasks.md`. Key end-to-end acceptance criteria:

1. A visitor on a 360 px mobile viewport can navigate to the quote form, complete all steps, upload a file, and submit — receiving a WhatsApp deep-link and a success screen — without any horizontal scroll.
2. The submitted quote appears in the admin dashboard within 5 seconds.
3. The admin can update the quote status, add a note, and download the artwork file.
4. Lighthouse audit on the home page (throttled 4G) returns ≥ 90 on all four categories.
5. No secret environment variable is present in the client-side bundle (`NEXT_PUBLIC_` vars only for non-secrets).
6. A bot submission (missing honeypot / failed Turnstile) is rejected without storing data.
7. All `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` commands pass in CI with zero errors.

---

*End of requirements.md v1.0*
