import FixedImage from "~/components/FixedImage";
import CldImage from "~/components/CldImage";
import Hero from "~/components/Hero";
import Quote from "~/components/Quote";
import IntroImages from "~/components/IntroImages";
import WhySection from "~/components/WhySection";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <IntroImages />
      <WhySection />
      <FixedImage>
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1714821937/lumen-yoga/Krijgers_csawdv.jpg"
          alt="Krijgers"
          width={1500}
          height={3000}
          sizes="100vw"
          className="object-cover md:hidden"
          crop="fill"
          gravity="center"
        />
      </FixedImage>
      <FixedImage>
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1714821937/lumen-yoga/Krijgers_csawdv.jpg"
          alt="Krijgers"
          width={2000}
          height={1000}
          sizes="100vw"
          className="hidden object-cover md:block"
          crop="fill"
        />
      </FixedImage>
      <FixedImage>
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1714821937/lumen-yoga/Krijgers_csawdv.jpg"
          alt="Krijgers"
          width={2000}
          height={2793}
          sizes="100vw"
          className="hidden object-cover md:block"
          crop={{
            width: 500,
            height: 500,
            type: "thumb",
            source: true,
          }}
        />
      </FixedImage>
    </div>
  );
}
