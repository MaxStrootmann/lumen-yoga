"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import posthog from "posthog-js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { MATERNITY_MODAL_EVENT } from "~/lib/maternity-modal";

export default function MaternityLeaveModal({
  closingText,
  enabled,
  intro,
  scheduleItems,
  scheduleTitle,
  signature,
  signupText,
  signupTitle,
  title,
}: {
  closingText: string;
  enabled: boolean;
  intro: string;
  scheduleItems: ReadonlyArray<{ text: string }>;
  scheduleTitle: string;
  signature: string;
  signupText: string;
  signupTitle: string;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!enabled) return;

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
  }, [enabled]);

  if (!enabled) return null;

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
        <div className="flex items-start justify-between gap-1 lg:gap-2">
          <DialogTitle>{title}</DialogTitle>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Sluit melding"
            className="hover:bg-neutral-100 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <DialogDescription className="pt-4 text-base text-black">
          {intro}
        </DialogDescription>

        <div className="space-y-4 pt-4 text-base text-black">
          <div>
            <p className="font-bold">{scheduleTitle}</p>
            {scheduleItems.map((item, index) => (
              <p key={`${item.text}-${index}`}>{item.text}</p>
            ))}
          </div>
          <div>
            <p className="font-bold">{signupTitle}</p>
            <p>{signupText}</p>
          </div>
          <p>{closingText}</p>
          <p className="font-semibold">{signature}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
