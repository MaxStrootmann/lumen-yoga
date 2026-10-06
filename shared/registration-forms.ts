// Aanmeldformulieren die eerst in Google Forms stonden. De client toont ze,
// de server valideert er de inzending mee. Data en tarieven pas je hier aan.

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "radio"
  | "checkboxes"
  /** Eén los vinkje, niet verplicht: waarde "ja" of leeg. */
  | "checkbox"
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
  /** Verborgen achter een linkje met deze tekst, zodat het formulier kort oogt. */
  toggle?: string;
}

/** Een regel in het infoblok, bijvoorbeeld "Wanneer" met de tijden eronder. */
export interface InfoRow {
  label: string;
  lines: readonly string[];
}

export interface PriceRow {
  label: string;
  price: string;
  note?: string;
}

export interface RegistrationForm {
  slug: string;
  title: string;
  intro: readonly string[];
  info: readonly InfoRow[];
  prices: readonly PriceRow[];
  /** "Goed om te weten": korte zinnen onder het infoblok. */
  notes: readonly string[];
  fields: readonly FormField[];
  /** Veld met de naam die in de bevestigingsmail wordt gebruikt. */
  nameField: string;
  confirmation: string;
}

const PHOTO_CONSENT =
  "Mag ik tijdens de les foto's of video's maken en die delen op social media?";
