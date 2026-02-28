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
