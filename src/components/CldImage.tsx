"use client";

import Image from "next/image";
import { CldImage as CloudinaryImage } from "next-cloudinary";
import type { CldImageProps } from "next-cloudinary";

import {
  getMediaAlt,
  getMediaDimensions,
  getMediaUrl,
  type MediaLike,
} from "~/lib/media";

type ContentImageProps = Omit<CldImageProps, "src"> & {
  src: CldImageProps["src"] | MediaLike;
};

const CldImage = ({
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
}: ContentImageProps) => {
  if (typeof src === "string") {
    return (
      <CloudinaryImage
        alt={alt}
        height={height}
        src={src}
        width={width}
        className={className}
        fill={fill}
        priority={priority}
        sizes={sizes}
        style={style}
        {...props}
      />
    );
  }

  const resolvedSrc = getMediaUrl(src);

  if (!resolvedSrc) {
    return null;
  }

  const fallbackWidth = Number(width ?? 1000);
  const fallbackHeight = Number(height ?? 1000);
  const dimensions = getMediaDimensions(src, fallbackWidth, fallbackHeight);

  return (
    <Image
      alt={getMediaAlt(src, alt)}
      className={className}
      fill={fill}
      height={fill ? undefined : dimensions.height}
      priority={priority}
      sizes={sizes}
      src={resolvedSrc}
      style={style}
      width={fill ? undefined : dimensions.width}
    />
  );
};

export default CldImage;
