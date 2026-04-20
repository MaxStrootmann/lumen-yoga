# Payload migration plan

## Goal

Migrate the current hardcoded Next.js marketing site to a self-hosted Payload CMS setup while preserving the existing frontend structure and UX.

Preview target:

- `lumen.manndigital.nl`
- hosted on `mann-dev`
- app deployed with Docker Compose
- HTTPS terminated by Caddy
- Postgres as the database
- Payload media stored in S3 if AWS credentials/bucket access are available

## Current site audit

The current site is a single-page Dutch marketing site composed from hardcoded React components.

### Current homepage sections

1. `MaternityLeaveModal`
2. `Hero`
3. `IntroImages`
   - full-width image
   - `OfferCarousel`
   - quote
4. `About`
5. `WhySection`
6. `Krijgers` / `Ellen` fixed-image sections depending on breakpoint
7. `Reviews`
8. `Contact`

### Shared layout content

- floating nav items in `src/app/layout.tsx`
- footer links and social URLs in `src/components/Footer.tsx`
- metadata title / description / favicon in `src/app/layout.tsx`

### Integrations that must survive the migration

- Resend contact form (`src/lib/sendEmail.ts`)
- PostHog client/server tracking
- GTM events via `@next/third-parties/google`
- Google reviews widget via `NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET`

## Recommended Payload content model

Use Payload in a way that matches the current site instead of forcing a blog-shaped rewrite.

### Collections

#### `users`

Admin users for Payload access.

#### `media`

Uploads collection for images and other files.

Planned storage backend:

- S3 via `@payloadcms/storage-s3`
- fallback option: local disk if AWS credentials are not available yet

### Globals

#### `site-settings`

Cross-site metadata and shell content:

- site title
- meta description
- favicon / social image
- GTM / analytics display labels where useful
- contact defaults if needed

#### `header`

- nav items
- label for the maternity/announcement trigger if retained as a special action

#### `footer`

- nav items or footer link overrides
- Instagram URL
- Facebook URL
- terms URL
- maker credit label + URL

#### `home`

Single-source content for the current homepage.

Suggested sections:

- `announcementModal`
- `hero`
- `offers`
- `about`
- `kinderyogaInfo`
- `reviews`
- `contact`

This keeps the frontend close to the existing implementation while still making all business content editable.

## Section-by-section mapping

### `announcementModal`

Current source: `src/components/MaternityLeaveModal.tsx`

Suggested fields:

- `enabled`
- `title`
- `intro`
- `scheduleItems` array
- `signupText`
- `closingText`
- `signature`

### `hero`

Current source: `src/components/Hero.tsx`

Suggested fields:

- `title`
- `description`
- `locationLabel`
- `locationUrl`
- `heroImage`
- `quote`
- `primaryCTA` (label + url)
- `secondaryCTAAnchor`

### `offers`

Current source: `src/components/OfferCarousel.tsx`

Suggested fields:

- `sectionTitle`
- `introImage`
- `quote`
- `items` array
  - `colorTheme`
  - `title`
  - `timeLabel`
  - `body` rich text
  - `buttonLabel`
  - `buttonUrl`

### `about`

Current source: `src/components/About.tsx`

Suggested fields:

- `image`
- `heading`
- `paragraphs` array
- `instagramUrl`
- `instagramLabel`

### `kinderyogaInfo`

Current source: `src/components/WhySection.tsx`

Suggested fields:

- `logo`
- `sections` array
  - `heading`
  - `paragraphs` array
- `sideImage`
- `mobileQuote`

### `reviews`

Current source: `src/components/Reviews.tsx`

Suggested fields:

- `heading`
- optional `widgetOverride`

The widget ID can stay env-driven unless the business needs editor control.

### `contact`

Current source: `src/components/Contact.tsx`

Suggested fields:

- `heading`
- `email`
- `phone`
- `locationLabel`
- `locationUrl`

## `mann-dev` environment notes

Verified from the server:

- host: `mann-dev` (`167.235.155.137`)
- user: `mann`
- system Caddy is already in use and publicly exposed
- Docker and Docker Compose are installed
- shared browser stack is already available and running on the host
- shared browser local endpoints on the server:
  - noVNC: `127.0.0.1:6080`
  - CDP: `127.0.0.1:9222`
- shared handoff directories:
  - `~/shared/inbox`
  - `~/shared/outbox`
  - `~/shared/shots`
  - `~/shared/downloads`

### Browser workflow

The intended workflow on `mann-dev` is:

1. keep the shared browser running on the server
2. from the laptop run `~/.config/scripts/agent-zero-browser-tunnel.sh`
3. this forwards local ports:
   - `6080 -> mann-dev:6080`
   - `9222 -> mann-dev:9222`
4. after the tunnel is active, `agent-browser --cdp 9222 ...` can drive the shared Chromium instance

At audit time the server-side browser stack was running, but the local SSH tunnel was not active yet.

## Deployment shape recommendation

To avoid interfering with the existing host setup:

- app lives in `/home/mann/projects/lumen-yoga`
- Docker Compose runs:
  - `app`
  - `db` (Postgres)
- bind app only to localhost on a high port, e.g. `127.0.0.1:3020`
- keep system Caddy as the only public web server
- add a new Caddy site block:
  - `lumen.manndigital.nl -> 127.0.0.1:3020`

This matches the existing `mann-dev` pattern already used for other apps.

## Open blockers

### AWS / S3 access

AWS CLI is now available locally and verified against:

- account: `061051249936`
- IAM user: `arn:aws:iam::061051249936:user/UserMax`
- region: `eu-west-1`

Dedicated bucket created for this project:

- bucket: `lumen-yoga-media-061051249936`
- region: `eu-west-1`
- public base URL: `https://lumen-yoga-media-061051249936.s3.eu-west-1.amazonaws.com/`

Bucket setup applied:

- bucket owner enforced
- public bucket policy for `s3:GetObject`
- CORS for:
  - `https://lumen.manndigital.nl`
  - `http://localhost:3000`
  - `http://localhost:3020`

Deployment approach:

- do not depend on `aws` CLI on `mann-dev`
- pass credentials into the app container with env vars:
  - `S3_BUCKET=lumen-yoga-media-061051249936`
  - `S3_REGION=eu-west-1`
  - `S3_ACCESS_KEY_ID=...`
  - `S3_SECRET_ACCESS_KEY=...`

A smoke test upload succeeded against the public bucket URL.

## Recommended implementation order

1. Add Payload to the existing Next.js app
2. Create `users`, `media`, and `home` / shell globals
3. Convert existing components to receive typed CMS props
4. Seed current hardcoded content into Payload
5. Add Docker Compose + production env shape
6. Deploy to `mann-dev`
7. Wire Caddy for `lumen.manndigital.nl`
8. Verify with shared-browser workflow
