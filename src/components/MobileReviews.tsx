import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function MobileReviews({
  items,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    color?: string;
  }[];
}) {
  return (
    <div className="">
      <Carousel
        opts={{
          loop: true,
        }}
        orientation="horizontal"
        className="max-w-small w-full"
      >
        <CarouselContent className="bg-blue p-8">
          {items.map((item, idx) => (
            <CarouselItem key={idx} className="bg-green p-8">
              <li
                className={`bg-${item.color} rounded-2xl px-4 py-8`}
                key={item.name}
              >
                <blockquote>
                  <div className="rounded-lg bg-white px-4 pb-4">
                    <div className="element-with-scrollbar max-h-48 py-5 [mask-image:linear-gradient(to_top,transparent,white_20%,white_80%,transparent)]">
                      <span className="">{item.quote}</span>
                    </div>
                    <div className="flex flex-row items-center pt-6">
                      <span className="flex flex-col">
                        <span className="font-bold">{item.name}</span>
                        <span className="text-sm font-bold">{item.title}</span>
                      </span>
                    </div>
                  </div>
                </blockquote>
              </li>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
