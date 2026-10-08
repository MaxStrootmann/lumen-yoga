import { useEffect, useState, type FormEvent } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { DEFAULT_HOME } from "~/lib/default-content";
import { markSubmitted, trackEvent } from "~/lib/tracking";
import {
  TERMS_URL,
  isFieldVisible,
  validateRegistration,
  type FormField,
  type RegistrationForm,
  type RegistrationValues,
} from "../../shared/registration-forms";
import SubpageLayout from "./SubpageLayout";

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
}) {
  const id = `veld-${field.name}`;

  if (field.type === "radio" || field.type === "checkboxes") {
    const selected = Array.isArray(value) ? value : value ? [value] : [];
    return (
      <div className="space-y-2 pt-2" role={field.type === "radio" ? "radiogroup" : "group"}>
        {field.options?.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option} className="flex cursor-pointer items-start gap-3">
              <input
                type={field.type === "radio" ? "radio" : "checkbox"}
                name={field.name}
                value={option}
                checked={checked}
                className="mt-1 h-4 w-4 shrink-0 accent-[#B361A4]"
                onChange={() => {
                  if (field.type === "radio") {
                    onChange(option);
                  } else {
                    onChange(
                      checked
                        ? selected.filter((item) => item !== option)
                        : [...selected, option],
                    );
                  }
                }}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={value === "ja"}
          className="mt-1 h-4 w-4 shrink-0 accent-[#B361A4]"
          onChange={(event) => onChange(event.target.checked ? "ja" : "")}
        />
        <span>{field.label}</span>
      </label>
    );
  }

  if (field.type === "consent") {
    return (
      <label className="flex cursor-pointer items-start gap-3 pt-2">
        <input
          id={id}
          type="checkbox"
          checked={value === "ja"}
          className="mt-1 h-4 w-4 shrink-0 accent-[#B361A4]"
          onChange={(event) => onChange(event.target.checked ? "ja" : "")}
        />
        <span>
          Bij het inschrijven ga ik akkoord met de{" "}
          <a href={TERMS_URL} target="_blank" rel="noreferrer" className="font-bold underline">
            algemene voorwaarden
          </a>
          .
        </span>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <Textarea
        id={id}
        name={field.name}
        value={typeof value === "string" ? value : ""}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="text-base"
      />
    );
  }

  return (
    <Input
      id={id}
      name={field.name}
      type={field.type}
      placeholder={field.placeholder}
      autoComplete={
        field.type === "email" ? "email" : field.type === "tel" ? "tel" : undefined
      }
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(event.target.value)}
      className="text-base"
    />
  );
}

