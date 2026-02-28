# Architecture

## Stack

- Next.js App Router (`src/app`)
- React 19 + TypeScript
- Tailwind CSS + custom UI primitives in `src/components/ui`
- Cloudinary images via `next-cloudinary`
- Server-side email sending via Resend (`src/lib/sendEmail.ts`)

## Page composition

The homepage is composed in `src/app/page.tsx` using section components:

- `Hero`
- `IntroImages` (contains `OfferCarousel`)
- `About`
- `WhySection`
- `Reviews`
- `Contact`

Shared layout elements are in `src/app/layout.tsx`:

- Floating nav
- Footer
- GTM integration

## Key interaction paths

- Navigation anchor links between sections (`#recensies`, `#aanbod`, etc.)
- Contact form (`ContactForm`) validates with zod + react-hook-form and calls server action `sendEmail`
- Review widgets use `NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET`

## Notes

- Site language metadata is Dutch (`<html lang="nl">`).
- Instagram carousel embed was removed in favor of a direct Instagram link in `About`.
