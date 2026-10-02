import type { ImgHTMLAttributes } from "react";

import {
  getMediaAlt,
  getMediaDimensions,
  getMediaUrl,
  type MediaLike,
} from "~/lib/media";
import { RESPONSIVE_IMAGES } from "~/lib/responsive-images";

type ContentImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> & {
  src?: string | MediaLike;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

function srcSet(base: string, widths: number[], extension: string): string {
  return widths.map((w) => `${base}-${w}.${extension} ${w}w`).join(", ");
}

/**
 * Foto's staan als AVIF- en WebP-varianten op de site zelf (zie
 * scripts/optimize-images.mjs); de browser kiest de kleinste die past.
 * Overige bronnen, zoals de SVG-logo's, gaan als gewone <img> door.
 */
export default function CldImage({
  alt,
  className,
  fill,
  height,
  priority,
  sizes,
  src,
  style,
  width,
  ...props
}: ContentImageProps) {
  const resolvedSrc = typeof src === "string" ? src : getMediaUrl(src);

  if (!resolvedSrc) return null;

  const responsive = RESPONSIVE_IMAGES[resolvedSrc];
  const fallbackWidth = Number(width ?? responsive?.width ?? 1000);
  const fallbackHeight = Number(height ?? responsive?.height ?? 1000);
  const dimensions = responsive ?? getMediaDimensions(src, fallbackWidth, fallbackHeight);
  const safeAlt = alt ?? "";

  const img = (
    <img
      alt={typeof src === "string" ? safeAlt : getMediaAlt(src, safeAlt)}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      height={fill ? undefined : dimensions.height}
      loading={priority ? "eager" : "lazy"}
      sizes={responsive ? (sizes ?? "100vw") : sizes}
      src={
        responsive
          ? `${resolvedSrc}-${responsive.widths.find((w) => w >= 1280) ?? responsive.widths.at(-1)}.webp`
          : resolvedSrc
      }
      style={
        fill
          ? { ...style, height: "100%", inset: 0, objectFit: "cover", width: "100%" }
          : style
      }
      width={fill ? undefined : dimensions.width}
      {...props}
    />
  );

  if (!responsive) return img;

  return (
    <picture style={{ display: "contents" }}>
      <source
        sizes={sizes ?? "100vw"}
        srcSet={srcSet(resolvedSrc, responsive.widths, "avif")}
        type="image/avif"
      />
      <source
        sizes={sizes ?? "100vw"}
        srcSet={srcSet(resolvedSrc, responsive.widths, "webp")}
        type="image/webp"
      />
      {img}
    </picture>
  );
}
