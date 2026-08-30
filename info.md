# Larpings Marketplace — Product, Technical, and Operations Reference

Last reviewed: 2026-08-29  
Repository: `Evoke01/larpings-marketplace`  
Production site: `https://larpings-marketplace.onrender.com`  
Supabase project ref: `xnacxehraxwqfwqaiemf`

This document describes what the website is, why it exists, how the user and transaction flows work, where the important code lives, and what still needs to be completed before a full public launch. It is intended for the owner, developers, moderators, and future agents working on the project.

## 1. Product identity

Larpings is a U.S.-based digital marketplace for rare online handles and related digital goods. The product language is inspired by “drops,” “grails,” “rares,” and “sauce,” while the actual product must remain clear about what is being sold.

The marketplace supports four broad offer types:

- Usernames and handles, shown with an `@` prefix.
- Accounts or other account-related digital assets, also shown with an `@` prefix.
- Fansigns and other non-handle creative deliverables, shown with a `$`-style non-handle treatment.
- Services, including predefined service categories and subcategories.

Larpings is a marketplace and workflow provider. A seller owns or controls the item or service they list and is responsible for truthful descriptions and delivery. Larpings supplies discovery, identity, messaging, order tracking, payment handoff, ownership checks, reputation, moderation, and support tools.

Larpings Verified is a trust signal, not a government identity check, legal certification, ownership guarantee, or promise that an external platform will preserve an account. Rep and Vouch are community reputation signals, not official verification.

## 2. Design direction

The authoritative visual direction is in [design.md](C:/Users/Varun/Downloads/larpings-marketplace/design.md).

The intended visual system is:

- Deep near-black backgrounds with slightly lighter sections.
- Premium, high-contrast typography and compact monospace labels.
- Glass-like surfaces, restrained borders, subtle gradients, and glow.
- Blue as the primary design-system accent, with red retained for destructive or legacy marketplace actions where the existing UI already uses it.
- `@` for usernames/accounts and `$` for services, fansigns, and other non-handle assets.
- Responsive desktop/mobile layouts with the floating bottom navigation on small screens.
- Scroll reveal and page-entry motion used carefully so motion supports hierarchy rather than distracting from checkout or forms.

Do not introduce a new visual language for a single page. Reuse semantic design tokens and existing classes such as `btn-white`, `btn-accent`, `btn-outline-dim`, `card-lined`, `lumen-card`, `mono-label`, `hero-frame`, `hero-grid`, `mkt-enter`, and `float-shell`.

## 3. Why the platform exists

The product is designed to make online-identity and digital-service transactions more understandable and less dependent on informal direct messages. Its main trust problems are:

1. Buyers may not know whether a seller controls the username or asset.
2. Sellers and buyers may lack a shared record of payment, delivery, and confirmation.
3. Crypto payment mistakes are difficult to reverse.
4. Informal messaging can create impersonation, phishing, and off-platform payment risk.
5. A star rating does not explain whether a person actually completed a transaction.

The current product answers those problems with per-listing ownership verification, protected order states, a payment-provider handoff, buyer/seller messaging, Rep and Vouch reputation, public legal pages, and moderation paths.

## 4. Website map

### Public pages

- `/` — Home page and product introduction.
- `/marketplace` — Searchable marketplace for active listings.
- `/fansigns` — Fansign-focused marketplace view.
- `/listing/:handle` — Listing detail and purchase entry point.
- `/seller/:handle` — Public seller storefront and profile reputation.
- `/sold` — Public, partially masked history of sold items.
- `/about` — Product explanation.
- `/legit` — Trust/legitimacy explanation.
- `/guides` and `/badges` — Guide/badge education page.
- `/ranks` — Ranking/reputation-oriented page.
- `/get-verified` — Seller account verification explanation and $49 checkout entry point.
- `/support` — Support contact and issue reporting entry point.
- `/blog` — Blog index.
- `/terms` — Terms of Service.
- `/privacy` — Privacy Policy.
- `/legal-acceptance` — One-time acceptance screen for signed-in users who have not accepted the current versions.

