import Image from "next/image";
import { Button } from "./ui/button";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center mt-10 px-5 ">
      <div className="w-full">
        <div className="w-full h-[300px] md:h-[500px] relative">
          <Image
            src="/images/about-1.png"
            alt="About"
            fill
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
        <div className=" flex justify-center px-5 ">
          <div className="bg-[#18684F] z-10 -mt-24 md:-mt-40 border-4 border-black w-full md:w-[60vw] md:mx-auto  rounded-3xl flex justify-between py-7 px-2 md:px-8 gap-x-5 relative flex-col md:flex-row">
            <div className="absolute -top-20 right-0 md:-top-28">
              <div className="w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/images/hand.png"
                  alt="About"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>

            <div className="w-full h-52 md:w-1/2 flex justify-center relative">
              <Image
                src="/images/field.png"
                alt="About"
                fill
                objectFit="contain"
              />
            </div>
            <div className="flex  flex-col w-full text-center md:w-1/2 space-y-2 mb- text-4xl">
              <p className=" text-white font-light">Kenapa Harus </p>
              <p className="font-extrabold  tracking-wider">
                <span className=" text-white ">Bermain di</span>
                <span className="text-[#FCCB04]"> Soccer Chief?</span>
              </p>
              <p className="text-base text-white tracking-wide leading-loose ">
                Dengan lapangan Kami yang berkualitas, membuat permainan Mini Soccer-mu jadi semakin
                seru dan nyaman!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-8 z-10">
        <Button
          variant="accent-2"
          size="xl"
        >
          Lihat Lapangan
        </Button>
      </div>
    </div>
  );
}
