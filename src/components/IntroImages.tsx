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
      {/* Op mobiel een korte, stilstaande uitsnede rond de handen op de rug,
          zodat je snel bij Ons aanbod bent (Ellen, 7 okt 2026). */}
      <div className="h-[42svh] w-full overflow-hidden bg-stone-200 lg:hidden">
        <CldImage
          src={image}
          alt="Masseren"
          sizes="100vw"
          className="h-full w-full object-cover object-[50%_66%]"
        />
      </div>
      <div className="hidden lg:block">
        <FixedImage>
          <CldImage
            src={image}
            alt="Masseren"
            loading="eager"
            sizes="100vw"
            className="lg:object-[50%_65%]"
          />
        </FixedImage>
      </div>
      <div className="px-2 pt-4">
        <OfferCarousel cards={offers} sectionTitle={sectionTitle} />
      </div>
      <Quote text={quote} />
    </div>
  );
}