### Signed-in pages

These pages are protected by authentication and the one-time legal acceptance gate:

- `/account` — Profile editing, media uploads, verification status, and sign out.
- `/sell` — Create a listing.
- `/dashboard` — Manage active listings and start listing ownership verification.
- `/messages` — Conversations and real-time incoming messages.
- `/orders` — Buyer order tracking and delivery confirmation.

### Admin pages

- `/pancake/*` — Admin dashboard area for users, listings, orders, announcements, and verification review. Access control for this area must remain server-side and must never rely on a user-editable profile field or browser-only check.

## 5. Main user journeys

### 5.1 Visitor browsing

1. A visitor opens Home, Marketplace, Fansigns, a seller storefront, or a listing.
2. Public data is loaded from Supabase using the publishable client key.
3. Active listings are visible publicly. A seller can see their own non-active listings through the RLS policy.
4. The visitor can read Terms and Privacy without an account.
5. Buying, selling, messaging, managing orders, and account changes require sign-in.

### 5.2 New or returning user sign-in

1. The user signs up or signs in through Supabase Auth.
2. A profile is bootstrapped from the auth user by the database trigger.
3. When the user first opens a protected area, `ProtectedRoute` checks `legal_acceptances`.
4. If there is no acceptance record, the user is sent to `/legal-acceptance` with a safe local return path.
5. The user must select both documents and press Continue.
6. The app inserts one acceptance row containing the Terms and Privacy versions.
7. The user returns to the page they originally requested.

The acceptance record is per account, not per browser. It is stored in Supabase rather than only in local storage. Public legal pages remain available after acceptance.

### 5.3 Seller creates a listing

1. The seller opens `/sell`.
2. The seller selects Username, Account, Fansign, or Service.
3. Username/account listings use handle-oriented fields.
4. Fansign listings collect a recipient, message/brief, and delivery format.
5. Service listings use predefined service types, subcategories, and offer options from `src/lib/offerCatalog.ts`.
6. Structured non-handle fields are saved in `listings.details` as JSONB.
7. The seller supplies price, platform, description, and listing metadata.
8. The seller pays no listing fee. The current seller UI describes a 1% platform fee deducted when an item sells; the final checkout and payout implementation must remain the source of truth.

Protected ownership fields are not client-insertable. New listings start unverified and can become verified only through the server-side verification functions.

### 5.4 Listing ownership verification

1. From the seller dashboard, the seller starts verification for a specific listing.
2. The server generates a temporary code, stores only its hash, sets an expiry, and marks the listing pending.
3. The seller adds the temporary code to the external account’s bio.
4. The seller submits the code back to Larpings.
5. The server hashes and compares the submitted code and checks expiry.
6. On success, the server marks that listing verified and clears the temporary secret fields.
7. The seller should remove the temporary code from the external account bio.

This verifies control of the specific listing at the time of the challenge. It does not validate an external platform’s future behavior or guarantee transfer completion.

### 5.5 Buyer purchase

1. The buyer opens an active listing and selects a payment coin.
2. The frontend invokes the `create-invoice` Edge Function.
3. The function authenticates the caller, loads the listing from the database, rejects self-purchase, rejects inactive listings, and uses the database price rather than trusting a browser-supplied amount.
4. The function creates a RunePay invoice and stores the resulting order reference/payment URL server-side.
5. The buyer pays through RunePay using the exact network, address, and amount shown by the provider.
6. RunePay calls `runepay-webhook` after payment events.
7. The webhook validates its HMAC signature and updates the order status.
8. The seller delivers the username, account asset, fansign, or service according to the listing.
9. The buyer confirms delivery from `/orders` when the order is eligible.
10. After a confirmed order, the buyer and seller may become eligible to Vouch for each other.

Crypto payments can be irreversible. Larpings cannot guarantee recovery from a wrong address, wrong network, wrong amount, wallet mistake, or provider/network failure.

### 5.6 Fansign flow

