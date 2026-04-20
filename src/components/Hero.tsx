"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { IoLocation } from "react-icons/io5";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

import { env } from "~/env";

import CldImage from "./CldImage";
import { HeroButtons } from "./HeroButtons";
import type { MediaLike } from "~/lib/media";

export default function Hero({
  accentImage,
  description,
  image,
  locationLabel,
  locationUrl,
  primaryCTA,
  quote,
  secondaryCTA,
  title,
}: {
  accentImage?: MediaLike;
  description: string;
  image?: MediaLike;
  locationLabel: string;
  locationUrl: string;
  primaryCTA: { label: string; url: string };
  quote: string;
  secondaryCTA: { label: string; url: string };
  title: string;
}) {
  const featurableWidgetId = env.NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET;

  return (
    <div>
      <header className="flex-row-reverse pt-20 lg:flex lg:pt-24">
        <CldImage
          alt="Handen omhoog"
          src={image}
          width={3840}
          height={2355}
          sizes="100vw"
          className="object-cover lg:h-[35rem] lg:w-7/12 lg:rounded-l-xl"
        />
        <div className="flex-col justify-center px-4 pt-6 lg:flex">
          <h1 className="max-w-[20ch] pb-2 text-4xl font-bold lg:text-5xl">
            {title}
          </h1>
          <Link
            href={locationUrl}
            target="_blank"
            onClick={() => posthog.capture("location_link_clicked")}
            className="text-neutral-600 hover:text-neutral-500 flex items-center gap-2 pt-3"
          >
            <IoLocation className="text-lg" />
            <span className="text-sm font-semibold underline">
              {locationLabel}
            </span>
          </Link>
          <p className="max-w-[50ch] pt-4 lg:pt-6">{description}</p>

          <HeroButtons primaryCTA={primaryCTA} secondaryCTA={secondaryCTA} />

          <div className="mr-auto flex pt-6">
            <ReactGoogleReviews
              layout="badge"
              badgeLabel="Reviews op Google"
              badgeSubheadingFormatter={(totalReviewCount) =>
                `Lees onze ${totalReviewCount} reviews`
              }
              featurableId={featurableWidgetId}
            />
          </div>
        </div>
      </header>
      <div className="flex justify-between pb-4 pt-24">
        <div className="flex flex-col px-4 lg:p-20">
          <div className="flex-grow lg:hidden"></div>
          <p className="mt-auto max-w-[30ch] pb-2 pt-8 text-center text-xl font-bold lg:text-5xl">
            {quote}
          </p>
        </div>
        <div className="relative w-[50vw] lg:w-[33vw]">
          <Image
            width={239}
            height={342}
            alt="halve zon"
            className="absolute -top-20 right-0 w-full object-fill"
            src={typeof accentImage === "string" ? accentImage : accentImage?.url || "https://res.cloudinary.com/strootmann/image/upload/v1708871728/lumen-yoga/halve_zon_mfcoaz.svg"}
          />
        </div>
      </div>
    </div>
  );
}
