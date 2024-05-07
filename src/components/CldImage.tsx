"use client";

import { CldImage as CldImageDefault } from "next-cloudinary";
import type { CldImageProps } from "next-cloudinary";

const CldImage = (props: CldImageProps) => {
  return <CldImageDefault {...props} />;
};

export default CldImage;