Fansigns are not treated as usernames. A fansign listing stores its specific recipient, requested message/brief, and delivery format. Marketplace cards and listing pages show that structured context so a buyer understands what they are ordering. Orders display the fansign recipient and format where available.

The seller must deliver the promised creative item or message. The buyer should keep evidence in the order/message flow and contact Support quickly if the result is missing or materially different.

### 5.7 Service flow

Services use a controlled catalog instead of a completely free-form category field:

- Digital products: Gaming, Software & Apps, Retail, Payment & Stable Coins, Telco.
- Rent-time services: Social Growth, Creative, Development, Consulting.

Each group has predefined options. The seller still provides a clear description and price. The listing stores `service_type`, `service_group`, `service_option`, and `service_name` in `details` so the buyer, order page, and marketplace card can show consistent scope.

The catalog is product guidance, not a legal classification. Prohibited, stolen, deceptive, credential-based, or unlawful offers remain prohibited even if a catalog option appears available.

### 5.8 Messaging

Signed-in users can open a conversation from a seller or listing. Messages are stored with sender, receiver, body, and read state. Realtime is enabled for incoming messages.

Users may send transaction-relevant communication. They must not use messaging for spam, threats, phishing, doxxing, impersonation, credential theft, or directing buyers to unsafe off-platform payment. Message content is user content and may be reviewed for support, fraud, safety, or moderation purposes.

Recipients can update only the read flag. They cannot edit sender, recipient, timestamp, or message content.

### 5.9 Rep and Vouch reputation

The old star-rating display is no longer the trust model.

Rep:

- Any authenticated user can Rep another profile.
- Self-Rep is rejected.
- The note is required and must be 20–280 characters.
- The same giver/profile pair has a 30-day cooldown.
- A successful Rep contributes `+1` to the recipient’s Rep count.

Vouch:

- A buyer or seller can Vouch the other participant after a confirmed order.
- Self-Vouch is rejected.
- The relationship must be proven by the qualifying confirmed order.
- A giver can Vouch a particular profile only once ever.
- A successful Vouch contributes `+1` to the recipient’s Vouch count.

Rep notes publish immediately unless reported or moderated. Reports are separate from reputation counts. Admin removal of an abusive note must not decrement valid counters incorrectly.

## 6. Data model and source of truth

The production database is Supabase PostgreSQL. Migrations live in `supabase/migrations/` and are applied in timestamp order.

Core entities include:

- `auth.users` — Supabase-managed authentication identities.
- `profiles` — Public profile information, profile links, reputation counters, and account metadata.
- `listings` — Seller-owned offers, price, category, platform, status, verification state, and structured `details` JSONB.
- `orders` — Buyer/listing/payment references and order status.
- `messages` — Sender/receiver communication and read state.
- `seller_verifications` — Seller account verification request/review status.
- `seller_verification_payments` — Provider/payment state for the one-time verification review.
- `profile_reps` — Rep source records.
- `profile_vouches` — Vouch source records tied to confirmed orders.
- `profile_rep_reports` — Reports against Rep notes.
- `legal_acceptances` — Immutable per-user Terms/Privacy acceptance record and document versions.

Counters such as `profiles.rep_count` and `profiles.vouch_count` are derived from source records through database triggers/functions. Client code must not directly increment counters.

`listings.details` is intentionally structured JSONB because username, fansign, and service offers need different fields while sharing one listing table. New fields should be documented and validated before being displayed or used in order logic.

## 7. Security architecture

### Client

- The browser uses only the Supabase publishable key.
- Service-role credentials must never be placed in frontend code, Vite environment variables exposed to the browser, or committed files.
- The client performs UX validation, but authorization is enforced in PostgreSQL RLS, grants, RPCs, and Edge Functions.

### Database and RLS

