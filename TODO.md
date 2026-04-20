# TODO

## Payload CMS migration

- [x] Audit current hardcoded homepage structure and content domains
- [x] Audit `mann-dev` dev/prototype setup, shared browser workflow, and current Caddy usage
- [x] Confirm current hosting/deployment direction: Docker Compose + Caddy + Postgres on `mann-dev`
- [x] Confirm S3/AWS credential path and target bucket details for Payload media uploads
- [x] Add Payload dependencies and Next.js integration (`withPayload`, admin routes, API routes)
- [x] Model CMS schema for the current single-page site
- [x] Convert homepage sections from hardcoded content to Payload-driven content
- [x] Replace Cloudinary-bound media usage with Payload `media` collection usage
- [x] Keep contact form, analytics, and current UX behavior working after migration
- [x] Add seed or migration script to populate current site content into Payload
- [x] Add Docker production setup for app + Postgres
- [x] Add deployment notes for `mann-dev` and `lumen.manndigital.nl`
- [ ] Smoke test locally and via shared-browser workflow
- [ ] Deploy preview to `mann-dev`
