import { useEffect } from "react";

import { Button } from "~/components/ui/button";
import { trackEvent } from "~/lib/tracking";
import { findRegistrationForm } from "../../shared/registration-forms";
import SubpageLayout from "./SubpageLayout";

export default function ThankYouPage() {
  const slug = new URLSearchParams(window.location.search).get("formulier") ?? "";
  const form = findRegistrationForm(slug);

  useEffect(() => {
    document.title = "Bedankt voor je aanmelding | Lumen Yoga";
    // Conversie voor GTM/GA en advertentiecampagnes: één event per bedanktpagina.
    if (form) trackEvent("aanmelding_verstuurd", { formulier: form.slug });
  }, [form]);

  return (
    <SubpageLayout>
      <h1 className="text-4xl font-bold lg:text-5xl">Bedankt voor je aanmelding!</h1>
      <p className="pt-6">
        {form?.confirmation ??
          "Bedankt! Ik neem zo snel mogelijk contact met je op."}
      </p>
      <p className="pt-4">
        Je ontvangt binnen een paar minuten een bevestiging per e-mail. Zie je die niet? Kijk
        dan even in je spammap of stuur Ellen een berichtje.
      </p>
      <div className="flex flex-wrap gap-4 pt-8">
        <a href="/">
          <Button bgColor="yellow" size="min">
            Terug naar de homepage
          </Button>
        </a>
        <a href="https://www.instagram.com/lumen.yoga/" target="_blank" rel="noreferrer">
          <Button variant="outline" size="min">
            Volg Lumen Yoga op Instagram
          </Button>
        </a>
      </div>
    </SubpageLayout>
  );
}
