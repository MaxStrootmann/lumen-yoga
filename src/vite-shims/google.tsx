import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function sendGTMEvent(...args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args.length === 1 ? args[0] : args);
}

export function GoogleTagManager({ gtmId }: { gtmId: string }) {
  useEffect(() => {
    if (!gtmId || document.querySelector(`script[data-gtm-id="${gtmId}"]`)) return;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

    const script = document.createElement("script");
    script.async = true;
    script.dataset.gtmId = gtmId;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }, [gtmId]);

  return null;
}
