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
