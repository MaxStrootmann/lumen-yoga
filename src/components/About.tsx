"use client";

import type { MediaLike } from "~/lib/media";
import { trackEvent } from "~/lib/tracking";

import CldImage from "./CldImage";
import ReadMore from "./ReadMore";

export default function About({
  certification,
  heading,
  image,
  instagramLabel,
  instagramUrl,
  paragraphs,
}: {
  certification?: {
    title: string;
    issuer: string;
    url: string;
    seal?: { url: string; alt: string };
  };
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
            sizes="50vw"
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
              <ReadMore id="over-mij">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${paragraph.text.slice(0, 20)}-${index}`} className="pt-4">
                    {paragraph.text}
                  </p>
                ))}
              </ReadMore>
              {certification ? (
                <a
                  href={certification.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("certificaat_klik")}
                  className="group mt-6 inline-flex items-center gap-4"
                >
                  {certification.seal ? (
                    <img
                      src={certification.seal.url}
                      alt={certification.seal.alt}
                      width={112}
                      height={112}
                      loading="lazy"
                      decoding="async"
                      className="h-24 w-24 shrink-0 transition-transform group-hover:scale-105 lg:h-28 lg:w-28"
                    />
                  ) : null}
                  <span className="flex flex-col leading-tight">
                    <span className="font-bold">{certification.title}</span>
                    <span className="pt-1 text-sm group-hover:underline">
                      {certification.issuer}
                    </span>
                  </span>
                </a>
              ) : null}
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
