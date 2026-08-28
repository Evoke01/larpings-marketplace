import { Link } from "react-router-dom";

type LegalKind = "terms" | "privacy";

const sections = {
  terms: [
    {
      title: "1. What Larpings does",
      paragraphs: [
        "Larpings is a marketplace that helps people discover and buy digital handles, usernames, fansigns, and online services from independent sellers. We provide listings, messaging, protected order tracking, reputation tools, and payment handoff. Unless a page explicitly says otherwise, Larpings is not the owner of the item or service being offered.",
        "A listing may be an account-related asset, a creative deliverable, or a time-based service. Read the listing description, delivery requirements, seller profile, and order details before paying. A Larpings Verified mark is an ownership signal based on a review or challenge; it is not a guarantee that a transaction will be successful or that an account will remain available.",
      ],
    },
    {
      title: "2. Accounts and eligibility",
      paragraphs: [
        "You must provide accurate information, keep your sign-in details secure, and use only one account for ordinary marketplace activity. You are responsible for activity performed through your account. Tell us promptly through Support if you believe your account has been accessed without permission.",
        "You must be at least 18 years old, or the age of majority where you live, to buy, sell, or create an account on Larpings. If you are under 18, do not use marketplace features or submit personal information without a parent or legal guardian's involvement.",
      ],
    },
    {
      title: "3. Listings and seller responsibilities",
      paragraphs: [
        "Sellers must have the right to offer what they list and must describe it honestly. A seller must not list a username, account, service, fansign, subscription, or digital product that they do not control or cannot lawfully deliver. Sellers must disclose material restrictions, recovery risks, transfer steps, expiry dates, regional limits, and any information the buyer must provide.",
        "Do not list passwords, recovery codes, stolen data, malware, counterfeit goods, impersonation services, or anything unlawful or intended to bypass a platform's rules. We may pause, remove, or limit a listing, order, or account when we see a safety, fraud, ownership, legal, or policy concern.",
      ],
    },
    {
      title: "4. Orders, delivery, and disputes",
      paragraphs: [
        "An order becomes active only when the payment provider confirms payment and Larpings records the order. Buyers should keep communication and delivery evidence in the order or message flow. Sellers should deliver exactly what the listing promises and should not ask a buyer to pay outside the displayed checkout.",
        "The order workflow can record paid, delivered, confirmed, and other statuses. Marking an order complete does not waive rights that cannot legally be waived. If something is missing, unsafe, unauthorized, or materially different from the listing, contact Support promptly with the order ID and evidence. We may review messages, listing data, payment events, and delivery evidence to resolve marketplace issues.",
        "Payments may be processed by an independent third-party provider such as RunePay. Crypto transfers can be irreversible, exchange rates can change, and a wrong network or amount may delay or misroute a payment. Larpings cannot reverse a blockchain transfer that the payment provider or network cannot reverse.",
      ],
    },
    {
      title: "5. Fees, taxes, and refunds",
      paragraphs: [
        "Applicable listing prices, platform fees, network charges, and payment-provider charges are shown during the relevant flow. Sellers are responsible for taxes and reporting obligations connected with their sales. Do not assume that a displayed price includes taxes, network charges, or third-party fees unless the checkout says so.",
        "Refunds, cancellations, and charge or payment disputes depend on the order facts, provider status, listing terms, and applicable U.S. law. Contact Support before opening a payment dispute where possible. Nothing here removes mandatory consumer rights or protections against unfair or deceptive marketplace practices.",
      ],
    },
    {
      title: "6. Messaging, reputation, and user content",
      paragraphs: [
        "Use messaging for genuine transaction communication. Do not spam, threaten, harass, dox, phish, impersonate, or move a buyer to an unsafe payment arrangement. You keep ownership of content you submit, but grant Larpings permission to store, display, and moderate it as needed to operate the marketplace.",
        "Rep is a user-to-profile recommendation that may be given once per 30-day period and requires a note. Vouch is tied to a confirmed order and may be given once per user-to-profile pair. These signals and their notes are community reputation, not proof of ownership, endorsement, employment, or platform verification. Notes may be reported, hidden, or removed after review.",
      ],
    },
    {
      title: "7. Suspension, availability, and liability",
      paragraphs: [
        "We may suspend access, hold an order for review, remove content, or restrict features when necessary to prevent fraud, protect users, comply with law, or enforce these terms. We may change or discontinue features, including payment or verification integrations, and will make reasonable efforts to communicate material changes.",
        "The marketplace is provided on an availability basis. To the maximum extent permitted by law, Larpings is not responsible for a seller's breach, an external platform's account action, blockchain or provider failures, or indirect losses. Nothing in these terms excludes liability that cannot legally be excluded, including applicable consumer protections and liability for fraud or intentional misconduct.",
      ],
    },
    {
      title: "8. Changes and contact",
      paragraphs: [
        "We may update these terms when the service, U.S. law, or safety practices change. The updated version will be posted here with a new date. If a change materially affects active orders, we will take reasonable steps to notify affected users.",
        "Questions, ownership concerns, privacy requests, and order disputes can be sent through the Support page. Please include enough detail for us to find the relevant account, listing, or order.",
      ],
    },
  ],
  privacy: [
    {
      title: "1. Scope",
      paragraphs: [
        "This Privacy Policy explains how Larpings handles personal information when you browse the marketplace, create an account, publish a listing, message another user, buy or sell, request verification, or contact Support. It is written for this product and should be read with our Terms of Service.",
        "Larpings is a marketplace. Sellers and payment, hosting, authentication, analytics, storage, moderation, and support providers may process information under their own notices when they provide services to us or to you.",
      ],
    },
    {
      title: "2. Information we collect",
      paragraphs: [
        "Account information can include your email address, user ID, username, display name, profile bio, avatar, banner, social links, and account timestamps. Marketplace information can include listings, prices, categories, structured fansign or service details, order IDs, delivery status, reports, reputation actions, and support requests.",
        "Messages and moderation information can include the text, attachments or links you submit, the people involved, timestamps, and safety or abuse reports. Payment information can include provider references, payment status, currency, amount, and callback events. We do not need your wallet seed phrase or private key, and you should never send either to us.",
        "We also receive technical information such as IP address, device and browser details, pages visited, approximate timing, authentication events, and security logs. We use cookies or browser storage needed to keep you signed in and remember product preferences; optional analytics should be enabled only where configured and legally permitted.",
      ],
    },
    {
      title: "3. Why we use it",
      paragraphs: [
        "We use information to create and secure accounts, show public profiles and listings, connect buyers and sellers, process and reconcile orders, support delivery and disputes, operate reputation and verification workflows, prevent fraud and abuse, moderate content, maintain backups, improve reliability, and comply with legal obligations.",
        "Public profile information and listing information are visible to other visitors when you choose to publish them. Do not put passwords, recovery codes, government IDs, payment secrets, or other sensitive information in a public listing, bio, message, fansign request, or reputation note.",
      ],
    },
    {
      title: "4. Sharing and providers",
      paragraphs: [
        "We share information only as needed to run the service: with authentication, database, hosting, storage, email, customer-support, moderation, fraud-prevention, and payment providers; with the buyer or seller involved in an order; with professional advisers or authorities when required; or during a business transfer subject to appropriate protections.",
        "Payment providers may receive the amount, currency, order reference, callback URL, and information needed to create or confirm checkout. We do not sell personal information. We do not provide passwords or wallet private keys to marketplace counterparties.",
      ],
    },
    {
      title: "5. Retention and security",
      paragraphs: [
        "We keep information for as long as needed for the purposes above, active orders and disputes, fraud prevention, accounting, legal compliance, and legitimate business records. Public notes or transaction records may remain visible after an account is restricted when needed to preserve marketplace integrity, subject to moderation and applicable law.",
        "We use access controls, row-level authorization, server-side payment and reputation checks, protected database functions, and operational logging. No online service is completely secure, so never share credentials, seed phrases, recovery codes, or one-time authentication codes through Larpings.",
      ],
    },
    {
      title: "6. Your choices and rights",
      paragraphs: [
        "Depending on where you live and whether a state privacy law applies to Larpings, you may have rights to access, correct, delete, opt out of certain data uses, limit certain sensitive-data uses, or receive a copy of certain personal information. California residents may have additional rights under the CCPA/CPRA, including rights to know, delete, correct, opt out of sale or sharing, and non-discrimination. Larpings does not sell personal information. You can edit supported profile information from Account and can ask Support about information that cannot be changed there.",
        "To make a privacy request, contact Support from the account concerned and describe the request. We may verify your identity, protect another person's information, retain records required by law, or decline requests that would compromise security or prevent us from providing the service. U.S. residents may also have the right to appeal a denied request or contact their state attorney general, depending on applicable state law.",
      ],
    },
    {
      title: "7. Children and international use",
      paragraphs: [
        "Larpings is a general-audience marketplace and is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child provided personal information, contact Support so we can review and remove it where appropriate. If COPPA applies to a particular interaction, we will follow its notice, consent, access, security, and deletion requirements.",
        "Your information may be processed in countries where our providers operate. We use appropriate contractual, technical, or organizational safeguards required by applicable law for international transfers.",
      ],
    },
    {
      title: "8. Updates and contact",
      paragraphs: [
        "We may update this policy when our data practices, providers, or U.S. legal obligations change. The current version and update date will always be posted here. Material changes will be communicated where required.",
        "For privacy questions or requests, use the Support page and select the privacy topic. Include your username and the specific information or action you are asking about, but do not include passwords, private keys, or identity documents unless Support specifically requests a secure method.",
      ],
    },
  ],
} as const;

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const isTerms = kind === "terms";
  const title = isTerms ? "Terms of Service" : "Privacy Policy";
  const intro = isTerms
    ? "The rules for using Larpings safely and fairly as a buyer, seller, or visitor."
    : "How Larpings handles account, marketplace, order, message, and security information.";

  return (
    <div className="mx-auto w-full max-w-[960px] px-4 pb-20 pt-12 md:px-8 md:pt-16">
      <header className="hero-frame relative overflow-hidden rounded-[18px] border border-border bg-section-background px-6 py-10 md:px-12 md:py-14">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative">
          <p className="mono-label text-accent">LARPINGS / LEGAL</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-1.5px] text-foreground md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
          <p className="mt-6 text-xs text-muted-foreground">Effective date: August 29, 2026 · Last updated: August 29, 2026</p>
        </div>
      </header>

      <div className="mt-8 rounded-[14px] border border-accent/20 bg-accent/5 px-5 py-4 text-sm leading-relaxed text-secondary-foreground">
        This page is product-specific information, not legal advice. It is drafted for a U.S.-based marketplace, while some users or providers may be outside the United States. Have U.S. counsel review the operator identity, state of formation, governing law, marketplace disclosures, payment terms, state privacy thresholds, and privacy contact before launch.
      </div>

      <article className="mt-10 space-y-10">
        {sections[kind].map((section) => (
          <section key={section.title} className="scroll-mt-24 border-b border-border pb-8 last:border-0">
            <h2 className="text-xl font-medium tracking-tight text-foreground md:text-2xl">{section.title}</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground md:text-[15px]">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </article>

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <Link to={isTerms ? "/privacy" : "/terms"} className="btn-outline-dim">Read our {isTerms ? "Privacy Policy" : "Terms of Service"} →</Link>
        <Link to="/support" className="btn-white">Contact Support →</Link>
      </div>
    </div>
  );
}
