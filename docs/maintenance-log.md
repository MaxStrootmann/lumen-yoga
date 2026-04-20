# Maintenance Log

## 2026-02-28

### Reliability and cleanup pass

- Fixed `sendEmail` to rethrow primary send errors after fallback error notification.
- Fixed invalid Tailwind class in `OfferCarousel` (`lg:basis-1/4`).
- Fixed malformed dropdown item class in UI primitive.
- Prevented repeated duplication in `InfiniteMovingCards` effect.
- Switched page language metadata to Dutch.
- Unified Hero reviews widget ID with env variable.
- Removed embedded Instagram carousel script from `About` and replaced with external profile link.
- Removed obsolete `.bak` component files.
- Added focused Vitest tests for email flow and infinite-cards duplication.
- Added docs folder for ongoing project maintenance notes.
- Added zwangerschapsverlof announcement modal and `Verlof` reopen actions in desktop/mobile/footer navigation.
- Reworked modal from custom implementation to Radix/shadcn-style dialog primitive.
- Extracted shared modal trigger utility (`src/lib/maternity-modal.ts`) to remove duplicated event dispatch code.
- Fixed Radix accessibility warnings by preserving internal `DialogTitle` and `DialogDescription` linkage.

### Tooling

- Lint command currently uses `tsc -p tsconfig.lint.json --noEmit` for stable CI checks in this repo.

## 2026-04-20

### Payload migration scaffold

- Added Payload CMS into the existing Next.js app instead of replacing the frontend.
- Added Payload collections for `users` and `media`.
- Added Payload globals for `site-settings`, `header`, `footer`, and `home`.
- Added integrated Payload admin and REST routes under `src/app/(payload)`.
- Added S3 storage adapter wiring for the dedicated Lumen bucket.
- Added fallback-driven frontend data loading so the site still renders before the database is seeded.
- Refactored homepage and shell components to consume CMS-driven content.
- Added `src/seed/lumen.ts` to import current hardcoded content and media into Payload.
- Added Dockerfile, Docker Compose setup, production env example, and Caddy host snippet for `mann-dev` deployment.
- Updated README and project docs to reflect the new architecture and deployment workflow.
- Added `scripts/deploy.sh` for the canonical server workflow in `~/projects/lumen-yoga`.
- Standardized the server setup so `~/projects/lumen-yoga` is the canonical git working copy and deployment directory.
