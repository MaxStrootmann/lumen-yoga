import FixedImage from "~/components/FixedImage";
import CldImage from "~/components/CldImage";
import Hero from "~/components/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FixedImage>
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Masseren_4k_mbxhqj.jpg"
          alt="Masseren"
          width={3840}
          height={5280}
          sizes="100vw"
          className="object-cover"
        />
      </FixedImage>
    </div>
  );
}
