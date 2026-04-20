"use client";

import { ReactGoogleReviews } from "react-google-reviews";

import { env } from "~/env";

export default function Reviews({ heading }: { heading: string }) {
  const featurableWidgetId = env.NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET;

  return (
    <div id="recensies" className="px-4 py-16 lg:py-24">
      <h2 className="col-span-2 pb-8 text-center text-4xl font-bold">
        {heading}
      </h2>
      <ReactGoogleReviews
        layout="carousel"
        carouselSpeed={6000}
        featurableId={featurableWidgetId}
      />
    </div>
  );
}
