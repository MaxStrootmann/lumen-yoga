<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Lumen Yoga Next.js App Router project. PostHog is initialized client-side via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with automatic error/exception tracking enabled. A reverse proxy is configured in `next.config.js` so PostHog requests route through `/ingest`, reducing the chance of being blocked by ad-blockers. A server-side PostHog client (`src/lib/posthog-server.ts`) was created for tracking critical server actions. The `src/env.ts` t3-oss schema was extended to validate the two new PostHog environment variables at build time.

12 events are now instrumented across 7 files, covering the full user journey from landing on the homepage to submitting the contact form — including registration intent signals, high-intent engagement actions, and server-side confirmation of email delivery.

| Event name | Description | File |
|---|---|---|
| `registration_clicked` | User clicked the hero 'Aanmelden' (register) button | `src/components/HeroButtons.tsx` |
| `more_info_clicked` | User clicked the 'Meer info' button in the hero section | `src/components/HeroButtons.tsx` |
| `contact_form_submitted` | User successfully submitted the contact form | `src/components/ContactForm.tsx` |
| `contact_form_error` | An error occurred when the user submitted the contact form | `src/components/ContactForm.tsx` |
| `email_copied` | User copied the email address to clipboard | `src/components/CopyEmail.tsx` |
| `offer_registration_clicked` | User clicked an 'Aanmelden' or 'Meer info' button on an offer card | `src/components/OfferCarousel.tsx` |
| `nav_registration_clicked` | User clicked the 'Aanmelden' button in the top navigation bar | `src/components/Nav.tsx` |
| `maternity_modal_viewed` | User viewed the maternity leave modal | `src/components/MaternityLeaveModal.tsx` |
| `maternity_modal_dismissed` | User dismissed/closed the maternity leave modal | `src/components/MaternityLeaveModal.tsx` |
| `location_link_clicked` | User clicked the location link (Google Maps) in the hero section | `src/components/Hero.tsx` |
| `send_email_server_action_called` | Server action sendEmail was invoked successfully (server-side) | `src/lib/sendEmail.ts` |
| `send_email_server_action_failed` | Server action sendEmail failed to send the email (server-side) | `src/lib/sendEmail.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard – Analytics basics**: https://eu.posthog.com/project/133579/dashboard/545938
- 📈 **Registration Clicks by Source** – Hero, Offer, and Nav registration click trends: https://eu.posthog.com/project/133579/insights/Z0F2is98
- 🔀 **Contact Form Conversion Funnel** – From "Meer Info" click to form submission: https://eu.posthog.com/project/133579/insights/QSdBnrfk
- 📬 **Contact Form Submission Trend** – Daily submissions vs errors: https://eu.posthog.com/project/133579/insights/44lYR9uQ
- 💬 **Maternity Modal Engagement** – Modal views vs dismissals: https://eu.posthog.com/project/133579/insights/JCQ3qhQ8
- 📍 **Email & Location Engagement** – Email copy and location link clicks: https://eu.posthog.com/project/133579/insights/3jyfV3aC

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
