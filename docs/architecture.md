# Architecture

## Stack

- Next.js App Router (`src/app`)
- React 19 + TypeScript
- Tailwind CSS + custom UI primitives in `src/components/ui`
- Payload CMS 3 integrated into the same Next.js app
- PostgreSQL via `@payloadcms/db-postgres`
- S3 media storage via `@payloadcms/storage-s3`
- Server-side email sending via Resend (`src/lib/sendEmail.ts`)

## App surfaces

### Frontend

- homepage route: `src/app/page.tsx`
- root layout: `src/app/layout.tsx`

### Payload

- config: `src/payload.config.ts`
- admin: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- REST API: `src/app/(payload)/api/[...slug]/route.ts`

## Content model

### Collections

- `users`
- `media`

### Globals

- `site-settings`
- `header`
- `footer`
- `home`

## Page composition

The homepage is now rendered from the `home` global with fallback defaults from `src/lib/default-content.ts`.

Sections:

- `announcementModal`
- `hero`
- `intro`
- `offers`
- `about`
- `kinderyoga`
- `reviews`
- `contact`

Shared shell content comes from:

- `header` global
- `footer` global
- `site-settings` global

## Media flow

- Payload uploads use the `media` collection
- S3 storage is enabled when S3 env vars are present
- current project bucket: `lumen-yoga-media-061051249936`
- frontend image rendering accepts both Payload media docs and legacy URL fallbacks

## Seed flow

`src/seed/lumen.ts` downloads the currently hardcoded media assets, uploads them into Payload media, and writes the current site copy into Payload globals.

## Deployment shape

Current deployment target:

- app + db via Docker Compose
- app bound to `127.0.0.1:3030`
- db bound to `127.0.0.1:5440`
- system Caddy terminates HTTPS and proxies `lumen.manndigital.nl` to the app

## Notes

- Site language metadata is Dutch (`<html lang="nl">`).
- Review widgets still use `NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET`.
- Contact form still uses the existing Resend server action flow.
- Global fetches fall back to default content so the site can still build before the database is reachable.
