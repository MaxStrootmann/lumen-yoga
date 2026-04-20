import type { MediaLike } from "~/lib/media";

import CldImage from "./CldImage";
import FixedImage from "./FixedImage";

export default function Krijgers({ image }: { image?: MediaLike }) {
  return (
    <div>
      <FixedImage>
        <CldImage
          src={image}
          alt="Krijgers"
          width={1500}
          height={3000}
          sizes="100vw"
          className="object-cover lg:hidden"
          crop="fill"
          gravity="center"
        />
        <CldImage
          src={image}
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
