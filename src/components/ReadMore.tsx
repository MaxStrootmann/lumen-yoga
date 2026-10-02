import { useState, type ReactNode } from "react";

import { trackEvent } from "~/lib/tracking";

/**
 * Op mobiel staat lange tekst ingeklapt tot een paar regels met een
 * "Lees meer"-knop, zodat bezoekers de pagina kunnen scannen. Vanaf lg
 * staat alles open.
 */
export default function ReadMore({
  children,
  id,
  buttonClassName = "",
}: {
  children: ReactNode;
  id: string;
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        id={`${id}-tekst`}
        className={
          open
            ? ""
            : "relative max-h-[9.5rem] overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-14 after:bg-gradient-to-t after:from-white after:to-transparent lg:max-h-none lg:overflow-visible lg:after:hidden"
        }
      >
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-tekst`}
        onClick={() => {
          if (!open) trackEvent("lees_meer_klik", { sectie: id });
          setOpen(!open);
        }}
        className={`pt-3 font-bold underline underline-offset-4 lg:hidden ${buttonClassName}`}
      >
        {open ? "Lees minder" : "Lees meer"}
      </button>
    </>
  );
}
