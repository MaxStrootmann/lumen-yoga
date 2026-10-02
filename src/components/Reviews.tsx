"use client";

import { useEffect, useState } from "react";
import {
  ReactGoogleReviews,
  type ReactGoogleReview as GoogleReview,
} from "react-google-reviews";

import { env } from "~/env";

type FeaturableResponse = {
  success: boolean;
  reviews?: GoogleReview[];
};

const relativeTime = new Intl.RelativeTimeFormat("nl", { numeric: "auto" });

function dutchRelativeDate(date: Date): string {
  const days = Math.round((date.getTime() - Date.now()) / 86_400_000);
  if (Math.abs(days) < 30) return relativeTime.format(days, "day");
  const months = Math.round(days / 30.44);
  if (Math.abs(months) < 12) return relativeTime.format(months, "month");
  return relativeTime.format(Math.round(days / 365.25), "year");
}

/** Google plakt soms een Engelse vertaling achter een Nederlandse review. */
function stripGoogleTranslation(comment: string): string {
  return comment.split(/\s*\(Translated by Google\)/)[0]?.trim() ?? comment;
}

function reviewTime(review: GoogleReview): number {
  return Date.parse(review.createTime ?? review.updateTime ?? "") || 0;
}

/**
 * Aantal kaarten naast elkaar, gelijk aan de breakpoints van de carousel.
 * De carousel in react-google-reviews leest de schermbreedte pas na een
 * resize; zonder dit start mobiel met drie smalle kaarten.
 */
function itemsForWidth(width: number): number {
  if (width <= 640) return 1;
  if (width <= 768) return 2;
  return 3;
}

function useCarouselItems(): number {
  const [items, setItems] = useState(() => itemsForWidth(window.innerWidth));

  useEffect(() => {
    const update = () => setItems(itemsForWidth(window.innerWidth));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return items;
}

export default function Reviews({ heading }: { heading: string }) {
  const featurableWidgetId = env.NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET;
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselItems = useCarouselItems();

  useEffect(() => {
    // Zelf ophalen zodat we de volgorde bepalen: nieuwste review eerst.
    fetch(`https://api.featurable.com/v1/widgets/${featurableWidgetId}`)
      .then((response) => response.json() as Promise<FeaturableResponse>)
      .then((data) => {
        if (data.success && data.reviews) {
          setReviews(
            [...data.reviews]
              .sort((a, b) => reviewTime(b) - reviewTime(a))
              .map((review) => ({
                ...review,
                comment: stripGoogleTranslation(review.comment ?? ""),
              })),
          );
        }
      })
      .catch(() => setReviews([]))
      .finally(() => setIsLoading(false));
  }, [featurableWidgetId]);

  return (
    <div id="recensies" className="px-4 py-16 lg:py-24">
      <h2 className="col-span-2 pb-8 text-center text-4xl font-bold">
        {heading}
      </h2>
      <ReactGoogleReviews
        layout="carousel"
        carouselSpeed={6000}
        maxItems={carouselItems}
        reviews={reviews}
        isLoading={isLoading}
        dateDisplay="relative"
        getRelativeDate={dutchRelativeDate}
        readMoreLabel="Lees meer"
        readLessLabel="Lees minder"
        errorMessage="De reviews konden niet worden geladen."
        loadingMessage="Reviews laden..."
      />
    </div>
  );
}
