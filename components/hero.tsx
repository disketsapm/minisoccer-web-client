"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "./ui/skeleton";

interface ImageData {
  desktop: string;
  mobile: string;
  ctaUrl: string;
  id: string;
}

const BANNER_API = "http://api-stg.soccerchief.co/admin/bannerPeriods";
const VIEW_COUNT_API = "http://api-stg.soccerchief.co/admin/banner/viewCount";
const CTA_COUNT_API = "http://api-stg.soccerchief.co/admin/banner/ctaCount";

const Hero: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const fetchImage = useCallback(async () => {
    const { data } = await axios.get(BANNER_API);

    const imageData = data.data.map((item: any) => ({
      desktop: item.image_desktop,
      mobile: item.image_mobile,
      ctaUrl: item.ctaUrl,
      id: item._id
    }));

    setImages(imageData);

    imageData.forEach((item: ImageData) => incrementViewCount(item.id));
  }, []);

  const incrementViewCount = useCallback(async (imageId: string) => {
    await axios.put(VIEW_COUNT_API, { _id: imageId });
  }, []);

  const incrementCtaCount = useCallback(async (imageId: string, ctaUrl: string) => {
    await axios.put(CTA_COUNT_API, { _id: imageId });
    window.location.href = ctaUrl;
  }, []);

  useEffect(() => {
    fetchImage();
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fetchImage]);

  return (
    <section>
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
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="flex items-center justify-center relative rounded-xl  overflow-hidden">
                <div className="cursor-pointer w-[100vw] h-[50vh] md:h-[100vh]">
                  {!image ? (
                    <Skeleton className="h-full w-full rounded-xl" />
                  ) : (
                    <Image
                      src={isDesktop ? image.desktop : image.mobile}
                      alt="Hero"
                      fill
                      objectFit="contain"
                      onClick={() => incrementCtaCount(image.id, image.ctaUrl)}
                    />
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Hero;
