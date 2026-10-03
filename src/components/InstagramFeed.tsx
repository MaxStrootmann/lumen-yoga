import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaInstagram } from "react-icons/fa";
import { IoChevronBack, IoChevronForward, IoCopy, IoPlay } from "react-icons/io5";

import { trackEvent } from "~/lib/tracking";

import { Button } from "./ui/button";

type InstagramPost = {
  id: string;
  permalink: string;
  imageUrl: string;
  caption: string;
  mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp?: string;
};

const PROFILE_URL = "https://www.instagram.com/lumen.yoga/";
const AUTOPLAY_MS = 4500;

/** Kaarten lopen door de vijf merkkleuren, net als de streep onder de krijgers. */
const SHADOW_COLORS = ["#EFAD5B", "#B361A4", "#7663A8", "#80A5D7", "#AED9B3"];

const relativeTime = new Intl.RelativeTimeFormat("nl", { numeric: "auto" });

function postAge(timestamp?: string): string {
  const time = timestamp ? Date.parse(timestamp) : Number.NaN;
  if (Number.isNaN(time)) return "";
  const days = Math.round((time - Date.now()) / 86_400_000);
  if (Math.abs(days) < 7) return relativeTime.format(days, "day");
  if (Math.abs(days) < 35) return relativeTime.format(Math.round(days / 7), "week");
  return relativeTime.format(Math.round(days / 30.44), "month");
}

/** Eerste alinea van het onderschrift, zonder hashtags. */
function captionTeaser(caption: string): string {
  const first = caption.split(/\n\s*\n/)[0] ?? "";
  return first.replace(/#[\p{L}\p{N}_]+/gu, "").replace(/\s+/g, " ").trim();
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Nieuwste Instagram-posts via /api/instagram. Met token komen ze live uit de
 * officiële Instagram API; zonder token toont de server een momentopname.
 */
export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/api/instagram")
      .then((response) => (response.ok ? response.json() : { posts: [] }))
      .then((data: { posts?: InstagramPost[] }) => setPosts(data.posts ?? []))
      .catch(() => setPosts([]));
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    // Wie zelf sleept of klikt, neemt het over: daarna niet meer vanzelf door.
    emblaApi.on("pointerDown", () => setPaused(true));
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  // Alleen doorlopen als de sectie in beeld is.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.4 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!emblaApi || paused || !inView || posts.length < 2 || prefersReducedMotion()) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [emblaApi, paused, inView, posts.length]);

  const scrollPrev = useCallback(() => {
    setPaused(true);
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    setPaused(true);
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="flex flex-col items-center gap-6 px-4 text-center lg:container lg:flex-row lg:items-end lg:justify-between lg:text-left">
        <div className="flex max-w-[34rem] flex-col items-center gap-3 lg:items-start">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("instagram_volgen_klik")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-1 text-sm font-semibold"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white">
              <FaInstagram size={14} />
            </span>
            @lumen.yoga
          </a>
          <h2 className="text-4xl font-bold">Kijk mee in de les</h2>
          <p>
            Foto&apos;s en filmpjes uit de lessen, nieuwe data en yogatips voor
            thuis. Volg Lumen Yoga op Instagram en mis niets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {posts.length > 1 ? (
            <div className="hidden gap-2 lg:flex">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Vorige post"
                className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-black bg-white transition hover:bg-yellow"
              >
                <IoChevronBack size={22} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Volgende post"
                className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-black bg-white transition hover:bg-yellow"
              >
                <IoChevronForward size={22} />
              </button>
            </div>
          ) : null}
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("instagram_volgen_klik")}
          >
            <Button bgColor="yellow" size="min" className="gap-2">
              <FaInstagram size={22} /> Volg @lumen.yoga
            </Button>
          </a>
        </div>
      </div>

      {posts.length > 0 ? (
        <div
          className="pt-10 lg:container"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
        >
          <div ref={emblaRef} className="overflow-visible px-4 lg:overflow-hidden lg:px-0">
            <div className="-ml-5 flex touch-pan-y">
              {posts.map((post, index) => {
                const teaser = captionTeaser(post.caption);
                const age = postAge(post.timestamp);
                return (
                  <div
                    key={post.id}
                    className="min-w-0 shrink-0 grow-0 basis-[78%] pb-3 pl-5 pr-2 sm:basis-[45%] md:basis-[34%] lg:basis-1/4"
                  >
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("instagram_post_klik")}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border-2 border-black bg-white transition duration-300 hover:-translate-x-1 hover:-translate-y-1"
                      style={{
                        boxShadow: `6px 6px 0 ${SHADOW_COLORS[index % SHADOW_COLORS.length]}`,
                      }}
                    >
                      <img
                        src={post.imageUrl}
                        alt={teaser ? teaser.slice(0, 140) : "Instagram-post van Lumen Yoga"}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      {post.mediaType && post.mediaType !== "IMAGE" ? (
                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
                          {post.mediaType === "VIDEO" ? <IoPlay size={16} /> : <IoCopy size={16} />}
                        </span>
                      ) : null}
                      {teaser ? (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 pb-4 pt-12 text-white">
                          <p className="line-clamp-2 text-sm font-semibold leading-snug">
                            {teaser}
                          </p>
                          {age ? <p className="pt-1 text-xs text-white/75">{age}</p> : null}
                        </div>
                      ) : null}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {snapCount > 1 ? (
            <div className="flex justify-center gap-2 pt-8">
              {Array.from({ length: snapCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setPaused(true);
                    emblaApi?.scrollTo(index);
                  }}
                  aria-label={`Ga naar post ${index + 1}`}
                  aria-current={index === selectedIndex}
                  className="h-2.5 rounded-full border-2 border-black transition-all duration-300"
                  style={{
                    width: index === selectedIndex ? 28 : 10,
                    backgroundColor:
                      index === selectedIndex
                        ? SHADOW_COLORS[index % SHADOW_COLORS.length]
                        : "transparent",
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
