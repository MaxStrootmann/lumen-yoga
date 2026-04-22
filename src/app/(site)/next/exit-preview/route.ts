import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function getRequestOrigin(request: Request): string {
  const protocol = request.headers.get("x-forwarded-proto") ?? "https";
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    new URL(request.url).host;

  return `${protocol}://${host}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";

  const draft = await draftMode();
  draft.disable();

  return NextResponse.redirect(new URL(path, getRequestOrigin(request)));
}
