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
          width={2600}
          height={5280}
          sizes="100vw"
          className="object-cover lg:hidden"
          crop="fill"
        />
        <CldImage
          src={image}
          alt="Masseren"
          width={2800}
          height={5280}
          sizes="100vw"
          className="hidden object-cover lg:block"
          crop={{
            width: "2800",
            height: "2600",
            type: "fill",
            gravity: "south",
            source: true,
          }}
        />
      </FixedImage>
      <div className="px-2 pt-4">
        <OfferCarousel cards={offers} sectionTitle={sectionTitle} />
      </div>
      <Quote text={quote} />
    </div>
  );
}
