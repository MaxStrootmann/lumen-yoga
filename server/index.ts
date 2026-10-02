import { existsSync, mkdirSync, statSync } from "node:fs";
import { appendFile, readFile, writeFile } from "node:fs/promises";
import { join, normalize, resolve } from "node:path";

import { Resend } from "resend";
import { z } from "zod";

import {
  findRegistrationForm,
  summarizeRegistration,
  validateRegistration,
  type RegistrationValues,
} from "../shared/registration-forms";

const distRoot = resolve(import.meta.dir, "../dist");
const port = Number(process.env.PORT ?? 80);
const isProduction = process.env.NODE_ENV === "production";

// Ontvangers zijn instelbaar zodat de preview nooit bij Ellen uitkomt.
const OWNER_RECIPIENTS = (
  process.env.LUMEN_OWNER_EMAILS ??
  (isProduction ? "ellen@lumenyoga.nl" : "strootmann95@gmail.com")
)
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);
const MAIL_FROM_ADDRESS = process.env.LUMEN_MAIL_FROM ?? "website@lumenyoga.nl";
const REPLY_TO = process.env.LUMEN_REPLY_TO ?? "ellen@lumenyoga.nl";
/** Alleen in de preview: bevestigingsmail niet naar de invuller maar naar deze adressen. */
const CONFIRMATION_OVERRIDE = process.env.LUMEN_CONFIRMATION_OVERRIDE?.trim() || "";
const DATA_DIR = process.env.LUMEN_DATA_DIR ?? "";

const contactSchema = z.object({
  naam: z.string().min(2).max(120),
  email: z.string().email().max(254),
  bericht: z.string().min(1).max(300),
});

export interface ContactPayload {
  naam: string;
  email: string;
  bericht: string;
}

export interface ContactResponse {
  ok: boolean;
  error?: string;
  errors?: Record<string, string>;
}

function jsonResponse(body: unknown, status = 200, maxAge = 0): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": maxAge ? `public, max-age=${maxAge}` : "no-store",
    },
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is missing");
  return new Resend(apiKey);
}

async function sendOrThrow(
  resend: Resend,
  message: Parameters<Resend["emails"]["send"]>[0],
): Promise<void> {
  const { error } = await resend.emails.send(message);
  if (error) throw new Error(`Resend: ${error.message}`);
}

// Eenvoudige rem tegen spam: per IP hoogstens 5 inzendingen per 10 minuten.
const recentSubmissions = new Map<string, number[]>();
function isRateLimited(request: Request, server: Bun.Server): boolean {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    server.requestIP(request)?.address ||
    "onbekend";
  const now = Date.now();
  const recent = (recentSubmissions.get(ip) ?? []).filter((time) => now - time < 600_000);
  recent.push(now);
  recentSubmissions.set(ip, recent);
  return recent.length > 5;
}

function resolveStaticPath(pathname: string): string | null {
  const decodedPath = decodeURIComponent(pathname.split("?")[0] || "/");
  const normalizedPath = normalize(decodedPath).replace(/^([/\\])+/, "");
  const candidate = resolve(join(distRoot, normalizedPath || "index.html"));

  if (!candidate.startsWith(distRoot)) {
    return null;
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }

  return join(distRoot, "index.html");
}

async function parseContactPayload(request: Request): Promise<ContactPayload> {
  const body = await request.json();
  return contactSchema.parse(body);
}

async function sendContactEmail(payload: ContactPayload): Promise<void> {
  await sendOrThrow(getResend(), {
    from: `Lumen Yoga Contact <${MAIL_FROM_ADDRESS}>`,
    to: OWNER_RECIPIENTS,
    subject: `Bericht van ${payload.naam} - Lumen Yoga Contact`,
    html: `<p>Naam: ${escapeHtml(payload.naam)}</p><p>Email: ${escapeHtml(payload.email)}</p><p>Bericht: ${escapeHtml(payload.bericht)}</p>`,
    reply_to: payload.email,
  });
}

