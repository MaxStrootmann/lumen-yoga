"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { MATERNITY_MODAL_EVENT } from "~/lib/maternity-modal";
import posthog from "posthog-js";

export default function MaternityLeaveModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#verlof") {
        setIsOpen(true);
      }
    };
    const openFromEvent = () => {
      setIsOpen(true);
    };

    posthog.capture("maternity_modal_viewed");
    setIsOpen(true);

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    window.addEventListener(MATERNITY_MODAL_EVENT, openFromEvent);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      window.removeEventListener(MATERNITY_MODAL_EVENT, openFromEvent);
    };
  }, []);

  const handleClose = () => {
    if (window.location.hash === "#verlof") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    posthog.capture("maternity_modal_dismissed");
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        } else {
          setIsOpen(true);
        }
      }}
    >
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          closeButtonRef.current?.focus();
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <DialogTitle>
            Lumen Yoga viert momenteel zwangerschapsverlof
          </DialogTitle>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Sluit melding"
            className="hover:bg-neutral-100 rounded-md border border-black px-3 py-1 text-sm font-bold"
          >
            Sluiten
          </button>
        </div>

        <DialogDescription className="pt-4 text-base text-black">
          Ik ben er even tussenuit, maar kijk er nu al naar uit om jullie in de
          zomer weer te zien op de mat in Schagen!
        </DialogDescription>

        <div className="space-y-4 pt-4 text-base text-black">
          <div>
            <p className="font-bold">De agenda voor 2026:</p>
            <p>Zaterdag 4 juli: Eerste ouder-kindyoga workshop</p>
            <p>Woensdag 19 augustus: Start van de wekelijkse lessen</p>
          </div>
          <div>
            <p className="font-bold">Aanmelden:</p>
            <p>
              Je kunt je voor alle lessen en workshops alvast opgeven via de
              website. Eind juni neem ik contact met je op om de inschrijving te
              bevestigen.
            </p>
          </div>
          <p>Ik wens je een mooie tijd en tot snel!</p>
          <p className="font-semibold">Ellen Wissink - Lumen Yoga</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
