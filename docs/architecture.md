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
- `MaternityLeaveModal`

Shared layout elements are in `src/app/layout.tsx`:

- Floating nav
- Footer
- GTM integration

## Key interaction paths

- Navigation anchor links between sections (`#recensies`, `#aanbod`, etc.)
- Contact form (`ContactForm`) validates with zod + react-hook-form and calls server action `sendEmail`
- Review widgets use `NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET`
- Maternity leave announcement opens on page load and can be re-opened via the `Verlof` nav action.
- Modal open behavior is triggered through a shared client event utility (`src/lib/maternity-modal.ts`).

## Notes

- Site language metadata is Dutch (`<html lang="nl">`).
- Instagram carousel embed was removed in favor of a direct Instagram link in `About`.
- Maternity modal uses a Radix/shadcn-style dialog primitive (`src/components/ui/dialog.tsx`) for accessibility and focus handling.
