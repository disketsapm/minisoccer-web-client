import Image from 'next/image';
import { Button } from './ui/button';

export default function About() {
  return (
    <section
      id="about"
      className="px-4 md:px-0"
    >
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="w-full ">
          <div className="relative h-[300px] md:h-[600px] w-full overflow-hidden rounded-xl border-2 border-black">
            <Image
              src="/images/about-1.png"
              alt="About"
              fill
              objectFit="cover"
            />
          </div>

          <div className="flex justify-center ">
            <div className="bg-[#18684F] z-10 -mt-20 md:-mt-40 border-2 border-black w-[90%] md:w-[80%] md:mx-auto  rounded-3xl flex justify-between items-center py-7 px-2 md:px-8 gap-x-5 relative flex-col md:flex-row">
              <div className="absolute -right-10 -top-24 md:-top-28">
                <div className="size-36 md:size-48">
                  <Image
                    src="/images/hand.png"
                    alt="About"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>

              <div className="relative flex justify-center w-full h-auto md:w-1/2 ">
                <Image
                  src="/images/field.png"
                  alt="About"
                  width={1200}
                  height={600}
                />
              </div>
              <div className="flex flex-col w-full space-y-2 text-4xl text-center md:text-left md:w-1/2 mb-">
                <p className="font-light text-white ">Kenapa Harus </p>
                <p className="font-extrabold tracking-wider">
                  <span className="text-white ">Bermain di</span>
                  <span className="text-[#FCCB04]"> Soccer Chief?</span>
                </p>
                <p className="text-base leading-loose tracking-wide text-white ">
                  Dengan lapangan Kami yang berkualitas, membuat permainan Mini Soccer-mu jadi semakin seru dan nyaman!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="z-10 -mt-6 md:-mt-5">
          <Button
            variant="accent-2"
            size="lg"
          >
            Lihat Lapangan
          </Button>
        </div>
      </div>
    </section>
  );
}
