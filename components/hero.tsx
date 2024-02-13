"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  const imagesLink = ["/images/banner.png", "/images/banner-2.jpg", "/images/banner-3.jpg"];
  return (
    <section className="">
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
      >
        <CarouselContent>
          {imagesLink.map((_, index) => (
            <CarouselItem key={index}>
              <div className=" flex items-center justify-center ">
                <Image
                  src={imagesLink[index]}
                  alt="Hero"
                  width={1300}
                  height={300}
                  className="object-cover rounded-3xl bg-cover "
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
