"use client";

import * as React from "react";
import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";
import posthog from "posthog-js";
import { IoTime } from "react-icons/io5";

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

type CardProps = {
  body: string;
  buttonLabel: string;
  buttonUrl: string;
  color: "yellow" | "magenta" | "purple" | "blue" | "green";
  time: string;
  title: string;
};

function formatBody(body: string) {
  return body.split(/\n\n+/).filter(Boolean);
}

export function OfferCarousel({
  cards,
  sectionTitle,
}: {
  cards: ReadonlyArray<CardProps>;
  sectionTitle: string;
}) {
  return (
    <div id="aanbod">
      <h2 className="m-auto w-max px-4 pt-20 text-4xl font-bold lg:pt-16">
        {sectionTitle}
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
                <Card className="relative overflow-visible rounded-3xl border-4 border-black">
                  <CardContent className="flex min-h-[400px] flex-col items-center justify-start px-4 py-6">
                    <div className="flex flex-1 flex-col items-center justify-start">
                      <h3 className="mb-6 whitespace-pre-line text-center text-2xl font-bold leading-tight">
                        {card.title}
                      </h3>
                      <div className="mb-4 flex items-center gap-2">
                        <IoTime
                          className="text-2xl"
                          style={{ color: "#F5A623" }}
                        />
                        <span className="text-sm font-semibold">
                          {card.time}
                        </span>
                      </div>
                      <div className="space-y-4 text-sm leading-relaxed">
                        {formatBody(card.body).map((paragraph, paragraphIndex) => (
                          <p
                            key={`${card.title}-${paragraphIndex}`}
                            className="whitespace-pre-line text-center font-medium"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="w-full">
                      <Link
                        onClick={() => {
                          sendGTMEvent("event", `aanbod_${card.title}`);
                          posthog.capture("offer_registration_clicked", {
                            offer_title: card.title,
                            button_text: card.buttonLabel,
                          });
                        }}
                        href={card.buttonUrl}
                        className="block"
                      >
                        <Button
                          bgColor={card.color}
                          className="w-full text-lg font-bold"
                        >
                          {card.buttonLabel}
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
