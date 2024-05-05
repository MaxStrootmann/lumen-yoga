import CldImage from "./CldImage";
import FixedImage from "./FixedImage";

export default function Krijgers() {
  return (
    <div>
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
    </div>
  );
}