- Public listing/profile reads are intentionally limited to published/public data.
- Users can update only their own permitted profile fields.
- Sellers can update only safe listing fields; verification fields are reserved for server functions.
- Buyers cannot directly update order status.
- Message recipients can update only `read`.
- Reputation writes use authenticated RPCs with self-target, cooldown, uniqueness, and order-qualification checks.
- Legal acceptance rows are selectable/insertable only by the matching authenticated user; update/delete are revoked.
- Internal counter refresh and admin operations are not client-callable.

### Edge Functions

Relevant functions:

- `create-invoice` — Validates listing and creates the buyer payment invoice.
- `runepay-webhook` — Validates RunePay callbacks and reconciles payment/order state.
- `start-listing-verification` — Generates a temporary ownership challenge.
- `complete-listing-verification` — Validates the challenge and marks the listing verified.
- `create-verification-invoice` — Creates the one-time seller verification review invoice.
- `simulate-sandbox-payment` — Test-only sandbox payment helper; do not expose as a production payment path.

Edge Functions must validate the bearer token when called by a user, use fixed server configuration for callback URLs, avoid trusting request origin or browser price data, and return generic errors that do not leak secrets.

### Payment safety

- The browser must not decide the payable listing price.
- The seller must not be able to buy their own listing through the invoice function.
- Inactive listings must not generate new invoices.
- RunePay webhook signatures must be validated before database updates.
- Provider IDs and track IDs should remain auditable and unique.
- Test/sandbox mode must be disabled and separately verified before production payments are enabled.

## 8. Authentication and email

Supabase Auth handles account sessions and email/password flows. Custom SMTP is configured in the Supabase Auth project settings, not in this repository. The intended mailbox is the GoDaddy Professional Email mailbox for `support@larpings.com`.

SMTP secrets must never be committed or pasted into code/chat. Use the Supabase Dashboard’s authenticated SMTP settings. Typical GoDaddy Professional Email settings are documented by GoDaddy, but the exact mailbox product should be confirmed before saving:

```text
Host: smtpout.secureserver.net
Port: 465
Username: full mailbox address
Password: mailbox password
From address: same mailbox address
Sender name: larpings.com
```

After configuration, test signup confirmation, password reset, and any magic-link flow using a non-admin test account. Keep authentication mail separate from marketing mail and configure SPF, DKIM, and DMARC for deliverability.

## 9. Legal and trust pages

The website includes:

- `/terms` — U.S.-oriented marketplace terms covering accounts, listings, payment-provider handoff, crypto risk, delivery, refunds, moderation, Rep/Vouch, suspension, and liability boundaries.
- `/privacy` — U.S.-oriented privacy notice covering account data, listings, orders, messages, payment references, providers, retention, security, state privacy rights, California rights, and COPPA-related handling.
- `/legal-acceptance` — One-time interactive acceptance screen requiring both documents.

The legal pages are product-specific drafts, not legal advice. Before public launch, the operator should have U.S. counsel fill in and verify the legal entity, business address, state of formation, governing law, dispute process, state privacy applicability, consumer disclosures, refund policy, tax language, and privacy contact.

## 10. Technology stack

- React 19.
- TypeScript.
- Vite 8.
- Tailwind CSS v4.
- React Router v7.
- Supabase JS client.
- Supabase PostgreSQL, Auth, RLS, Realtime, Storage, and Edge Functions.
- Render static site deployment.
- Oxlint for linting.

Important source locations:

- `src/App.tsx` — Router, global layout, footer, mobile navigation, reveal animation, and floating chat entry point.
- `src/components/ProtectedRoute.tsx` — Authentication and legal-acceptance gate.
- `src/pages/LegalAcceptancePage.tsx` — Interactive one-time acceptance UI.
- `src/pages/LegalPage.tsx` — Terms and Privacy content renderer.
- `src/lib/legal.ts` — Current legal document versions.
- `src/lib/offerCatalog.ts` — Fansign/service offer taxonomy.
- `src/lib/auth.tsx` — Auth session context.
- `src/lib/supabase.ts` — Browser Supabase client using publishable configuration.
- `src/pages/SellPage.tsx` — Listing creation and structured offer fields.
- `src/pages/ListingPage.tsx` — Listing display and purchase entry point.
- `src/pages/OrdersPage.tsx` — Order state and delivery confirmation.
- `src/components/ReputationPanel.tsx` — Rep/Vouch UI and notes.
- `supabase/migrations/` — Database schema, RLS, grants, triggers, RPCs, and hardening history.
- `supabase/functions/` — Payment and ownership-verification server logic.
- `render.yaml` — Render static-site build and SPA rewrite configuration.

