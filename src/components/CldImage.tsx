import type { ImgHTMLAttributes } from "react";

import {
  getMediaAlt,
  getMediaDimensions,
  getMediaUrl,
  type MediaLike,
} from "~/lib/media";

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
  crop?: unknown;
  gravity?: string;
  preserveTransformations?: boolean;
};

function cloudinaryAutoFormat(url: string): string {
  if (!url.includes("res.cloudinary.com") || url.includes("/f_auto/")) {
    return url;
  }

  return url.replace("/upload/", "/upload/f_auto/q_auto/");
}

export default function CldImage({
  alt,
  className,
  crop: _crop,
  fill,
  gravity: _gravity,
  height,
  preserveTransformations: _preserveTransformations,
  priority: _priority,
  sizes,
  src,
  style,
  width,
  ...props
}: ContentImageProps) {
  const resolvedSrc = typeof src === "string" ? src : getMediaUrl(src);

  if (!resolvedSrc) return null;

  const fallbackWidth = Number(width ?? 1000);
  const fallbackHeight = Number(height ?? 1000);
  const dimensions = getMediaDimensions(src, fallbackWidth, fallbackHeight);
  const safeAlt = alt ?? "";

  return (
    <img
      alt={typeof src === "string" ? safeAlt : getMediaAlt(src, safeAlt)}
      className={className}
      height={fill ? undefined : dimensions.height}
      loading={_priority ? "eager" : "lazy"}
      sizes={sizes}
      src={cloudinaryAutoFormat(resolvedSrc)}
      style={
        fill
          ? { ...style, height: "100%", inset: 0, objectFit: "cover", width: "100%" }
          : style
      }
      width={fill ? undefined : dimensions.width}
      {...props}
    />
  );
}
