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
          loading="eager"
          sizes="(min-width: 1024px) 100vw, (orientation: portrait) 120vh, 100vw"
        />
      </FixedImage>
    </div>
  );
}
