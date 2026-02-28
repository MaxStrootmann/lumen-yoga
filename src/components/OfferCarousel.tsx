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
import { IoTime } from "react-icons/io5";
import posthog from "posthog-js";

interface CardProps {
  color: "yellow" | "magenta" | "purple" | "blue" | "green";
  title: string;
  time: string;
  text: string;
  buttonText: string;
  href: string;
}

export function OfferCarousel() {
  const cards: CardProps[] = [
    {
      color: "yellow",
      title: "Ouder-kind yoga",
      time: "10.30 - 11.30 uur",
      text: "<p class='text-center font-bold text-base mb-4'>Op de laatste zaterdag van elke schoolvakantie</p><p class='text-left'><strong>Locatie:</strong> YPHS Huis / Zijperweg 9 / Schagen</p><p class='text-left mt-2'><strong>Actietarief:</strong> €20 per ouder-kind duo<br>Met z'n vieren? Betaal samen slechts €30!</p>",
      buttonText: "Aanmelden",
      href: "https://docs.google.com/forms/d/e/1FAIpQLScFbOtfK54SVAj_Vtzo3TMh23UTZWkz7sbYqfzp4EcbqeRLpg/viewform",
    },
    {
      color: "magenta",
      title: "Kinderyoga<br>4 t/m 7 jaar",
      time: "14.30 - 15.30 uur",
      text: "<p class='text-center font-bold text-base mb-4'>Elke woensdagmiddag</p><p class='text-left'><strong>Locatie:</strong> YPHS Huis / Zijperweg 9 / Schagen</p><p class='text-left mt-2'><strong>Tarief:</strong> vanaf €9,50 per les</p>",
      buttonText: "Aanmelden",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform",
    },
    {
      color: "purple",
      title: "Kinderyoga<br>8 t/m 12 jaar",
      time: "15.45 - 16.45 uur",
      text: "<p class='text-center font-bold text-base mb-4'>Elke woensdagmiddag</p><p class='text-left'><strong>Locatie:</strong> YPHS Huis / Zijperweg 9 / Schagen</p><p class='text-left mt-2'><strong>Tarief:</strong> vanaf €9,50 per les</p>",
      buttonText: "Aanmelden",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform",
    },
    {
      color: "blue",
      title: "Schoolverlichting",
      time: "op aanvraag",
      text: "<p class='text-center font-bold text-base'>Lesprogramma voor basisscholen</p>",
      buttonText: "Meer info",
      href: "#info",
    },
    {
      color: "green",
      title: "Kinderyoga workshop",
      time: "op aanvraag",
      text: "<p class='text-center font-bold text-base'>Spelenderwijs ontspannen</p>",
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
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="pb-4">
                <Card
                  className={`relative overflow-visible rounded-3xl border-4 border-black`}
                >
                  <CardContent className="flex min-h-[400px] flex-col items-center justify-start px-4 py-6">
                    <div className="flex flex-1 flex-col items-center justify-start">
                      <h3
                        className="mb-6 text-center text-2xl font-bold leading-tight"
                        dangerouslySetInnerHTML={{ __html: card.title }}
                      />
                      <div className="mb-4 flex items-center gap-2">
                        <IoTime
                          className="text-2xl"
                          style={{ color: "#F5A623" }}
                        />
                        <span className="text-sm font-semibold">
                          {card.time}
                        </span>
                      </div>
                      <div
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: card.text }}
                      />
                    </div>
                    <div className=" w-full">
                      <Link
                        onClick={() => {
                          sendGTMEvent("event", `aanbod_${card.title}`);
                          posthog.capture("offer_registration_clicked", {
                            offer_title: card.title,
                            button_text: card.buttonText,
                          });
                        }}
                        href={card.href}
                        className="block"
                      >
                        <Button
                          bgColor={card.color}
                          className="w-full text-lg font-bold"
                        >
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
