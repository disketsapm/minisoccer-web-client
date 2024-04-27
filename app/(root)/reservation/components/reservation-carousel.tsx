import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

type IReservationCarousel = {
  data: { _id: string; url: string }[];
};

const ReservationCarousel: React.FC<IReservationCarousel> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-full overflow-hidden "
      >
        <CarouselContent>
          {data?.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/4 basis-1/1">
              <div className="md:w-full w-[270px] h-full rounded-xl overflow-hidden">
                <div className="w-full h-[380px]">
                  <img
                    src={item?.url}
                    alt="Facility"
                    className="w-full h-full object-cover "
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ReservationCarousel;
