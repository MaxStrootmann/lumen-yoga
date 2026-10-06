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

/** Tekstblok op een eigen pagina, tussen het infoblok en het formulier. */
export interface PageSection {
  heading: string;
  paragraphs: readonly string[];
  /** Toon het keurmerk van de Kinderyoga Academie onder dit blok. */
  certification?: boolean;
}

export interface RegistrationForm {
  slug: string;
  title: string;
  /** Eigen pagina in plaats van /aanmelden/<slug>, bijvoorbeeld voor Google. */
  path?: string;
  /** Titel en beschrijving voor Google; standaard "Aanmelden: <title>". */
  pageTitle?: string;
  metaDescription?: string;
  /** "aanvraag" voor scholen en opvang; standaard "aanmelding". */
  noun?: string;
  intro: readonly string[];
  sections?: readonly PageSection[];
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
  {
    slug: "scholen-en-kinderopvang",
    path: "/scholen-en-kinderopvang",
    title: "Kinderyoga op school en in de kinderopvang",
    pageTitle: "Kinderyoga op school en in de kinderopvang in Schagen | Lumen Yoga",
    metaDescription:
      "Kinderyoga op maat voor kinderdagverblijf, peuterspeelzaal en basisschool in Schagen. Peuterlessen van 30 minuten die aansluiten op het VVE-programma, en Schoolverlichting in de klas.",
    noun: "aanvraag",
    intro: [
      "Ik kom met kinderyoga naar jullie kinderdagverblijf, peuterspeelzaal of basisschool. Op maat, in jullie eigen ruimte en afgestemd op de groep.",
    ],
    info: [
      { label: "Opvang", lines: ["Peuterlessen van 30 minuten", "Bij elk VVE-thema een passende les"] },
      { label: "School", lines: ["Schoolverlichting: 6 weken een half uur per week in de klas"] },
      { label: "Tarief", lines: ["Op maat"] },
    ],
    prices: [],
    notes: [],
    sections: [
      {
        heading: "Waarom kinderyoga in de klas of op de groep?",
        paragraphs: [
          "Bij kinderyoga bewegen kinderen als een dier, spelen ze een verhaal na en ademen ze samen rustig in en uit. Zo leren ze spelenderwijs hun lichaam en hun gevoel kennen. Ze ontdekken ook dat er in jezelf altijd een stil plekje is waar je naartoe kunt gaan: als je hoofd vol zit, als je je niet fijn voelt of als je iets spannend vindt.",
          "Kinderen oefenen zo met wachten, luisteren en hun aandacht ergens bij houden. Onderzoek bij peuters en kleuters laat zien dat yoga daarbij kan helpen, vooral als het regelmatig terugkomt. Het draagt ook bij aan een fijne en veilige sfeer in de groep.",
        ],
      },
      {
        heading: "Voor de kinderopvang en peuterspeelzaal (2 t/m 4 jaar)",
        paragraphs: [
          "Peuters leren door te doen. Een peuterles duurt 30 minuten en is één groot spel, met liedjes, dierenhoudingen, een prentenboek en een kort rustmoment. Ze oefenen hun evenwicht en motoriek, en leren lichaamsdelen en gevoelens benoemen.",
          "Ik sluit aan bij het lopende VVE-programma van de groep: bij elk thema geef ik een passende les. Een reeks is niet nodig, elke les staat op zichzelf. De pedagogisch medewerkers doen mee, zodat zij de oefeningen daarna zelf kunnen gebruiken, bijvoorbeeld na het buitenspelen of voor het slapen.",
        ],
      },
      {
        heading: "Voor de basisschool (4 t/m 12 jaar)",
        paragraphs: [
          "Op de basisschool geef ik Schoolverlichting, een lesprogramma van De Nieuwe Yogaschool. Zes weken lang kom ik een half uur per week in de klas. Ik leer de kinderen en de leerkracht oefeningen die ze daarna zelf in de klas blijven gebruiken.",
          "De lessen sluiten aan bij de thema's en leerlijnen van de school, zodat het niet voelt als iets extra's. Ze zijn gewoon in het eigen klaslokaal: tafels en stoelen kunnen blijven staan en een gymzaal is niet nodig.",
        ],
      },
      {
        heading: "Over mij",
        paragraphs: [
          "Ik ben Ellen Wissink. Sinds 2016 werk ik op de Burgemeester de Wildeschool, en daarvoor werkte ik vijf jaar in de buitenschoolse opvang. Ik ben gecertificeerd kinderyogadocent bij de Kinderyoga Academie van Helen Purperhart.",
        ],
        certification: true,
      },
      {
        heading: "Kennismaken?",
        paragraphs: [
          "Ik kom graag vrijblijvend kennismaken, op school of op de groep. Laat hieronder je gegevens achter, dan neem ik zo snel mogelijk contact met je op.",
        ],
      },
    ],
    fields: [
      { name: "naam", label: "Jouw naam", type: "text", required: true },
      { name: "organisatie", label: "School of kinderopvang", type: "text", required: true },
      {
        name: "soort",
        label: "Waar werk je?",
        type: "radio",
        options: [
          "Basisschool",
          "Kinderopvang of peuterspeelzaal",
          "Buitenschoolse opvang",
          "Anders",
        ],
      },
      { name: "email", label: "E-mailadres", type: "email", required: true },
      { name: "telefoon", label: "Telefoonnummer", type: "tel" },
      {
        name: "bericht",
        label: "Waar denk je aan?",
        type: "textarea",
        placeholder: "Bijvoorbeeld welke groep, hoeveel kinderen of een thema.",
      },
    ],
    nameField: "naam",
    confirmation:
      "Super leuk dat je interesse hebt in kinderyoga bij jullie op de groep of in de klas! Ik neem zo snel mogelijk contact met je op om kennis te maken en de mogelijkheden te bespreken.",
  },
];

export function findRegistrationForm(slug: string): RegistrationForm | undefined {
  return REGISTRATION_FORMS.find((form) => form.slug === slug);
}

/** Formulier met een eigen pagina, zoals /scholen-en-kinderopvang. */
export function findFormByPath(path: string): RegistrationForm | undefined {
  return REGISTRATION_FORMS.find((form) => form.path === path);
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