/** Infoblok boven het formulier: wanneer en waar, tarieven en "goed om te weten". */
function FormInfo({ form }: { form: RegistrationForm }) {
  if (form.info.length === 0 && form.prices.length === 0 && form.notes.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border-2 border-black">
      {form.info.length > 0 ? (
        <dl className="space-y-4 p-6">
          {form.info.map((row) => (
            <div key={row.label} className="sm:flex sm:gap-6">
              <dt className="text-xs font-bold uppercase tracking-wider text-black/60 sm:w-24 sm:shrink-0 sm:pt-1">
                {row.label}
              </dt>
              <dd className="pt-1 leading-snug sm:pt-0">
                {row.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {form.prices.length > 0 ? (
        <div className="border-t-2 border-black p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-black/60">Tarieven</p>
          <ul className="divide-y divide-black/10 pt-2">
            {form.prices.map((row) => (
              <li key={row.label} className="flex items-baseline justify-between gap-4 py-2">
                <span>
                  <span className="font-semibold">{row.label}</span>
                  {row.note ? (
                    <span className="block text-sm text-black/60">{row.note}</span>
                  ) : null}
                </span>
                <span className="shrink-0 text-right font-bold">{row.price}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {form.notes.length > 0 ? (
        <div className="border-t-2 border-black p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-black/60">
            Goed om te weten
          </p>
          <ul className="space-y-2 pt-2 text-sm">
            {form.notes.map((note) => (
              <li key={note} className="flex gap-2">
                <span aria-hidden="true" className="text-magenta">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/** Keurmerk van de Kinderyoga Academie, hetzelfde als in "Over mij" op de homepage. */
function Certification() {
  const certification = DEFAULT_HOME.about.certification;
  return (
    <a
      href={certification.url}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("certificaat_klik")}
      className="group mt-6 inline-flex items-center gap-4"
    >
      <img
        src={certification.seal.url}
        alt={certification.seal.alt}
        width={96}
        height={96}
        loading="lazy"
        decoding="async"
        className="h-24 w-24 shrink-0 transition-transform group-hover:scale-105"
      />
      <span className="flex flex-col leading-tight">
        <span className="font-bold">{certification.title}</span>
        <span className="pt-1 text-sm group-hover:underline">{certification.issuer}</span>
      </span>
    </a>
  );
}

/** Vooraf kiezen via de URL, bijvoorbeeld ?groep=peuters vanaf de aanbodkaart. */
function initialValues(form: RegistrationForm): RegistrationValues {
  const params = new URLSearchParams(window.location.search);
  const values: RegistrationValues = {};
  for (const field of form.fields) {
    const wanted = params.get(field.name)?.toLowerCase();
    if (!wanted || field.type !== "radio") continue;
    const option = field.options?.find((item) => item.toLowerCase().startsWith(wanted));
    if (option) values[field.name] = option;
  }
  return values;
}

export default function RegistrationPage({ form }: { form: RegistrationForm }) {
  const [values, setValues] = useState<RegistrationValues>(() => initialValues(form));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [opened, setOpened] = useState<string[]>([]);
  const submitLabel = form.noun === "aanvraag" ? "Aanvraag versturen" : "Aanmelding versturen";

  useEffect(() => {
    document.title = form.pageTitle ?? `Aanmelden: ${form.title} | Lumen Yoga`;
    if (form.metaDescription) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", form.metaDescription);
    }
    trackEvent("aanmeldformulier_bekeken", { formulier: form.slug });
  }, [form]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validateRegistration(form, values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document
        .getElementById(`blok-${firstError}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/aanmelden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formulier: form.slug,
          values,
          website: honeypot,
          duur: Date.now() - startedAt,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Record<string, string>;
      };

      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(`status ${response.status}`);
      }

      markSubmitted(form.slug);
      window.location.assign(`/bedankt?formulier=${encodeURIComponent(form.slug)}`);
    } catch {
      trackEvent("aanmelding_mislukt", { formulier: form.slug });
      setSubmitError(
        "Er ging iets mis bij het versturen. Probeer het opnieuw of stuur Ellen een berichtje via WhatsApp.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <SubpageLayout>
      <h1 className="text-4xl font-bold lg:text-5xl">{form.title}</h1>
      <div className="space-y-3 pt-6">
        {form.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <FormInfo form={form} />
      {form.sections?.map((section) => (
        <section key={section.heading} className="pt-10">
          <h2 className="text-2xl font-bold lg:text-3xl">{section.heading}</h2>
          <div className="space-y-3 pt-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {section.certification ? <Certification /> : null}
        </section>
      ))}

      <form onSubmit={handleSubmit} noValidate className="space-y-6 pt-10">
        {form.fields.map((field) => {
          if (!isFieldVisible(field, values)) return null;
          if (field.toggle && !opened.includes(field.name) && !values[field.name]) {
            return (
              <button
                key={field.name}
                type="button"
                className="text-sm font-semibold underline underline-offset-4"
                onClick={() => setOpened((current) => [...current, field.name])}
              >
                {field.toggle}
              </button>
            );
          }
          const isGroup = ["radio", "checkboxes"].includes(field.type);
          const hasOwnLabel = field.type === "consent" || field.type === "checkbox";
          const optional = !field.required && !field.showWhen ? (
            <span className="font-normal text-black/50"> (optioneel)</span>
          ) : null;
          return (
            <div key={field.name} id={`blok-${field.name}`}>
              {!hasOwnLabel ? (
                isGroup ? (
                  <p className="font-bold">
                    {field.label}
                    {optional}
                  </p>
                ) : (
                  <label htmlFor={`veld-${field.name}`} className="font-bold">
                    {field.label}
                    {optional}
                  </label>
                )
              ) : null}
              <div className={isGroup || hasOwnLabel ? "" : "pt-2"}>
                <FieldInput
                  field={field}
                  value={values[field.name]}
                  onChange={(value) => {
                    setValues((current) => ({ ...current, [field.name]: value }));
                    setErrors(({ [field.name]: _removed, ...rest }) => rest);
                  }}
                />
              </div>
              {errors[field.name] ? (
                <p className="pt-1 text-sm font-semibold text-[#c0392b]">{errors[field.name]}</p>
              ) : null}
            </div>
          );
        })}

        <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
          <label>
            Laat dit veld leeg
            <input
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </label>
        </div>

        <div className="pt-2">
          <Button bgColor="yellow" type="submit" size="min" disabled={isSubmitting}>
            {isSubmitting ? "Versturen..." : submitLabel}
          </Button>
          {submitError ? (
            <p className="pt-3 text-sm font-semibold text-[#c0392b]">{submitError}</p>
          ) : null}
          {Object.keys(errors).length > 0 && !submitError ? (
            <p className="pt-3 text-sm font-semibold text-[#c0392b]">
              Controleer de gemarkeerde velden.
            </p>
          ) : null}
        </div>
      </form>
    </SubpageLayout>
  );
}
