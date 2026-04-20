import type { MediaLike } from "~/lib/media";

import CldImage from "./CldImage";
import FixedImage from "./FixedImage";

export default function Ellen({ image }: { image?: MediaLike }) {
  return (
    <div>
      <FixedImage>
        <CldImage
          src={image}
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