async function handleContact(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const payload = await parseContactPayload(request);
    await sendContactEmail(payload);
    return jsonResponse({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ ok: false, error: "Invalid contact payload" }, 400);
    }

    console.error("Contact form send failed", error);
    return jsonResponse({ ok: false, error: "Email send failed" }, 500);
  }
}

const registrationSchema = z.object({
  formulier: z.string().max(40),
  values: z.record(z.union([z.string().max(2000), z.array(z.string().max(200)).max(10)])),
  website: z.string().max(200).optional(),
  duur: z.number().optional(),
});

function rowsToHtml(rows: Array<{ label: string; value: string }>): string {
  return `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      (row) =>
        `<tr><td style="vertical-align:top;font-weight:bold;border-bottom:1px solid #eee">${escapeHtml(row.label)}</td><td style="vertical-align:top;border-bottom:1px solid #eee;white-space:pre-line">${escapeHtml(row.value)}</td></tr>`,
    )
    .join("")}</table>`;
}

function rowsToText(rows: Array<{ label: string; value: string }>): string {
  return rows.map((row) => `${row.label}\n${row.value}`).join("\n\n");
}

async function storeRegistration(entry: Record<string, unknown>): Promise<void> {
  if (!DATA_DIR) return;
  mkdirSync(DATA_DIR, { recursive: true });
  await appendFile(join(DATA_DIR, "aanmeldingen.jsonl"), `${JSON.stringify(entry)}\n`);
}

async function handleRegistration(request: Request, server: Bun.Server): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  let payload: z.infer<typeof registrationSchema>;
  try {
    payload = registrationSchema.parse(await request.json());
  } catch {
    return jsonResponse({ ok: false, error: "Invalid payload" }, 400);
  }

  const form = findRegistrationForm(payload.formulier);
  if (!form) return jsonResponse({ ok: false, error: "Unknown form" }, 404);

  // Honeypot of onmenselijk snel ingevuld: doe alsof het gelukt is.
  if (payload.website || (payload.duur !== undefined && payload.duur < 3000)) {
    console.warn("Registration ignored as spam", form.slug);
    return jsonResponse({ ok: true });
  }
  if (isRateLimited(request, server)) {
    return jsonResponse({ ok: false, error: "Too many requests" }, 429);
  }

  const values = payload.values as RegistrationValues;
  const errors = validateRegistration(form, values);
  if (Object.keys(errors).length > 0) {
    return jsonResponse({ ok: false, errors }, 400);
  }

  const rows = summarizeRegistration(form, values);
  const email = String(values.email ?? "").trim();
  const name = String(values[form.nameField] ?? "").trim();
  const receivedAt = new Date().toISOString();

  try {
    await storeRegistration({ receivedAt, formulier: form.slug, values });
  } catch (error) {
    console.error("Registration store failed", error);
  }

  try {
    const resend = getResend();
    await sendOrThrow(resend, {
      from: `Lumen Yoga Aanmelding <${MAIL_FROM_ADDRESS}>`,
      to: OWNER_RECIPIENTS,
      reply_to: email,
      subject: `Nieuwe aanmelding: ${form.title} - ${name}`,
      html: `<p>Er is een nieuwe aanmelding binnengekomen via lumenyoga.nl.</p>${rowsToHtml(rows)}`,
      text: `Er is een nieuwe aanmelding binnengekomen via lumenyoga.nl.\n\n${rowsToText(rows)}`,
    });

    const firstName = name.split(/\s+/)[0] ?? "";
    const confirmationTo = CONFIRMATION_OVERRIDE
      ? CONFIRMATION_OVERRIDE.split(",").map((address) => address.trim())
      : [email];
    const intro = `Hoi ${firstName},\n\n${form.confirmation}\n\nHieronder staat wat je hebt ingevuld. Klopt er iets niet? Beantwoord dan gewoon deze e-mail.`;
    await sendOrThrow(resend, {
      from: `Lumen Yoga <${MAIL_FROM_ADDRESS}>`,
      to: confirmationTo,
      reply_to: REPLY_TO,
      subject: `Bevestiging van je aanmelding: ${form.title}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5">${intro
        .split("\n\n")
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join("")}${rowsToHtml(rows)}<p>Liefs,<br>Ellen<br>Lumen Yoga<br>YPHS Huis, Zijperweg 9, Schagen<br><a href="https://lumenyoga.nl">lumenyoga.nl</a></p></div>`,
      text: `${intro}\n\n${rowsToText(rows)}\n\nLiefs,\nEllen\nLumen Yoga\nYPHS Huis, Zijperweg 9, Schagen\nhttps://lumenyoga.nl`,
    });
  } catch (error) {
    console.error("Registration mail failed", error);
    return jsonResponse({ ok: false, error: "Email send failed" }, 500);
  }

  return jsonResponse({ ok: true });
}

