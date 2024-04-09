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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <div className="flex flex-col mb-10">
        <CarouselContent>
          {data?.map((item, index) => (
            <CarouselItem key={index}>
              <div className="flex items-center justify-center w-full h-full border-4 border-black rounded-xl overflow-hidden ">
                <Image
                  src={item?.url}
                  alt="reservation-galery"
                  width={1600}
                  height={900}
                  priority
                  className="cursor-pointer"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="z-20 flex justify-end space-x-5 -mt-10 pr-5">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`h-4 w-4 rounded-full ${
                current === i + 1
                  ? "bg-black"
                  : "bg-white border-2 border-black cursor-pointer"
              }`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </Carousel>
  );
};

export default ReservationCarousel;
