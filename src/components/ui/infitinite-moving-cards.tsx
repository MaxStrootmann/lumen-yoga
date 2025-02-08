"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CldImage from "../CldImage";
import { Button } from "./button";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    color?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    }
    addAnimation();
  });
  const [start, setStart] = useState(false);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20  overflow-hidden", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex w-max min-w-full shrink-0 flex-nowrap gap-4 pt-8",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item) => (
          <li
            className={`bg-${item.color} relative w-[350px] max-w-full flex-shrink-0 flex-col justify-center rounded-2xl px-4 py-8 md:w-[450px]`}
            key={item.name}
          >
            <blockquote className="flex h-full max-h-80 flex-col rounded-lg bg-white px-3 pb-4 ">
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="flex h-full flex-col justify-center px-4 pb-4">
                <div className="element-with-scrollbar py-4 [mask-image:linear-gradient(to_top,transparent,white_15%,white_95%,transparent)]">
                  <span className="">{item.quote}</span>
                </div>
                <div className="relative z-20 mt-2 flex flex-row items-center">
                  <span className="flex flex-col">
                    <span className="font-bold">{item.name}</span>
                    <span className="text-sm font-bold">{item.title}</span>
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
        <li
          className={`relative w-[350px] max-w-full flex-shrink-0 rounded-2xl bg-blue px-8 pb-6 pt-4 md:w-[450px]`}
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
        </li>
      </ul>
    </div>
  );
};
