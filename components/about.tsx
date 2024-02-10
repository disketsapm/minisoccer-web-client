import Image from "next/image";
import { Button } from "./ui/button";

export default function About() {
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="relative">
        <Image
          src="/images/about-1.png"
          alt="About"
          layout="responsive"
          width={900}
          height={400}
        />
        <div className="absolute inset-x-0 top-[350px]">
          <div className="flex justify-center relative">
            <div className="absolute -top-32 right-32 hidden sm:block">
              <Image
                src="/images/hand.png"
                alt="About"
                width={200}
                height={200}
              />
            </div>
            <div className="bg-[#18684F] border-4 border-black w-[80%] h-[300px]  rounded-3xl flex justify-between py-7 px-8">
              <div className="px-5">
                <Image
                  src="/images/field.png"
                  alt="About"
                  width={400}
                  height={300}
                />
              </div>
              <div className="flex flex-col flex-1 space-y-2 my-7 text-4xl">
                <p className=" text-white font-light">Kenapa Harus </p>
                <p className="font-extrabold  tracking-wider">
                  <span className=" text-white ">Bermain di</span>
                  <span className="text-[#FCCB04]"> Soccer Chief?</span>
                </p>
                <p className="text-base text-white tracking-wide leading-loose ">
                  Dengan lapangan Kami yang berkualitas, membuat permainan Mini Soccer-mu jadi
                  semakin seru dan nyaman!
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6">
              <Button
                variant="accent-2"
                size="xl"
              >
                Lihat Lapangan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
