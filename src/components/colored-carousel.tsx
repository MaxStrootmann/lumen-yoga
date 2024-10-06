"'use client'"

import * as React from "react"

import { Card, CardContent } from "~/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { Button } from "./ui/button"
import Link from "next/link"

interface CardProps {
  color: 'yellow' | 'magenta' | 'purple' | 'blue' | 'green';
  title: string;
  text: string;
  buttonText: string;
  href: string;
}

export function ColoredCarousel() {
  const cards: CardProps[] = [
    { color: "yellow", title: "Kinderyoga workshop", text: "Spelenderwijs ontspannen", buttonText: "Meer info", href: "https://docs.google.com/forms/d/e/1FAIpQLScFbOtfK54SVAj_Vtzo3TMh23UTZWkz7sbYqfzp4EcbqeRLpg/viewform" },
    { color: "magenta", title: "Kinderyoga<br>4 t/m 7 jaar", text: "Beweeg, adem en speel!", buttonText: "Meer info", href: "https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform" },
    { color: "purple", title: "Kinderyoga<br>8 t/m 12 jaar", text: "Ontdek wie je echt bent!", buttonText: "Meer info", href: "https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform" },
    { color: "blue", title: "Schoolverlichting", text: "Lesprogramma voor basisscholen", buttonText: "Meer info", href: "#info" },
    { color: "green", title: "Ouder-kind workshop", text: "Samen groeien, ontspannen en ontdekken", buttonText: "Meer info", href: "https://docs.google.com/forms/d/e/1FAIpQLScFbOtfK54SVAj_Vtzo3TMh23UTZWkz7sbYqfzp4EcbqeRLpg/viewform" },
  ];


  return (
    <div id="aanbod">
      <h2 className="px-4 pt-20 m-auto w-max text-4xl font-bold lg:pt-16">
        Ons aanbod
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="m-auto md:w-[calc(100%-8rem)] xl:w-full py-8 px-12 sm:px-4 md:px-0 xl:px-8 xl:py-8"
      >
        <CarouselContent>
          {cards.map((card, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1?4 xl:basis-1/5">
              <div className="pb-4">
                <Card className={`border-black border-4 rounded-3xl`}>
                  <CardContent className="flex items-center justify-center px-4 py-8 h-80">
                    <div className="bg-white rounded-2xl p-4 w-full h-full flex flex-col justify-between items-center">
                      <h3 className="text-2xl font-bold mb-2 text-center" dangerouslySetInnerHTML={{ __html: card.title }} />
                      <p className="text-center font-semibold">{card.text}</p>
                      <Link href={card.href}><Button bgColor={card.color} className="p-4">
                        {card.buttonText}
                      </Button></Link>
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
      </Carousel></div>
  )
}
