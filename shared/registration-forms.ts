// Aanmeldformulieren die eerst in Google Forms stonden. De client toont ze,
// de server valideert er de inzending mee. Data en tarieven pas je hier aan.

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "radio"
  | "checkboxes"
  | "consent";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: readonly string[];
  placeholder?: string;
  /** Alleen tonen (en verplicht maken) als dit andere veld een waarde heeft. */
  showWhen?: string;
}

export interface RegistrationForm {
  slug: string;
  title: string;
  intro: readonly string[];
  details: readonly string[];
  fields: readonly FormField[];
  /** Veld met de naam die in de bevestigingsmail wordt gebruikt. */
  nameField: string;
  confirmation: string;
}

const PHOTO_CONSENT =
  "Ik geef Lumen Yoga toestemming voor het maken van foto's of video's tijdens de les en het delen hiervan op social media.";
const NEWSLETTER =
  "Wil je op de hoogte blijven van toekomstige activiteiten en lessen? Schrijf je in voor onze nieuwsbrief (4x per jaar)!";
const TERMS =
  "Bij het inschrijven ga ik akkoord met de algemene voorwaarden.";

export const TERMS_URL =
  "https://drive.google.com/file/d/1jyNU2_TVlmN6UK_pNmRDR6kcUKdguYuu/view?ts=673ce9e5";

export const REGISTRATION_FORMS: readonly RegistrationForm[] = [
  {
    slug: "kinderyoga",
    title: "Kinderyoga op woensdagmiddag",
    intro: [
      "Elke woensdagmiddag kinderyoga voor kinderen van 4 t/m 12 jaar in het YPHS Huis in Schagen.",
    ],
    details: [
      "Nieuwe lessenreeks vanaf woensdag 21 oktober 2026",
      "4 t/m 7 jaar: 14.30 – 15.30 uur",
      "8 t/m 12 jaar: 15.45 – 16.45 uur",
      "Data: 21 en 28 oktober, 4, 18 en 25 november, 2, 9 en 16 december (11 november geen les)",
      "Voorlopig samen in één groep van 15.45 tot 16.45 uur. Bij meer aanmeldingen splitsen we de groepen weer op.",
      "Proeflespakket: 2 lessen voor €15",
      "Losse les: €12,50 (bij voldoende plek)",
      "Digitale strippenkaart: 10 lessen voor €115 (€11,50 per les, 6 maanden geldig)",
      "Lessenreeks: €9,50 per les. Instromen kan altijd, het tarief wordt dan aangepast.",
      "Beperkt aantal plaatsen per groep. De lessenreeks gaat door bij minimaal 3 aanmeldingen.",
    ],
    fields: [
      { name: "kind", label: "Naam kind + leeftijd", type: "text", required: true },
      { name: "ouder", label: "Naam ouder", type: "text", required: true },
      { name: "email", label: "E-mailadres", type: "email", required: true },
      { name: "telefoon", label: "Telefoonnummer", type: "tel", required: true },
      {
        name: "keuze",
        label: "Ik kies voor...",
        type: "radio",
        required: true,
        options: [
          "Proeflespakket - 2 lessen voor €15",
          "Losse les - €12,50 per les",
          "Strippenkaart - €11,50 per les",
          "Lessenreeks - €9,50 per les",
        ],
      },
      { name: "fotos", label: PHOTO_CONSENT, type: "radio", required: true, options: ["Ja", "Nee"] },
      { name: "nieuwsbrief", label: NEWSLETTER, type: "radio", required: true, options: ["Ja", "Nee"] },
      { name: "opmerkingen", label: "Vragen/opmerkingen", type: "textarea" },
      { name: "voorwaarden", label: TERMS, type: "consent", required: true },
    ],
    nameField: "ouder",
    confirmation:
      "Bedankt voor je aanmelding voor kinderyoga! Ik neem zo snel mogelijk contact met je op om de aanmelding te bevestigen en de betaling te regelen.",
  },
  {
    slug: "ouder-kindyoga",
    title: "Ouder-kindyoga",
    intro: [
      "Samen bewegen, ontspannen en plezier maken! In elke schoolvakantie organiseert Lumen Yoga speciale ouder-kindworkshops. Een heerlijk moment van échte aandacht voor elkaar.",
      "Buiten de vakanties is er elke woensdagmiddag kinderyoga.",
    ],
    details: [
      "Data: zaterdag 17 oktober, zaterdag 2 januari en zaterdag 27 februari",
      "Peuters (2 t/m 4 jaar): 09.30 – 10.15 uur",
      "Kinderen (4 t/m 12 jaar): 10.30 – 11.30 uur",
      "Ouder-kindduo: €20",
      "Kwartetactie: €30 (geef hieronder de extra namen op)",
      "Bij minimaal 3 aanmeldingen gaat de les door.",
    ],
    fields: [
      { name: "naam", label: "Naam ouder/verzorger en kind", type: "text", required: true },
      { name: "email", label: "E-mailadres", type: "email", required: true },
      { name: "telefoon", label: "Telefoonnummer", type: "tel", required: true },
      {
        name: "groep",
        label: "Ik kies voor...",
        type: "radio",
        required: true,
        options: [
          "Peuters (2 t/m 4 jaar): 09.30 – 10.15 uur",
          "Kinderen (4 t/m 12 jaar): 10.30 – 11.30 uur",
        ],
      },
      {
        name: "workshops",
        label: "Welke workshop(s) wil je volgen?",
        type: "checkboxes",
        required: true,
        options: ["Zaterdag 17 oktober", "Zaterdag 2 januari", "Zaterdag 27 februari"],
      },
      {
        name: "kwartet",
        label: "Ik maak gebruik van de kwartetactie (€30 voor twee duo's)",
        type: "checkboxes",
        options: ["Ja, kwartet"],
      },
      {
        name: "tweedeDuo",
        label: "Naam tweede ouder/verzorger en kind",
        type: "text",
        showWhen: "kwartet",
      },
      { name: "fotos", label: PHOTO_CONSENT, type: "radio", required: true, options: ["Ja", "Nee"] },
      { name: "nieuwsbrief", label: NEWSLETTER, type: "radio", required: true, options: ["Ja", "Nee"] },
      { name: "opmerkingen", label: "Vragen/opmerkingen", type: "textarea" },
      { name: "kortingscode", label: "Kortingscode", type: "text" },
      { name: "voorwaarden", label: TERMS, type: "consent", required: true },
    ],
    nameField: "naam",
    confirmation:
      "Bedankt voor jullie aanmelding voor ouder-kindyoga! Ik neem zo snel mogelijk contact met je op om de plek te bevestigen en de betaling te regelen.",
  },
  {
    slug: "workshop",
    title: "Kinderyoga workshop op maat",
    intro: [
      "Wat leuk dat je interesse hebt in een kinderyogaworkshop van Lumen Yoga!",
      "Zoek je een leuke activiteit voor een kinderdagverblijf, school, buurthuis, evenement of kinderfeestje? Laat hieronder je gegevens, ideeën en wensen achter. Ik neem zo snel mogelijk contact met je op.",
    ],
    details: [],
    fields: [
      { name: "contactpersoon", label: "Naam van de contactpersoon", type: "text", required: true },
      { name: "email", label: "E-mailadres", type: "email", required: true },
      { name: "telefoon", label: "Telefoonnummer", type: "tel", required: true },
      { name: "organisatie", label: "Naam van de organisatie", type: "text" },
      { name: "adres", label: "Adres van de locatie", type: "text" },
      { name: "leeftijd", label: "Leeftijdsgroep van de deelnemers", type: "text" },
      { name: "aantal", label: "Aantal deelnemers", type: "text" },
      { name: "voorkeur", label: "Voorkeur voor datum(s) en tijd(en)", type: "textarea" },
      { name: "wensen", label: "Specifieke wensen of ideeën voor de workshop", type: "textarea" },
      { name: "bijzonderheden", label: "Zijn er bijzonderheden waar ik rekening mee moet houden?", type: "textarea" },
      { name: "bron", label: "Hoe ben je bij Lumen Yoga terechtgekomen?", type: "textarea", required: true },
      { name: "nieuwsbrief", label: NEWSLETTER, type: "radio", required: true, options: ["Ja", "Nee"] },
      { name: "voorwaarden", label: TERMS, type: "consent", required: true },
    ],
    nameField: "contactpersoon",
    confirmation:
      "Bedankt voor je aanvraag voor een kinderyogaworkshop! Ik neem zo snel mogelijk contact met je op om de mogelijkheden te bespreken.",
  },
];

