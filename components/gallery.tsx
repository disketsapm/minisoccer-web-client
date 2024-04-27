"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Gallery() {
  const listImage = [
    {
      image: "/images/gallery/court-1.png",
    },
    {
      image: "/images/gallery/court-2.png",
    },
    {
      image: "/images/gallery/court-3.png",
    },
    {
      image: "/images/gallery/court-4.png",
    },
  ];
  return (
    <section className="radial-gradient md:h-[650px] h-full w-full  flex items-center flex-col justify-center md:p-0 p-6 gap-4">
      <HeaderGallery />

      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full overflow-hidden hidden md:block"
      >
        <CarouselContent className="mt-10 -ml-1">
          {listImage.map((item, index) => (
            <CarouselItem
              key={index}
              className="px-5 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="overflow-hidden w-full h-[250px] relative   p-4 bg-white/20  rounded-xl">
                <Image src={item.image} alt="Hero" fill />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-full h-full flex flex-col gap-4 md:hidden ">
        {listImage?.map((item, index) => {
          return (
            <div key={index} className="px-5 md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden p-4 bg-white/20  rounded-xl">
                <Image
                  src={item.image}
                  alt="Hero"
                  layout="responsive"
                  width={1000}
                  height={100}
                  priority
                />
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HeaderGallery() {
  return (
    <div className="relative flex justify-center w-fit container flex-col md:gap-2 gap-5 ">
      <div className="z-10 bg-gradient-to-b border-[#00000033]  from-[#FFFFFF] to-[#FFFFFF00]  rounded-lg flex px-5 border-1 py-4 gap-3  ">
        <div className="text-4xl text-center md:text-left   font-black text-[#070707]   ">
          Foto Lapangan
        </div>
        <div className="text-sm font-semibold hidden md:block">
          Lihat lebih detail lapangan, serta <br /> fasilitas yang ada di Soccer
          Chief!
        </div>
      </div>
      <div className="text-sm font-semibold md:hidden block text-center">
        Lihat lebih detail lapangan, serta <br /> fasilitas yang ada di Soccer
        Chief!
      </div>
    </div>
  );
}
