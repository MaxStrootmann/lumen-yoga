"use client";

import CldImage from "./CldImage";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import Image from "next/image";
import { HeroButtons } from "./HeroButtons";
import Link from "next/link";
import { IoLocation } from "react-icons/io5";
import { env } from "~/env";

export default function Hero() {
  const featurableWidgetId = env.NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET;
  return (
    <div>
      <header className="flex-row-reverse pt-20 lg:flex lg:pt-24">
        <CldImage
          alt="Handen Omhoog"
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Handen_omhoog_4k_k12f9g.jpg"
          width={3840}
          height={2355}
          sizes="100vw"
          className="object-cover lg:h-[35rem] lg:w-7/12 lg:rounded-l-xl"
        ></CldImage>
        <div className="flex-col justify-center px-4 pt-6 lg:flex">
          <h1 className="max-w-[20ch] text-4xl pb-2 font-bold lg:text-5xl">
            Kinderyoga in Schagen
          </h1>
          <Link href="https://maps.google.com/?q=YPHS+Huis,+Zijperweg+9,+1742+NE+Schagen" target="_blank" className="flex items-center gap-2 pt-3 text-neutral-600 hover:text-neutral-500">
            <IoLocation className="text-lg" />
            <span className="underline text-sm font-semibold">YPHS Huis, Zijperweg 9, 1742 NE Schagen</span>
          </Link>
          <p className="max-w-[50ch] pt-4 lg:pt-6">
            Laat kinderen kennis maken met yoga, meditatie en mindfulness. Geef
            kinderen de tools waar ze de rest van hun leven profijt van hebben.
          </p>

          <HeroButtons />

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
            &quot;Eerst had ik stress en nu voel ik me helemaal rustig&quot;
          </p>
        </div>
        <div className="relative w-[50vw] lg:w-[33vw]">
          <Image
            width={239}
            height={342}
            alt="halve zon"
            className="absolute -top-20 right-0 w-full object-fill"
            src="https://res.cloudinary.com/strootmann/image/upload/v1708871728/lumen-yoga/halve_zon_mfcoaz.svg"
          />
        </div>
      </div>
    </div>
  );
}
