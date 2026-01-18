// app/admin/instagram/page.tsx
"use client";

const scopes = [
  "instagram_basic",
  "pages_show_list",
  "pages_read_engagement",
  "business_management",
];

export default function InstagramConnectPage() {
  const authUrl = new URL("https://www.facebook.com/v19.0/dialog/oauth");
  authUrl.searchParams.set("client_id", process.env.NEXT_PUBLIC_META_APP_ID!);
  authUrl.searchParams.set(
    "redirect_uri",
    process.env.NEXT_PUBLIC_META_REDIRECT_URI!,
  );
  authUrl.searchParams.set("scope", scopes.join(","));
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("state", "csrf-token-or-random");

  return (
    <div className="z-90000 w-40 h-40">
      <h1 className="text-5xl">Connect Instagram</h1>
      <a href={authUrl.toString()}>Connect Ellen’s Instagram</a>
    </div>
  );
}
