import CldImage from "./CldImage";
import FixedImage from "./FixedImage";

export default function Krijgers() {
  return (
    <div>
      <FixedImage>
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1715243821/lumen-yoga/Krijgers-cropped_pgidcb.jpg"
          alt="Krijgers"
          width={1500}
          height={3000}
          sizes="100vw"
          className="object-cover lg:hidden"
          crop="fill"
          gravity="center"
        />
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1715243821/lumen-yoga/Krijgers-cropped_pgidcb.jpg"
          alt="Krijgers"
          width={2000}
          height={1000}
          sizes="100vw"
          className="hidden object-cover lg:block"
          crop="fill"
        />
      </FixedImage>
    </div>
  );
}
