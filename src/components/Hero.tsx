"use client";

import CldImage from "./CldImage";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import Image from "next/image";
import { HeroButtons } from "./HeroButtons";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Hero() {
  const featurableWidgetId = "4a7ab06d-759a-49dd-bf79-f9eac6fc982d"; // You can use "example" for testing
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
          <h1 className="max-w-[20ch] text-4xl font-bold lg:text-5xl">
            Kinderyoga in Schagen
          </h1>
          <p className="max-w-[50ch] pt-4 lg:pt-6">
            Laat kinderen kennis maken met yoga, meditatie en mindfulness. Geef
            kinderen de tools waar ze de rest van hun leven profijt van hebben.
          </p>

          <HeroButtons />

          <div className="flex gap-2 pt-6">
            <Link href="https://www.instagram.com/lumen.yoga/">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-xl
                   bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]"
              >
                <FaInstagram className="text-white" size={24} />
              </span>
            </Link>
            <Link
              href={"https://www.facebook.com/profile.php?id=100091839270911"}
            >
              <FaFacebook size={32} className="text-[#1877F2]" />
            </Link>
          </div>

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
