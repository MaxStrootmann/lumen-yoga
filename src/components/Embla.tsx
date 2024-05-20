"use client";

import React from "react";
import type { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import { reviews } from "./Reviews";
import MobileReviewCard from "./MobileReviewCard";
import Link from "next/link";
import CldImage from "./CldImage";
import { Button } from "./ui/button";

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="embla overflow-hidden">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex w-screen pt-10">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="flex w-5/6 min-w-0 flex-shrink-0 flex-grow-0 justify-center px-2 pb-4 sm:basis-1/2 md:basis-1/3"
            >
              <MobileReviewCard item={item} />
            </div>
          ))}

          <div className="flex w-5/6 min-w-0 flex-shrink-0 flex-grow-0 justify-center px-2 pb-4 sm:basis-1/2 md:basis-1/3">
            <div
              key={"place-review"}
              className={`relative w-full flex-shrink-0 list-none rounded-2xl bg-blue px-3 py-6 `}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <div className="absolute bottom-8 left-4 right-4 top-8 flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-4">
                  <Link href="https://search.google.com/local/writereview?placeid=ChIJ1-V0QNVroS8RynGOdhmv1FU">
                    <CldImage
                      src="https://res.cloudinary.com/strootmann/image/upload/v1708871727/lumen-yoga/Lumen-Yoga_logo-vol_xg1uur.svg"
                      alt="Lumen yoga logo"
                      width={667}
                      height={430}
                      className="h-16 w-auto lg:h-24"
                    ></CldImage>
                  </Link>
                  <span className="w-[30ch] text-center font-bold">
                    Klik hier om ook een recensie te plaatsen via Google.
                  </span>
                  <Link
                    href={
                      "https://search.google.com/local/writereview?placeid=ChIJ1-V0QNVroS8RynGOdhmv1FU"
                    }
                  >
                    <Button className="w-max">Plaats recensie</Button>
                  </Link>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <div className="embla__dots mr-[calc((2rem - 1.4rem)) / 2 * -1) flex flex-wrap items-center justify-center">
        {scrollSnaps.map((index: number) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : "",
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default EmblaCarousel;
