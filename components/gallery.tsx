"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Gallery() {
  return (
    <section>
      <HeaderGallery />
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000
          })
        ]}
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="-ml-1 mt-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="px-5 md:basis-1/2 lg:basis-1/3"
            >
              <Card>
                <Image
                  src={"/images/banner.png"}
                  alt="Hero"
                  layout="responsive"
                  width={1000}
                  height={100}
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

function HeaderGallery() {
  return (
    <div className="w-full flex justify-center relative">
      <div className=" border-2 border-black absolute w-full top-8"></div>
      <div className="z-10">
        <Button
          variant={"accent-1"}
          size={"xl"}
          className="bg-[#268467] text-4xl py-8 hover:bg-[#268467]/90"
        >
          Foto Lapangan
        </Button>
      </div>
    </div>
  );
}
