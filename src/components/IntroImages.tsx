import type { MediaLike } from "~/lib/media";

import CldImage from "./CldImage";
import FixedImage from "./FixedImage";
import { OfferCarousel } from "./OfferCarousel";
import Quote from "./Quote";

export default function IntroImages({
  image,
  offers,
  quote,
  sectionTitle,
}: {
  image?: MediaLike;
  offers: ReadonlyArray<{
    body: string;
    buttonLabel: string;
    buttonUrl: string;
    color: "yellow" | "magenta" | "purple" | "blue" | "green";
    time: string;
    title: string;
  }>;
  quote: string;
  sectionTitle: string;
}) {
  return (
    <div>
      <FixedImage>
        <CldImage
          src={image}
          alt="Masseren"
          loading="eager"
          sizes="(min-width: 1024px) 100vw, (orientation: portrait) 73vh, 100vw"
          className="lg:object-bottom"
        />
      </FixedImage>
      <div className="px-2 pt-4">
        <OfferCarousel cards={offers} sectionTitle={sectionTitle} />
      </div>
      <Quote text={quote} />
    </div>
  );
}
