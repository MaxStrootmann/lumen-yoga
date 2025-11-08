import CldImage from "./CldImage";
import FixedImage from "./FixedImage";
import Quote from "./Quote";

export default function Lotion() {
  return (
    <div>
      <div className="hidden lg:block">
        <Quote text="Wat een fijne les, mijn hoofd is helemaal leeg!" />
      </div>
      <div className="hidden lg:block">
        <FixedImage>
          <CldImage
            src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Handcreme_4k_x4zrdo.jpg"
            alt="Handcreme"
            width={1500}
            height={3000}
            sizes="100vw"
            className="object-cover lg:hidden"
            crop="fill"
            gravity="center"
          />
          <CldImage
            src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Handcreme_4k_x4zrdo.jpg"
            alt="Handcreme"
            width={1920}
            height={2664}
            sizes="100vw"
            className="hidden object-cover lg:block"
            crop={{
              width: 1920,
              height: 1500,
              type: "fill",
              gravity: "south",
            }}
          />
        </FixedImage>
      </div>
      <div className="hidden h-8 items-stretch lg:flex">
        <div className="flex-1 bg-yellow "></div>
        <div className="flex-1 bg-magenta "></div>
        <div className="flex-1 bg-purple "></div>
        <div className="flex-1 bg-blue "></div>
        <div className="flex-1 bg-green "></div>
      </div>
    </div>
  );
}
