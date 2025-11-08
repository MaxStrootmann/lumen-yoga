import CldImage from "./CldImage";
import FixedImage from "./FixedImage";
import { OfferCarousel } from "./OfferCarousel";
import Quote from "./Quote";

export default function IntroImages() {
  return (
    <div>
      <FixedImage>
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Masseren_4k_mbxhqj.jpg"
          alt="Masseren"
          width={2600}
          height={5280}
          sizes="100vw"
          className="object-cover lg:hidden"
          crop="fill"
        />
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Masseren_4k_mbxhqj.jpg"
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
        <OfferCarousel />
      </div>
      <Quote text="Yoga! Het beste van de hele dag!" />
    </div>
  );
}
