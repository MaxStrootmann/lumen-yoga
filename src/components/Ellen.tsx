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
          loading="eager"
          sizes="(orientation: portrait) 73vh, 100vw"
        />
      </FixedImage>
    </div>
  );
}
