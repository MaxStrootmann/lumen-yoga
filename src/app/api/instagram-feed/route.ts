// app/api/instagram-feed/route.ts
import { NextResponse } from "next/server";

const META_VERSION = "v19.0";

export async function GET() {
  const igUserId = process.env.IG_USER_ID;
  const token = process.env.IG_LONG_LIVED_TOKEN;

  if (!igUserId || !token) {
    return NextResponse.json(
      { error: "Instagram not configured" },
      { status: 500 },
    );
  }

  const fields = [
    "id",
    "media_type",
    "media_url",
    "permalink",
    "caption",
    "thumbnail_url",
    "timestamp",
  ].join(",");

  const url =
    `https://graph.facebook.com/${META_VERSION}/${igUserId}/media` +
    `?fields=${fields}&limit=12&access_token=${encodeURIComponent(token)}`;

  const res = await fetch(url, { next: { revalidate: 60 } }); // ISR-like caching
  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "IG API error", text }, { status: 500 });
  }

  const data = (await res.json()) as { data: any[] };
  return NextResponse.json(data.data ?? []);
}
