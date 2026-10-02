import type { ReactNode } from "react";

import WhatsAppButton from "~/components/WhatsAppButton";
import { DEFAULT_HEADER } from "~/lib/default-content";
import { GTM_ID } from "~/lib/tracking";
import { GoogleTagManager } from "~/vite-shims/google";

export default function SubpageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GoogleTagManager gtmId={GTM_ID} />
      <header className="border-b px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <a href="/">
            <img
              src={DEFAULT_HEADER.logo.url}
              alt={DEFAULT_HEADER.logo.alt}
              className="h-12 w-auto"
            />
          </a>
          <a href="/#aanbod" className="font-bold underline underline-offset-4">
            Terug naar het aanbod
          </a>
        </div>
      </header>
      <div className="flex h-2 items-stretch">
        <div className="flex-1 bg-yellow" />
        <div className="flex-1 bg-magenta" />
        <div className="flex-1 bg-purple" />
        <div className="flex-1 bg-blue" />
        <div className="flex-1 bg-green" />
      </div>
      <main className="mx-auto max-w-3xl px-4 py-12 lg:py-16">{children}</main>
      <WhatsAppButton />
    </>
  );
}
