import CldImage from "./CldImage";
import FixedImage from "./FixedImage";
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
          className="object-cover md:hidden"
          crop="fill"
        />
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Masseren_4k_mbxhqj.jpg"
          alt="Masseren"
          width={3000}
          height={1500}
          sizes="100vw"
          className="hidden object-cover md:block"
          aspectRatio={16 / 9}
          crop="fill"
          gravity="center"
        />
      </FixedImage>
      <Quote />
      <FixedImage>
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Strekken_4k_b9wusn.jpg"
          alt="Strekken"
          width={1100}
          height={2270}
          sizes="100vw"
          className="object-cover md:hidden"
          crop="fill"
          gravity="center"
        />
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Strekken_4k_b9wusn.jpg"
          alt="Strekken"
          width={3840}
          height={2270}
          sizes="100vw"
          className="hidden object-cover md:block"
        />
      </FixedImage>
    </div>
  );
}