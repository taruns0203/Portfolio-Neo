# Resume content update

Source: user-supplied `Tarun-Sharma-Resume (2).pdf`, two pages, extracted and visually inspected. The provided PDF is served unchanged at `/resume/Tarun-Sharma-Resume.pdf` through the About section's Download Resume link.

## Changes

- Hero, metadata, and About now emphasize React/Next.js/TypeScript/Node.js, secure authentication, PostgreSQL/Prisma, Redis, AWS serverless, and the zero-downtime 1,200+ page migration.
- Replaced career placeholders with the continuous Allmysons.com client engagement (Mar 2022–Present), Multimetal Limited (Jul 2021–Feb 2022), and Lata Software (Mar 2020–Jun 2021). Native expandable details preserve employer/contract context and responsibilities without adding client state.
- Added resume-supported Allmysons.com, Junk.com, and Movingful work, including authentication/MFA/RBAC, CMS migration, AWS onboarding, CI/CD, and accessible component development.
- Featured Movingful in place of Nakshatra with a new generic component-library SVG illustration, not a claimed product screenshot.
- Added five detailed skill groups and B.Tech Computer Science education (Career Point University, 2017).
- Updated achievements/performance with zero downtime and 30% fewer redundant requests. The 90+ page speed result is kept distinct from Core Web Vitals field measurements; those values remain unset.
- Updated GitHub from the previously configured account to `taruns117`, added the resume's LinkedIn URL and phone link. GitHub stats now derive from the new profile unless an environment override is present.

Nuvexa remains as separately supplied current work. Draft articles remain drafts. No publication claims or additional social URLs were inferred from the resume. The form continues to use the explicit email-app fallback.

## Validation

TypeScript, ESLint, and webpack production build passed. Chromium checks at 375, 768, 1024, and 1440px found no horizontal page overflow, broken main-content images, or page errors. Expanded career details fit all tested widths. Resume download returned HTTP 200 with application/pdf; GitHub, LinkedIn, and phone hrefs match the PDF.

Preview: http://localhost:3004/?preview=resume#about.
