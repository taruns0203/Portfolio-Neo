# Contact setup

## Current behavior

Contact follows Writing and uses the same `max-w-home` container, gutters, and section spacing. A minimal footer follows it. Navigation and Let's Talk now point to `#contact`.

No email delivery provider or server endpoint is configured. The form explicitly uses an **Open Email Draft** mailto fallback. It validates name, email, and message, URL-encodes the subject/body, and asks the visitor's configured email app to open a draft. The visitor must review and send there. The website does not report successful delivery, store messages, or send form data to analytics. A missing email application cannot be reliably detected; the direct email link and copy button provide alternatives. Without JavaScript, direct email and social links remain usable.

Topic chips fill the subject and expose `aria-pressed`. Manual subject edits clear the selection when they no longer match. Browser validation handles required fields and email syntax; trimmed name/message validation rejects whitespace-only input and restores field focus. The draft button is briefly disabled to prevent duplicate handoffs, and status feedback uses live regions. There is no delivery endpoint to protect with server validation, honeypot, or rate limits in this mode.

## Public configuration

Edit `src/config/site.ts`:

- `profileLinks.contact`: verified `mailto:` recipient. `site.contact.email` derives from it. Current value comes from existing configuration, not the screenshot.
- `site.contact.location`: editable city-level location, currently the supplied brief's Kota, Rajasthan, India.
- `site.contact.socials`: set only confirmed public profile URLs. GitHub is configured; LinkedIn, X, YouTube, and Instagram are null and hidden.

Setting the recipient to null hides the direct email card and disables the draft button. Do not put credentials in this file: it is public configuration.

## Adding server delivery later

Adding environment variables alone does not enable delivery. Implement a server-only route or action and connect the form before changing its label to Send Message.

1. Select an email provider and verify a sender domain you control, including its required DNS records. The From address must belong to this verified domain; use the visitor's validated email as Reply-To, never as From.
2. Store provider credentials such as `RESEND_API_KEY`, a verified `CONTACT_FROM_EMAIL`, and the intended `CONTACT_TO_EMAIL` in local ignored environment configuration and the deployment's secret manager. Never use a `NEXT_PUBLIC_` prefix or commit secret values.
3. Add server validation with field length limits, a honeypot, request size limits, and durable rate limiting appropriate to the hosting environment. Do not log message contents or visitor PII.
4. Wire pending, failure, and provider-confirmed acceptance states. Provider acceptance is not proof of inbox delivery. Keep form content on failure and prevent concurrent submissions.
5. Test provider errors and abuse controls before enabling the endpoint. No third-party CAPTCHA or widgets have been added.

## Implementation

Created `src/components/contact/` for the static intro/artwork and social links, interactive subject/form state, and copy cards; `src/components/sections/contact-section.tsx`; `src/components/layout/site-footer.tsx`; and `src/styles/contact.css`. Updated `src/app/page.tsx`, `src/app/globals.css`, and `src/config/site.ts`.

Static content is passed from Server Components into the client interaction wrapper. All 45 supplied assets are copied unchanged into `public/assets/contact/`. The page uses the supplied workspace SVG, a single yellow orb, icons and underline. Reference crops are not rendered. Text, controls, and labels are HTML. No dependencies or animations were added.

## Verification

- TypeScript and ESLint passed on Node 22.21.0.
- Production build passed using `pnpm exec next build --webpack`, the working alternative to the environment's previously observed Turbopack worker-port restriction.
- Chromium at 375, 768, 1024, and 1440px: no horizontal overflow, broken section images, or browser page errors; screenshots visually reviewed.
- All four topic chips populate the intended subject; manual edits clear selection; Enter activates a focused chip.
- Empty form and malformed email fail validation; whitespace-only name reports an error and restores focus; valid inputs pass validation.
- Clipboard checks returned exactly the configured email and displayed location.
- Only the configured GitHub social link renders, with `noopener noreferrer`.
- No actual email was sent. OS email-app handoff/delivery and cross-browser/screen-reader audits were not performed.

Preview: http://localhost:3004/#contact. Screenshots: `contact-desktop.png`, `contact-mobile.png`.
