import type { ImgHTMLAttributes } from "react";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  priority?: boolean;
};

export default function Image({
  alt,
  fill: _fill,
  height,
  priority: _priority,
  src,
  width,
  ...props
}: ImageProps) {
  if (!src) return null;

  return <img alt={alt ?? ""} height={height} src={src} width={width} {...props} />;
}
