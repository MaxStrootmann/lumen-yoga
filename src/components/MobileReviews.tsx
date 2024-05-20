"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import MobileReviewCard from "./MobileReviewCard";
import { reviews } from "./Reviews";

export default function MobileReviews() {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div id="embla" className="overflow-hidden" ref={emblaRef}>
      <div id="embla-container" className="flex">
        {reviews.map((item, idx) => (
          <MobileReviewCard item={item} key={idx} />
        ))}
      </div>
    </div>
  );
}
