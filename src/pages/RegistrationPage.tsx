import { useEffect, useState, type FormEvent } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { trackEvent } from "~/lib/tracking";
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
                className="mt-1 h-4 w-4 accent-[#B361A4]"
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

  if (field.type === "consent") {
    return (
      <label className="flex cursor-pointer items-start gap-3 pt-2">
        <input
          id={id}
          type="checkbox"
          checked={value === "ja"}
          className="mt-1 h-4 w-4 accent-[#B361A4]"
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
      autoComplete={
        field.type === "email" ? "email" : field.type === "tel" ? "tel" : undefined
      }
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(event.target.value)}
      className="text-base"
    />
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

  useEffect(() => {
    document.title = `Aanmelden: ${form.title} | Lumen Yoga`;
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
      {form.details.length > 0 ? (
        <ul className="mt-6 space-y-1 rounded-3xl border-4 border-black p-6 text-sm font-medium">
          {form.details.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-6 pt-10">
        {form.fields.map((field) => {
          if (!isFieldVisible(field, values)) return null;
          const isGroup = ["radio", "checkboxes", "consent"].includes(field.type);
          return (
            <div key={field.name} id={`blok-${field.name}`}>
              {field.type !== "consent" ? (
                isGroup ? (
                  <p className="font-bold">
                    {field.label}
                    {field.required ? <span className="text-magenta"> *</span> : null}
                  </p>
                ) : (
                  <label htmlFor={`veld-${field.name}`} className="font-bold">
                    {field.label}
                    {field.required ? <span className="text-magenta"> *</span> : null}
                  </label>
                )
              ) : null}
              <div className={isGroup ? "" : "pt-2"}>
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
            {isSubmitting ? "Versturen..." : "Aanmelding versturen"}
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