## 11. Local development

From the repository root:

```powershell
npm install
npm run dev
```

Useful checks:

```powershell
npm run build
npm run lint
git diff --check
```

The production build runs TypeScript compilation, Vite bundling, and the 404-copy script. The frontend expects Supabase configuration through `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; safe project fallbacks currently exist in `src/lib/supabase.ts`, but deployment configuration should be explicit.

For database changes, create a migration through the Supabase CLI, review it, push it to the intended project, and verify RLS/grants/advisors. Never use a frontend request to perform privileged schema or counter work.

## 12. Deployment

Render is configured as a static site:

- Build command: `npm install && npm run build`.
- Published directory: `dist`.
- SPA rewrite: all paths rewrite to `/index.html`.
- Asset caching: hashed assets are immutable; general routes are revalidated.
- Repository branch: `main`.

Normal release sequence:

1. Inspect the working tree and existing changes.
2. Implement the smallest scoped change.
3. Run build, lint, and diff checks.
4. For Supabase work, apply and verify database migrations/functions first.
5. Commit with a descriptive message.
6. Push to `main`.
7. Wait for Render to report the commit live.
8. Smoke-test the affected public and authenticated flows.
9. Check browser console errors and payment/auth/database logs where relevant.

Do not call a deployment successful merely because GitHub accepted a push; Render must report the new commit as live.

## 13. Current known limitations and launch checklist

The following items should be resolved or explicitly accepted before a full production launch:

- Confirm the GoDaddy Professional Email SMTP configuration in Supabase and test real password-reset/signup delivery.
- Confirm SPF, DKIM, and DMARC for the sending domain.
- Disable RunePay sandbox mode and perform a controlled production payment test before accepting real funds.
- Define the legal operator entity, address, governing-law state, support/privacy contact, and refund/dispute policy with U.S. counsel.
- Decide whether the platform will allow all listed digital-account categories under the external platforms’ terms.
- Add abuse/rate-limit protection for signup, messaging, Rep/Vouch, invoice creation, and verification attempts.
- Enable Supabase leaked-password protection.
- Configure CAPTCHA or another bot-control mechanism before public signup if abuse volume requires it.
- Review the admin panel’s authorization with a non-admin account and verify that every admin mutation is server-authorized.
- Replace or remove unresolved legacy public image references reported by Vite if those pages are still used.
- Clear remaining non-blocking lint warnings when touching the affected files.
- Test mobile navigation, legal acceptance, seller creation, fansign purchase, service purchase, order confirmation, messaging realtime, and reputation from clean test accounts.
- Add automated integration tests for self-purchase, inactive-listing checkout, forged verification fields, order-status tampering, message tampering, Rep cooldown, Vouch eligibility, and acceptance gating.

## 14. Rules for future changes

1. Read `design.md` before changing UI.
2. Treat screenshots and pasted external components as visual references, not as product requirements unless the owner explicitly requests them.
3. Keep usernames, accounts, fansigns, and services distinct in both UI and data.
4. Do not display fake ratings, fake badges, fake sales, or fake verification states as if they were real data.
5. Never trust client-supplied price, ownership, order status, seller identity, admin role, or reputation counters.
6. Keep secrets out of the repository, browser bundle, chat, screenshots, and logs.
7. Prefer database constraints, RLS, grants, and authenticated server functions over frontend-only checks.
8. Preserve buyer/seller evidence and auditability without exposing private payment secrets.
9. Keep public copy honest: verification is a trust signal, protected checkout is not a guarantee of external account control, and crypto payments may be irreversible.
10. Verify every database or deployment change after applying it.
