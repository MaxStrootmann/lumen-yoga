import Image from "next/image";
import type { MediaLike } from "~/lib/media";

import CldImage from "./CldImage";
import Quote from "./Quote";

export default function WhySection({
  logo,
  mobileQuote,
  sections,
  sideImage,
}: {
  logo?: MediaLike;
  mobileQuote: string;
  sections: ReadonlyArray<{
    heading: string;
    paragraphs: ReadonlyArray<{ text: string }>;
  }>;
  sideImage?: MediaLike;
}) {
  const logoUrl = typeof logo === "string" ? logo : logo?.url;

  return (
    <div className="custom-grid-why lg:pl-6">
      <div className="col-span-2 hidden w-1/2 pb-8 pl-4 pr-8 pt-16 lg:block">
        {logoUrl ? (
          <Image width={667} height={122} src={logoUrl} alt="Lumen Yoga" />
        ) : null}
      </div>
      <div className="flex items-stretch" id="kinderyoga">
        <div id="logo-and-text" className="mr-auto max-w-[70ch] pb-4">
          <div className="px-4 pb-4 pt-12 lg:hidden">
            {logoUrl ? (
              <Image
                width={667}
                height={122}
                src={logoUrl}
                alt="Lumen Yoga"
              />
            ) : null}
          </div>
          {sections.map((section, index) => (
            <div key={`${section.heading}-${index}`} className="pt-4">
              <h2 className="px-4 pt-4 text-4xl font-bold">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={`${section.heading}-${paragraphIndex}`}
                  className="px-4 pt-4"
                >
                  {paragraph.text}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex-1 bg-yellow px-4"></div>
          <div className="flex-1 bg-magenta px-4"></div>
          <div className="flex-1 bg-purple px-4"></div>
          <div className="flex-1 bg-blue px-4"></div>
          <div className="flex-1 bg-green px-4"></div>
        </div>
      </div>
      <div className="hidden lg:block">
        <CldImage
          src={sideImage}
          alt="Krijgers"
          width={2000}
          height={2793}
          sizes="100vw"
          className="h-full object-cover"
        />
      </div>
      <div className="lg:hidden">
        <Quote text={mobileQuote} />
      </div>
    </div>
  );
}
