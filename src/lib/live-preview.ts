import type { PayloadRequest } from "payload";

import { env } from "~/env";

function getHeader(req: PayloadRequest, name: string): string | undefined {
  const headers = req.headers;

  if (!headers) {
    return undefined;
  }

  if (typeof (headers as Headers).get === "function") {
    return (headers as Headers).get(name) ?? undefined;
  }

  const headerMap = headers as unknown as Record<
    string,
    string | string[] | undefined
  >;
  const value = headerMap[name] ?? headerMap[name.toLowerCase()];

  return Array.isArray(value) ? value[0] : value;
}

export function getServerURL(req: PayloadRequest): string {
  const protocol = getHeader(req, "x-forwarded-proto") ?? "https";
  const host =
    getHeader(req, "x-forwarded-host") ?? getHeader(req, "host") ?? "localhost:3000";

  return `${protocol}://${host}`;
}

export function getPreviewURL(req: PayloadRequest, path = "/"): string {
  const serverURL = getServerURL(req);
  const previewURL = new URL("/next/preview", serverURL);

  previewURL.searchParams.set("secret", env.PREVIEW_SECRET);
  previewURL.searchParams.set("path", path);

  return previewURL.toString();
}
