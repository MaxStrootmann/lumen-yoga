import { env } from "~/env";

import { GoogleReviewsCarousel } from "./GoogleReviewsWidget";

export default function Reviews({ heading }: { heading: string }) {
  return (
    <GoogleReviewsCarousel
      heading={heading}
      widgetId={env.NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET}
    />
  );
}
