"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "./ui/skeleton";

interface ImageData {
  desktop: string;
  mobile: string;
  ctaUrl: string;
  id: string;
}

const BANNER_API = `${process.env.NEXT_PUBLIC_PATH_API}/admin/bannerPeriods`;
const VIEW_COUNT_API = `${process.env.NEXT_PUBLIC_PATH_API}/admin/banner/viewCount`;
const CTA_COUNT_API = `${process.env.NEXT_PUBLIC_PATH_API}/admin/banner/ctaCount`

const Hero: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const fetchImage = useCallback(async () => {
    const { data } = await axios.get(BANNER_API);

    const imageData = data.data.map((item: any) => ({
      desktop: item.image_desktop,
      mobile: item.image_mobile,
      ctaUrl: item.ctaUrl,
      id: item._id,
    }));

    setImages(imageData);
    setIsLoading(false);

    imageData.forEach((item: ImageData) => incrementViewCount(item.id));
  }, []);

  const incrementViewCount = useCallback(async (imageId: string) => {
    await axios.put(VIEW_COUNT_API, { _id: imageId });
  }, []);

  const incrementCtaCount = useCallback(
    async (imageId: string, ctaUrl: string) => {
      await axios.put(CTA_COUNT_API, { _id: imageId });
      window.location.href = ctaUrl;
    },
    []
  );

  //api caraousel
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
    <section id="hero">
      {isLoading && (
        <div className="flex items-center justify-center max-h-[50vh] xl:max-h-[80vh] rounded-xl overflow-hidden">
          <Skeleton className="h-[900px] w-[1600px]" />
        </div>
      )}

      {!isLoading && images?.length === 0 && (
        <div className="flex items-center justify-center  max-h-[50vh] md:max-h-[65vh]">
          <Image
            src="/images/banner-placeholder.png"
            alt="Hero"
            layout="responsive"
            width={1600}
            height={900}
            priority
          />
        </div>
      )}

      {!isLoading && (
        <>
          <Carousel
            setApi={setApi}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <div className="flex flex-col relative">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex items-center justify-center max-h-[50vh] md:max-h-[65vh]">
                      <Image
                        src={isDesktop ? image.desktop : image.mobile}
                        alt="Hero"
                        layout="responsive"
                        width={1600}
                        height={900}
                        onClick={() =>
                          incrementCtaCount(image.id, image.ctaUrl)
                        }
                        onLoad={() => setIsLoading(false)}
                        priority
                        className="cursor-pointer"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="z-20 flex justify-center absolute gap-3 bottom-10 right-12">
                {Array.from({ length: count }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 w-4 rounded-full border border-black  ${current === i + 1
                      ? "bg-[#45825A] "
                      : "bg-white  cursor-pointer"
                      }`}
                    onClick={() => api?.scrollTo(i)}
                  />
                ))}
              </div>
            </div>
          </Carousel>
        </>
      )}
    </section>
  );
};

export default Hero;
