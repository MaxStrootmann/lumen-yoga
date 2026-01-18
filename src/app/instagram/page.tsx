// app/(site)/_components/InstagramFeed.tsx
import Link from "next/link";

type IgMedia = {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
};

async function fetchFeed(): Promise<IgMedia[]> {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://lumenyoga.nl"
      : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/instagram-feed`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function InstagramFeed() {
  const items = await fetchFeed();

  if (!items.length) return null;

  return (
    <section>
      <h2>Instagram</h2>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const imgSrc =
            item.media_type === "VIDEO" && item.thumbnail_url
              ? item.thumbnail_url
              : item.media_url;

          return (
            <Link key={item.id} href={item.permalink} target="_blank">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt={item.caption ?? "Instagram post"}
                className="aspect-square object-cover"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