export function findRegistrationForm(slug: string): RegistrationForm | undefined {
  return REGISTRATION_FORMS.find((form) => form.slug === slug);
}

export function isFieldVisible(
  field: FormField,
  values: Record<string, string | string[]>,
): boolean {
  if (!field.showWhen) return true;
  const value = values[field.showWhen];
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

export type RegistrationValues = Record<string, string | string[]>;

/** Valideert een inzending; geeft per veld een foutmelding terug. */
export function validateRegistration(
  form: RegistrationForm,
  values: RegistrationValues,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of form.fields) {
    if (!isFieldVisible(field, values)) continue;
    const raw = values[field.name];
    const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const text = typeof raw === "string" ? raw.trim() : "";

    if (field.type === "consent") {
      if (field.required && text !== "ja") errors[field.name] = "Dit is verplicht.";
      continue;
    }

    if (field.type === "checkboxes") {
      if (field.required && list.length === 0) {
        errors[field.name] = "Kies minimaal één optie.";
      } else if (list.some((item) => !field.options?.includes(item))) {
        errors[field.name] = "Ongeldige keuze.";
      }
      continue;
    }

    if (field.type === "radio") {
      if (field.required && !text) {
        errors[field.name] = "Maak een keuze.";
      } else if (text && !field.options?.includes(text)) {
        errors[field.name] = "Ongeldige keuze.";
      }
      continue;
    }

    if (field.required && !text) {
      errors[field.name] = "Dit veld is verplicht.";
      continue;
    }

    const maxLength = field.type === "textarea" ? 2000 : 200;
    if (text.length > maxLength) {
      errors[field.name] = `Maximaal ${maxLength} tekens.`;
    } else if (field.type === "email" && text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      errors[field.name] = "Geen geldig e-mailadres.";
    } else if (field.type === "tel" && text && !/^[+\d][\d\s()-]{7,19}$/.test(text)) {
      errors[field.name] = "Geen geldig telefoonnummer.";
    }
  }

  return errors;
}

/** Leesbare regels (label: waarde) voor e-mail en opslag. */
export function summarizeRegistration(
  form: RegistrationForm,
  values: RegistrationValues,
): Array<{ label: string; value: string }> {
  return form.fields
    .filter((field) => isFieldVisible(field, values))
    .map((field) => {
      const raw = values[field.name];
      let value = Array.isArray(raw) ? raw.join(", ") : (raw ?? "").trim();
      if (field.type === "consent") value = value === "ja" ? "Akkoord" : "Niet akkoord";
      return { label: field.type === "consent" ? "Algemene voorwaarden" : field.label, value };
    })
    .filter((row) => row.value);
}
