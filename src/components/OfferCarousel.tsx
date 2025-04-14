"use client";

import * as React from "react";

import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Button } from "./ui/button";
import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";

interface CardProps {
  color: "yellow" | "magenta" | "purple" | "blue" | "green";
  title: string;
  text: string;
  buttonText: string;
  href: string;
}

export function OfferCarousel() {
  const cards: CardProps[] = [
    {
      color: "yellow",
      title: "Ouder-kind workshop",
      text: "Samen groeien, ontspannen en ontdekken",
      buttonText: "Meer info",
      href: "https://docs.google.com/forms/d/e/1FAIpQLScFbOtfK54SVAj_Vtzo3TMh23UTZWkz7sbYqfzp4EcbqeRLpg/viewform",
    },
    {
      color: "magenta",
      title: "Kinderyoga<br>4 t/m 7 jaar",
      text: "Beweeg, adem en speel!",
      buttonText: "Meer info",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform",
    },
    {
      color: "purple",
      title: "Kinderyoga<br>8 t/m 12 jaar",
      text: "Ontdek wie je echt bent!",
      buttonText: "Meer info",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform",
    },
    {
      color: "blue",
      title: "Schoolverlichting",
      text: "Lesprogramma voor basisscholen",
      buttonText: "Meer info",
      href: "#info",
    },
    {
      color: "green",
      title: "Kinderyoga workshop",
      text: "Spelenderwijs ontspannen",
      buttonText: "Meer info",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSe1UIald50arX6u9Qeov0bc-gCncpNA2QTjGnDK0y_XIL8kOw/viewform?usp=dialog",
    },
  ];

  return (
    <div id="aanbod">
      <h2 className="m-auto w-max px-4 pt-20 text-4xl font-bold lg:pt-16">
        Ons aanbod
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="m-auto px-12 py-8 sm:px-4 md:w-[calc(100%-8rem)] md:px-0 xl:w-full xl:px-8 xl:py-8"
      >
        <CarouselContent>
          {cards.map((card, index) => (
            <CarouselItem
              key={index}
              className="lg:basis-1?4 basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/5"
            >
              <div className="pb-4">
                <Card className={`rounded-3xl border-4 border-black`}>
                  <CardContent className="flex h-80 items-center justify-center px-4 py-8">
                    <div className="flex h-full w-full flex-col items-center justify-between rounded-2xl bg-white p-4">
                      <h3
                        className="mb-2 text-center text-2xl font-bold"
                        dangerouslySetInnerHTML={{ __html: card.title }}
                      />
                      <p className="text-center font-semibold">{card.text}</p>
                      <Link
                        onClick={() =>
                          sendGTMEvent("event", `aanbod_${card.title}`)
                        }
                        href={card.href}
                      >
                        <Button bgColor={card.color} className="p-4">
                          {card.buttonText}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="md:hidden">
          <CarouselDots />
        </div>
      </Carousel>
    </div>
  );
}
