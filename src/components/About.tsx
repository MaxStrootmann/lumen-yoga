"use client";

import type { MediaLike } from "~/lib/media";

import CldImage from "./CldImage";

export default function About({
  heading,
  image,
  instagramLabel,
  instagramUrl,
  paragraphs,
}: {
  heading: string;
  image?: MediaLike;
  instagramLabel: string;
  instagramUrl: string;
  paragraphs: ReadonlyArray<{ text: string }>;
}) {
  return (
    <div>
      <div id="over-mij" className="custom-grid-about lg:py-20">
        <div id="ellen-image" className="hidden lg:block">
          <CldImage
            src={image}
            alt="Ellen Wissink"
            width={1920}
            height={2664}
            sizes="100vw"
            className="h-full object-cover"
          />
        </div>

        <div
          id="balk+text"
          className="col-span-1 col-start-2 flex flex-col items-stretch"
        >
          <div className="flex flex-col">
            <div className="flex-1 bg-yellow "></div>
            <div className="flex-1 bg-magenta "></div>
            <div className="flex-1 bg-purple "></div>
            <div className="flex-1 bg-blue "></div>
            <div className="flex-1 bg-green "></div>
          </div>

          <div id="logo-and-text" className="max-w-[70ch] pb-8 lg:pl-12">
            <div className="px-4 pt-4 lg:px-0 lg:pr-4">
              <h2 className="pt-4 text-4xl font-bold">{heading}</h2>
              {paragraphs.map((paragraph, index) => (
                <p key={`${paragraph.text.slice(0, 20)}-${index}`} className="pt-4">
                  {paragraph.text}
                </p>
              ))}
            </div>
          </div>

          <div className="pb-8 pl-4 pt-6 lg:pl-12">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="italic underline opacity-60"
            >
              {instagramLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
