import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";

import { trackEvent } from "~/lib/tracking";

import { Button } from "./ui/button";

type InstagramPost = {
  id: string;
  permalink: string;
  imageUrl: string;
  caption: string;
};

const PROFILE_URL = "https://www.instagram.com/lumen.yoga/";

/**
 * Laatste Instagram-posts via /api/instagram (officiële Instagram API, server-side).
 * Zonder token of posts toont de sectie alleen de volgknop.
 */
export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    fetch("/api/instagram")
      .then((response) => (response.ok ? response.json() : { posts: [] }))
      .then((data: { posts?: InstagramPost[] }) => setPosts(data.posts ?? []))
      .catch(() => setPosts([]));
  }, []);

  return (
    <section id="instagram" className="px-4 py-16 lg:container lg:py-20">
      <div className="flex flex-col items-center gap-4 text-center">
        <FaInstagram size={40} />
        <h2 className="text-4xl font-bold">Volg Lumen Yoga op Instagram</h2>
        <p className="max-w-[50ch]">
          Foto&apos;s uit de lessen, nieuwe data en yogatips voor thuis: volg{" "}
          <strong>@lumen.yoga</strong> en blijf op de hoogte.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 pt-8 md:grid-cols-3 lg:grid-cols-6">
          {posts.slice(0, 6).map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("instagram_post_klik")}
              className="group relative block aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={post.imageUrl}
                alt={post.caption ? post.caption.slice(0, 120) : "Instagram-post van Lumen Yoga"}
                loading="lazy"
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      ) : null}

      <div className="flex justify-center pt-8">
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("instagram_volgen_klik")}
        >
          <Button bgColor="magenta" size="min" className="gap-2">
            <FaInstagram size={22} /> Volg @lumen.yoga
          </Button>
        </a>
      </div>
    </section>
  );
}
