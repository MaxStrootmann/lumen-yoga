import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { env } from "~/env";

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
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") || "/";

  if (secret !== env.PREVIEW_SECRET) {
    return new NextResponse("Invalid preview secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(path, getRequestOrigin(request)));
}