// --- Instagram -------------------------------------------------------------
// Officiële Instagram API (Instagram Login). Het long-lived token is 60 dagen
// geldig; we verversen het automatisch en bewaren het in LUMEN_DATA_DIR.

type InstagramPost = { id: string; permalink: string; imageUrl: string; caption: string };
let instagramCache: { at: number; posts: InstagramPost[] } | null = null;

async function readInstagramToken(): Promise<{ token: string; refreshedAt: number } | null> {
  if (DATA_DIR) {
    try {
      const stored = JSON.parse(await readFile(join(DATA_DIR, "instagram-token.json"), "utf8"));
      if (stored.token) return stored;
    } catch {
      // Nog geen opgeslagen token; val terug op de env.
    }
  }
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  return token ? { token, refreshedAt: 0 } : null;
}

async function refreshInstagramToken(current: { token: string; refreshedAt: number }) {
  if (!DATA_DIR || Date.now() - current.refreshedAt < 7 * 86_400_000) return current;
  try {
    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(current.token)}`,
    );
    const data = (await response.json()) as { access_token?: string };
    if (!data.access_token) return current;
    const next = { token: data.access_token, refreshedAt: Date.now() };
    mkdirSync(DATA_DIR, { recursive: true });
    await writeFile(join(DATA_DIR, "instagram-token.json"), JSON.stringify(next), { mode: 0o600 });
    return next;
  } catch (error) {
    console.error("Instagram token refresh failed", error);
    return current;
  }
}

async function handleInstagram(): Promise<Response> {
  if (instagramCache && Date.now() - instagramCache.at < 3_600_000) {
    return jsonResponse({ posts: instagramCache.posts }, 200, 600);
  }

  const stored = await readInstagramToken();
  if (!stored) return jsonResponse({ posts: [] }, 200, 600);

  try {
    const { token } = await refreshInstagramToken(stored);
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=12&access_token=${encodeURIComponent(token)}`,
    );
    if (!response.ok) throw new Error(`Instagram ${response.status}`);
    const data = (await response.json()) as {
      data?: Array<{
        id: string;
        caption?: string;
        media_type: string;
        media_url?: string;
        thumbnail_url?: string;
        permalink: string;
      }>;
    };
    const posts = (data.data ?? [])
      .map((item) => ({
        id: item.id,
        permalink: item.permalink,
        imageUrl: (item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url) ?? "",
        caption: item.caption ?? "",
      }))
      .filter((post) => post.imageUrl)
      .slice(0, 6);
    instagramCache = { at: Date.now(), posts };
    return jsonResponse({ posts }, 200, 600);
  } catch (error) {
    console.error("Instagram feed failed", error);
    return jsonResponse({ posts: instagramCache?.posts ?? [] }, 200, 60);
  }
}

function handleStatic(request: Request): Response {
  const url = new URL(request.url);
  const filePath = resolveStaticPath(url.pathname);

  if (!filePath) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(Bun.file(filePath));
}

Bun.serve({
  port,
  async fetch(request, server) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request);
    }
    if (url.pathname === "/api/aanmelden") {
      return handleRegistration(request, server);
    }
    if (url.pathname === "/api/instagram") {
      return handleInstagram();
    }

    return handleStatic(request);
  },
});

console.log(`Lumen Yoga server listening on :${port}`);
