# Testing

## Tooling

- Vitest (`vitest.config.ts`)
- jsdom environment by default
- Testing Library for React component assertions
- Shared test setup in `src/test/setup.ts`

## Commands

- `npm run test` runs all tests once
- `npm run test:watch` runs tests in watch mode
- `npm run lint` runs TypeScript checks via `tsconfig.lint.json` (excludes `.next` generated files)

## Coverage currently in repo

### `src/lib/sendEmail.test.ts`

- Rejects when required fields are missing
- Rethrows when primary Resend call fails
- Validates production recipient routing

### `src/components/ui/infitinite-moving-cards.test.tsx`

- Ensures marquee list duplication happens once
- Guards against repeated DOM duplication after rerenders

## Gaps / next useful tests

- Contact form UI success/error states
- Nav/anchor behavior in an E2E suite
- Offer carousel interactions on mobile breakpoints
- Maternity modal behavior (open-on-load, close on overlay click, reopen via `Verlof` trigger)
