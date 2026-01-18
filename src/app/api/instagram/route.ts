// app/api/instagram/route.ts
import { NextRequest, NextResponse } from "next/server";

const META_VERSION = "v19.0";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const appId = process.env.META_APP_ID!;
  const appSecret = process.env.META_APP_SECRET!;
  const redirectUri = process.env.NEXT_PUBLIC_META_REDIRECT_URI!;

  // 1) short‑lived token
  const shortUrl =
    `https://graph.facebook.com/${META_VERSION}/oauth/access_token` +
    `?client_id=${encodeURIComponent(appId)}` +
    `&client_secret=${encodeURIComponent(appSecret)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&code=${encodeURIComponent(code)}`;

  const shortRes = await fetch(shortUrl);
  if (!shortRes.ok) {
    const body = await shortRes.text();
    return NextResponse.json(
      { error: "short_token_failed", body },
      { status: 500 },
    );
  }
  const shortData = (await shortRes.json()) as { access_token: string };
  const shortToken = shortData.access_token;

  // 2) long‑lived token
  const longUrl =
    `https://graph.facebook.com/${META_VERSION}/oauth/access_token` +
    `?grant_type=fb_exchange_token` +
    `&client_id=${encodeURIComponent(appId)}` +
    `&client_secret=${encodeURIComponent(appSecret)}` +
    `&fb_exchange_token=${encodeURIComponent(shortToken)}`;

  const longRes = await fetch(longUrl);
  if (!longRes.ok) {
    const body = await longRes.text();
    return NextResponse.json(
      { error: "long_token_failed", body },
      { status: 500 },
    );
  }
  const longData = (await longRes.json()) as {
    access_token: string;
    expires_in: number;
  };
  const longToken = longData.access_token;

  // 3) get Pages
  const pagesRes = await fetch(
    `https://graph.facebook.com/${META_VERSION}/me/accounts` +
      `?fields=id,name` +
      `&access_token=${encodeURIComponent(longToken)}`,
  );
  const pagesJson = (await pagesRes.json()) as {
    data: { id: string; name: string }[];
  };

  // In a real app you’d select the right Page by id/name (hard‑code or query param).
  const page = pagesJson.data?.[0];
  if (!page) {
    return NextResponse.json(
      { error: "No pages found", pagesJson },
      { status: 400 },
    );
  }

  // 4) get instagram_business_account
  const igRes = await fetch(
    `https://graph.facebook.com/${META_VERSION}/${page.id}` +
      `?fields=instagram_business_account` +
      `&access_token=${encodeURIComponent(longToken)}`,
  );
  const igJson = (await igRes.json()) as {
    instagram_business_account?: { id: string };
  };

  if (!igJson.instagram_business_account?.id) {
    return NextResponse.json(
      { error: "No IG business account on page", igJson },
      { status: 400 },
    );
  }

  const igUserId = igJson.instagram_business_account.id;

  // TEMP: show the values once in browser so you can copy them into env/DB
  return NextResponse.json({
    message: "Copy these into your env/DB then disable this output.",
    longLivedToken: longToken,
    igUserId,
    page,
  });
}
