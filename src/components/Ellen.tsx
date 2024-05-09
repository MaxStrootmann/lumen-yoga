import CldImage from "./CldImage";
import FixedImage from "./FixedImage";

export default function Ellen() {
  return (
    <div>
      <FixedImage>
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Ellen_binnen_5_4k_ze0iyt.jpg"
          alt="Ellen Wissink"
          width={1500}
          height={3000}
          sizes="100vw"
          className="object-cover"
          crop="fill"
          gravity="center"
        />
      </FixedImage>
    </div>
  );
}