const NEWSLETTER_FIELD: FormField = {
  name: "nieuwsbrief",
  label: "Ja, stuur mij de nieuwsbrief (4x per jaar) met nieuwe lessen en activiteiten.",
  type: "checkbox",
};
const LOCATION: InfoRow = { label: "Waar", lines: ["YPHS Huis, Zijperweg 9, Schagen"] };
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
    info: [
      { label: "Wanneer", lines: ["Woensdag 15.45 – 16.45 uur", "Nieuwe reeks vanaf 21 oktober"] },
      {
        label: "Lesdata",
        lines: ["21 en 28 oktober", "4, 18 en 25 november (niet op 11 november)", "2, 9 en 16 december"],
      },
      { label: "Groep", lines: ["4 t/m 12 jaar, samen in één groep"] },
      LOCATION,
    ],
    prices: [
      { label: "Proeflespakket", note: "2 lessen", price: "€15" },
      { label: "Losse les", note: "Als er plek is", price: "€12,50" },
      { label: "Strippenkaart", note: "10 lessen, 6 maanden geldig (€11,50 per les)", price: "€115" },
      { label: "Lessenreeks", note: "Instromen kan altijd, het tarief passen we dan aan", price: "€9,50 per les" },
    ],
    notes: [
      "Beperkt aantal plaatsen. De reeks gaat door vanaf 3 aanmeldingen.",
      "Bij meer aanmeldingen splitsen we de groep: 4 t/m 7 jaar om 14.30 uur en 8 t/m 12 jaar om 15.45 uur.",
    ],
    fields: [
      { name: "kind", label: "Naam en leeftijd van je kind", type: "text", required: true },
      { name: "ouder", label: "Jouw naam", type: "text", required: true },
      { name: "email", label: "E-mailadres", type: "email", required: true },
      { name: "telefoon", label: "Telefoonnummer", type: "tel", required: true },
      {
        name: "keuze",
        label: "Ik kies voor",
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
      { name: "opmerkingen", label: "Vragen of opmerkingen", type: "textarea" },
      NEWSLETTER_FIELD,
      { name: "voorwaarden", label: TERMS, type: "consent", required: true },
    ],
    nameField: "ouder",
    confirmation:
      "Super leuk dat je jouw kind hebt aangemeld voor kinderyoga op de woensdagmiddag! Ik neem zo snel mogelijk contact met je op voor meer informatie en om de betaling te regelen.",
  },
  {
    slug: "ouder-kindyoga",
    title: "Ouder-kindyoga",
    intro: [
      "Samen bewegen, ontspannen en plezier maken! In elke schoolvakantie organiseert Lumen Yoga speciale ouder-kindworkshops. Een heerlijk moment van échte aandacht voor elkaar.",
    ],
    info: [
      {
        label: "Wanneer",
        lines: ["Zaterdag 17 oktober", "Zaterdag 2 januari", "Zaterdag 27 februari"],
      },
      {
        label: "Groepen",
        lines: [
          "Peuters (2 t/m 4 jaar): 9.30 – 10.15 uur",
          "Kinderen (4 t/m 12 jaar): 10.30 – 11.30 uur",
        ],
      },
      LOCATION,
    ],
    prices: [
      { label: "Ouder-kindduo", price: "€20" },
      { label: "Kwartet", note: "Twee ouder-kindduo's samen", price: "€30" },
    ],
    notes: [
      "Is je kind 4? Kies de groep die het beste past. Twijfel je, app Ellen dan even.",
      "De les gaat door vanaf 3 aanmeldingen.",
      "Buiten de vakanties is er elke woensdagmiddag kinderyoga.",
    ],
    fields: [
      { name: "naam", label: "Naam ouder/verzorger en kind", type: "text", required: true },
      { name: "email", label: "E-mailadres", type: "email", required: true },
      { name: "telefoon", label: "Telefoonnummer", type: "tel", required: true },
      {
        name: "groep",
        label: "Groep",
        type: "radio",
        required: true,
        options: [
          "Peuters (2 t/m 4 jaar): 09.30 – 10.15 uur",
          "Kinderen (4 t/m 12 jaar): 10.30 – 11.30 uur",
        ],
      },
      {
        name: "workshops",
        label: "Welke zaterdag(en)?",
        type: "checkboxes",
        required: true,
        options: ["Zaterdag 17 oktober", "Zaterdag 2 januari", "Zaterdag 27 februari"],
      },
      {
        name: "kwartet",
        label: "We komen met twee duo's (kwartet, samen €30)",
        type: "checkbox",
      },
      {
        name: "tweedeDuo",
        label: "Naam tweede ouder/verzorger en kind",
        type: "text",
        showWhen: "kwartet",
      },
      { name: "fotos", label: PHOTO_CONSENT, type: "radio", required: true, options: ["Ja", "Nee"] },
      { name: "opmerkingen", label: "Vragen of opmerkingen", type: "textarea" },
      { name: "kortingscode", label: "Kortingscode", type: "text", toggle: "Heb je een kortingscode?" },
      NEWSLETTER_FIELD,
      { name: "voorwaarden", label: TERMS, type: "consent", required: true },
    ],
    nameField: "naam",
    confirmation:
      "Super leuk dat jullie je hebben aangemeld voor ouder-kindyoga! Ik neem zo snel mogelijk contact met je op voor meer informatie en om de betaling te regelen.",
  },
  {
    slug: "workshop",
    title: "Kinderyoga workshop op maat",
    intro: [
      "Wat leuk dat je interesse hebt in een kinderyogaworkshop van Lumen Yoga!",
      "Voor een kinderdagverblijf, school, buurthuis, evenement of kinderfeestje. Vertel kort wat je zoekt, dan neem ik zo snel mogelijk contact met je op.",
    ],
    info: [],
    prices: [],
    notes: [],
    fields: [
      { name: "contactpersoon", label: "Jouw naam", type: "text", required: true },
      { name: "email", label: "E-mailadres", type: "email", required: true },
      { name: "telefoon", label: "Telefoonnummer", type: "tel", required: true },
      { name: "organisatie", label: "Organisatie", type: "text" },
      { name: "adres", label: "Locatie (plaats of adres)", type: "text" },
      {
        name: "groep",
        label: "Leeftijd en aantal kinderen",
        type: "text",
        placeholder: "Bijvoorbeeld: 12 kinderen van 4 tot 6 jaar",
      },
      { name: "voorkeur", label: "Voorkeur voor datum en tijd", type: "text" },
      {
        name: "wensen",
        label: "Wensen of bijzonderheden",
        type: "textarea",
        placeholder: "Een thema, de ruimte, kinderen die extra aandacht nodig hebben…",
      },
      { name: "bron", label: "Hoe ken je Lumen Yoga?", type: "text" },
      NEWSLETTER_FIELD,
      { name: "voorwaarden", label: TERMS, type: "consent", required: true },
    ],
    nameField: "contactpersoon",
    confirmation:
      "Super leuk dat je een kinderyogaworkshop wilt aanvragen! Ik neem zo snel mogelijk contact met je op voor meer informatie en om de mogelijkheden te bespreken.",
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

    if (field.type === "consent" || field.type === "checkbox") {
      if (field.required && text !== "ja") errors[field.name] = "Dit is verplicht.";
      else if (text && text !== "ja") errors[field.name] = "Ongeldige keuze.";
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

function summaryLabel(field: FormField): string {
  if (field.type === "consent") return "Algemene voorwaarden";
  if (field.name === "nieuwsbrief") return "Nieuwsbrief";
  if (field.name === "kwartet") return "Kwartet";
  return field.label;
}

/** Wil de invuller de nieuwsbrief? Dan komt die in Ellens Google-contacten. */
export function wantsNewsletter(values: RegistrationValues): boolean {
  return values.nieuwsbrief === "ja";
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
      if (field.type === "checkbox") value = value === "ja" ? "Ja" : "Nee";
      return { label: summaryLabel(field), value };
    })
    .filter((row) => row.value);
}
