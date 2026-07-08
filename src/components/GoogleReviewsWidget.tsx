"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaGoogle, FaStar } from "react-icons/fa";

const FEATURABLE_API_BASE = "https://api.featurable.com/v1/widgets";
const DEFAULT_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ1-V0QNVroS8RynGOdhmv1FU";

type GoogleReview = {
  reviewId: string | null;
  reviewer: {
    profilePhotoUrl?: string;
    displayName: string;
  };
  starRating: number;
  comment: string;
  createTime: string | null;
};

type FeaturableWidget = {
  success: boolean;
  profileUrl?: string;
  totalReviewCount?: number;
  averageRating?: number;
  reviews?: GoogleReview[];
};

type ReviewsState = {
  data: FeaturableWidget | null;
  error: boolean;
  loading: boolean;
};

function useGoogleReviews(widgetId: string): ReviewsState {
  const [state, setState] = useState<ReviewsState>({
    data: null,
    error: false,
    loading: Boolean(widgetId),
  });

  useEffect(() => {
    if (!widgetId) {
      setState({ data: null, error: true, loading: false });
      return;
    }

    const controller = new AbortController();

    setState((current) => ({ ...current, error: false, loading: true }));

    fetch(`${FEATURABLE_API_BASE}/${widgetId}`, {
      method: "GET",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Featurable returned ${response.status}`);
        }
        return response.json() as Promise<FeaturableWidget>;
      })
      .then((data) => {
        if (!data.success) {
          throw new Error("Featurable returned an unsuccessful response");
        }
        setState({ data, error: false, loading: false });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setState({ data: null, error: true, loading: false });
      });

    return () => controller.abort();
  }, [widgetId]);

  return state;
}

function cleanComment(comment: string): string {
  return comment
    .split("\n\n(Translated by Google)")[0]
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(date: string | null): string | null {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("nl-NL", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex gap-0.5 text-yellow"
      aria-label={`${rating} van 5 sterren`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          aria-hidden="true"
          className={index < Math.round(rating) ? "opacity-100" : "opacity-30"}
        />
      ))}
    </span>
  );
}

export function GoogleReviewsBadge({
  className,
  label = "Reviews op Google",
  widgetId,
}: {
  className?: string;
  label?: string;
  widgetId: string;
}) {
  const { data, loading } = useGoogleReviews(widgetId);
  const profileUrl = data?.profileUrl ?? DEFAULT_REVIEW_URL;
  const totalReviewCount = data?.totalReviewCount;
  const averageRating = data?.averageRating;

  return (
    <Link
      href={profileUrl}
      target="_blank"
      rel="noreferrer"
      className={
        className ??
        "border-neutral-200 inline-flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      }
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
        <FaGoogle aria-hidden="true" className="text-xl text-blue" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-neutral-900 text-sm font-bold">{label}</span>
        {loading ? (
          <span className="text-neutral-600 text-xs">Recensies laden...</span>
        ) : averageRating && totalReviewCount ? (
          <span className="text-neutral-600 flex items-center gap-2 text-xs">
            <Stars rating={averageRating} />
            <span>
              {averageRating.toFixed(1)} uit {totalReviewCount} reviews
            </span>
          </span>
        ) : (
          <span className="text-neutral-600 text-xs">
            Bekijk onze recensies
          </span>
        )}
      </span>
    </Link>
  );
}

export function GoogleReviewsCarousel({
  heading,
  widgetId,
}: {
  heading: string;
  widgetId: string;
}) {
  const { data, error, loading } = useGoogleReviews(widgetId);
  const profileUrl = data?.profileUrl ?? DEFAULT_REVIEW_URL;
  const reviews = useMemo(
    () =>
      (data?.reviews ?? [])
        .map((review) => ({ ...review, comment: cleanComment(review.comment) }))
        .filter((review) => review.comment.length > 0)
        .slice(0, 8),
    [data?.reviews],
  );

  return (
    <section id="recensies" className="px-4 py-16 lg:py-24">
      <h2 className="pb-8 text-center text-4xl font-bold">{heading}</h2>

      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-yellow/30 p-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div>
            <p className="text-lg font-bold">Google-recensies van Lumen Yoga</p>
            {data?.averageRating && data.totalReviewCount ? (
              <p className="text-neutral-700 mt-2 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <Stars rating={data.averageRating} />
                <span>
                  {data.averageRating.toFixed(1)} van 5 op basis van{" "}
                  {data.totalReviewCount} recensies
                </span>
              </p>
            ) : (
              <p className="text-neutral-700 mt-2">
                Bekijk ervaringen van ouders, scholen en kinderen.
              </p>
            )}
          </div>
          <Link
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex justify-center rounded-full bg-green px-5 py-3 font-bold text-black transition hover:bg-green/80"
          >
            Bekijk of schrijf een recensie
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="bg-neutral-100 h-56 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        ) : error || reviews.length === 0 ? (
          <div className="border-neutral-200 rounded-3xl border bg-white p-8 text-center shadow-sm">
            <p className="font-semibold">
              De Google-recensies konden net niet worden geladen.
            </p>
            <p className="text-neutral-700 pt-2">
              Je kunt ze wel direct op Google bekijken.
            </p>
          </div>
        ) : (
          <div className="flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {reviews.map((review) => (
              <article
                key={
                  review.reviewId ??
                  `${review.reviewer.displayName}-${review.createTime}`
                }
                className="border-neutral-100 min-w-[82vw] snap-start rounded-3xl border bg-white p-6 shadow-sm md:min-w-[45vw] lg:min-w-0"
              >
                <div className="flex items-center gap-3">
                  {review.reviewer.profilePhotoUrl ? (
                    <img
                      src={review.reviewer.profilePhotoUrl}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green/20 font-bold">
                      {review.reviewer.displayName.charAt(0)}
                    </span>
                  )}
                  <div>
                    <h3 className="font-bold">{review.reviewer.displayName}</h3>
                    <p className="text-neutral-500 text-xs">
                      {formatDate(review.createTime)}
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <Stars rating={review.starRating} />
                </div>
                <p className="text-neutral-700 pt-4 text-sm leading-6">
                  “{review.comment}”
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
