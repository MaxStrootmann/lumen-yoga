import { existsSync } from "node:fs";
import { join, normalize, resolve } from "node:path";

import { Resend } from "resend";
import { z } from "zod";

const distRoot = resolve(import.meta.dir, "../dist");
const port = Number(process.env.PORT ?? 80);

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
}

function jsonResponse(body: ContactResponse, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function resolveStaticPath(pathname: string): string | null {
  const decodedPath = decodeURIComponent(pathname.split("?")[0] || "/");
  const normalizedPath = normalize(decodedPath).replace(/^([/\\])+/, "");
  const candidate = resolve(join(distRoot, normalizedPath || "index.html"));

  if (!candidate.startsWith(distRoot)) {
    return null;
  }

  if (existsSync(candidate)) {
    return candidate;
  }

  return join(distRoot, "index.html");
}

async function parseContactPayload(request: Request): Promise<ContactPayload> {
  const body = await request.json();
  return contactSchema.parse(body);
}

async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing");
  }

  const resend = new Resend(apiKey);
  const recipients =
    process.env.NODE_ENV === "production"
      ? ["ellen@lumenyoga.nl"]
      : ["strootmann95@gmail.com"];

  await resend.emails.send({
    from: "Lumen Yoga Contact <email@manndigital.nl>",
    to: recipients,
    subject: `Bericht van ${payload.naam} - Lumen Yoga Contact`,
    html: `<p>Naam: ${payload.naam}</p><p>Email: ${payload.email}</p><p>Bericht: ${payload.bericht}</p>`,
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
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request);
    }

    return handleStatic(request);
  },
});

console.log(`Lumen Yoga server listening on :${port}`);
