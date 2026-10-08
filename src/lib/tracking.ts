import { sendGTMEvent } from "@next/third-parties/google";

/** De preview mag de campagnemeting van de live site niet vervuilen. */
export const isPreviewHost =
  typeof window !== "undefined" &&
  (window.location.hostname.startsWith("preview.") ||
    window.location.hostname === "localhost");

export const GTM_ID = isPreviewHost ? "" : "GTM-TG5CK2MX";

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (isPreviewHost) {
    console.info("[meting]", event, params);
    return;
  }
  sendGTMEvent({ event, ...params });
}

const SUBMITTED_KEY = "lumen_verzonden_formulier";

/** Onthoud dat dit formulier net is verzonden, zodat de bedankpagina één keer meet. */
export function markSubmitted(slug: string) {
  try {
    sessionStorage.setItem(SUBMITTED_KEY, slug);
  } catch {
    // Zonder sessionStorage meet de bedankpagina gewoon bij elk bezoek.
  }
}

/** Waar als dit formulier net is verzonden; wist de markering meteen. */
export function takeSubmitted(slug: string) {
  try {
    if (sessionStorage.getItem(SUBMITTED_KEY) !== slug) return false;
    sessionStorage.removeItem(SUBMITTED_KEY);
    return true;
  } catch {
    return true;
  }
}
