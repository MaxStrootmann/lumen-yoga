"use client";

import { ReactGoogleReviews } from "react-google-reviews";
import { env } from "~/env";

export default function Reviews() {
  const featurableWidgetId = env.NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET;
  return (
    <div id="recensies" className="pt-16">
      <h2 className="col-span-2 pb-8 text-center text-4xl font-bold">
        Klanten aan het woord
      </h2>
      <ReactGoogleReviews
        layout="carousel"
        carouselSpeed={6000}
        featurableId={featurableWidgetId}
      />
    </div>
  );
}
