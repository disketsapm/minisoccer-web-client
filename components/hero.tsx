"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  const imagesLink = ["/images/banner.png", "/images/ronaldo.png"];
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
              <Card className="bg-hero-pattern bg-cover bg-center flex items-center justify-center rounded-3xl overflow-hidden">
                <Image
                  src={imagesLink[index]}
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
