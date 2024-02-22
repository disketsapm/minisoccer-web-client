"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Gallery() {
  const listImage = [
    {
      image: "/images/gallery/court-1.png"
    },
    {
      image: "/images/gallery/court-2.png"
    },
    {
      image: "/images/gallery/court-3.png"
    },
    {
      image: "/images/gallery/court-4.png"
    }
  ];
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
          align: "center",
          loop: true
        }}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="-ml-1 mt-10">
          {listImage.map((item, index) => (
            <CarouselItem
              key={index}
              className="px-5 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="border-4 border-black rounded-xl overflow-hidden">
                <Image
                  src={item.image}
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
        <div className="bg-[#268467] text-4xl py-2 text-white px-5 rounded-lg border-2 border-black ">
          Foto Lapangan
        </div>
      </div>
    </div>
  );
}
