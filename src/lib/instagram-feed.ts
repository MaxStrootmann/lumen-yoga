// src/lib/instagram-feed.ts

export type InstagramFeedLayout =
  | "grid"
  | "carousel"
  | "masonry"
  | "slider"
  | string;

export type InstagramFeedDirection = "up" | "down" | "left" | "right" | string;

export interface InstagramFeedSettings {
  layout: InstagramFeedLayout;
  source: "insta" | "hashtag" | string;
  selected: "uname" | "tag" | string;
  header: boolean;
  autoplay: boolean;
  zigzag: boolean;
  cols: number;
  cardHeight: number;
  gap: number;
  direction: InstagramFeedDirection;
  height: number;
  bgColor: string;
  txtColor: string;
  ukey: string;
}

export interface InstagramFeedOptions {
  target: HTMLElement;
  props: {
    settings: InstagramFeedSettings;
  };
}

export interface InstagramFeedConstructor {
  new (options: InstagramFeedOptions): unknown;
}

declare global {
  interface Window {
    FouitaInstagramFeed?: InstagramFeedConstructor;
    __fouitaInstagramLoaded__?: boolean;
  }
}

const SCRIPT_SRC = "https://cdn.fouita.com/public/instagram-feed.js?11";

/**
 * Load the Fouita script once on the client.
 */
export function loadInstagramScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  // Already loaded
  if (window.__fouitaInstagramLoaded__) return Promise.resolve();

  // If a script tag with this src already exists, reuse its promise.
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${SCRIPT_SRC}"]`,
  );
  if (existing && window.FouitaInstagramFeed) {
    window.__fouitaInstagramLoaded__ = true;
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;

    script.onload = () => {
      window.__fouitaInstagramLoaded__ = true;
      resolve();
    };
    script.onerror = () => {
      reject(new Error("Failed to load Fouita Instagram script"));
    };

    document.body.appendChild(script);
  });
}

/**
 * Initialise the feed in a given element after the script is loaded.
 */
export async function initInstagramFeed(
  target: HTMLElement,
  settings: InstagramFeedSettings,
): Promise<unknown | void> {
  await loadInstagramScript();

  const Ctor = window.FouitaInstagramFeed;
  if (!Ctor) {
    console.error("FouitaInstagramFeed constructor not found on window");
    return;
  }

  return new Ctor({
    target,
    props: { settings },
  });
}
