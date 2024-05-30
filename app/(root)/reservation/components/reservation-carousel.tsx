import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

type IReservationCarousel = {
  data: { _id: string; url: string }[];
};

const ReservationCarousel: React.FC<IReservationCarousel> = ({ data }) => {
  const [isOpenLightbox, setIsOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const transformDataToLightboxData = data?.map((item) => ({
    src: item.url,
  }));

  return (
    <div className="w-full h-full">
      <Lightbox
        index={lightboxIndex}
        plugins={[Counter, Zoom]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        open={isOpenLightbox}
        close={() => setIsOpenLightbox(false)}
        slides={transformDataToLightboxData}
      />

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-full overflow-hidden "
      >
        <CarouselContent>
          {data?.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/4 basis-1/1">
              <div
                className="md:w-full w-[270px] h-full rounded-xl overflow-hidden cursor-pointer"
                onClick={() => {
                  setIsOpenLightbox(true);
                  setLightboxIndex(index);
                }}
              >
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
