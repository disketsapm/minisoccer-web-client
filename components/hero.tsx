"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

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

  const fetchImage = async () => {
    const { data } = await axios.get(BANNER_API);

    const imageData = data.data.map((item: any) => ({
      desktop: item.image_desktop,
      mobile: item.image_mobile,
      ctaUrl: item.ctaUrl,
      id: item._id
    }));

    setImages(imageData);

    data.data.forEach((item: any) => incrementViewCount(item._id));
  };

  const incrementViewCount = async (imageId: string) => {
    await axios.put(VIEW_COUNT_API, { _id: imageId });
  };

  const incrementCtaCount = async (imageId: string, ctaUrl: string) => {
    await axios.put(CTA_COUNT_API, { _id: imageId });
    window.location.href = ctaUrl;
  };

  useEffect(() => {
    fetchImage();
  }, []);

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
              <div className="flex items-center justify-center">
                <Image
                  src={image.desktop}
                  alt="Hero"
                  width={1300}
                  height={300}
                  onClick={() => incrementCtaCount(image.id, image.ctaUrl)}
                  className="object-cover rounded-3xl bg-cover hidden md:block cursor-pointer"
                />
                <Image
                  src={image.mobile}
                  alt="Hero"
                  width={300}
                  onClick={() => incrementCtaCount(image.id, image.ctaUrl)}
                  height={800}
                  className="object-cover bg-cover md:hidden block w-full cursor-pointe"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Hero;
