import Image from 'next/image';
import { Button } from './ui/button';

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="w-full">
        <Image
          src="/images/about-1.png"
          alt="About"
          layout="responsive"
          width={900}
          height={400}
        />
        <div className=" flex justify-center ">
          <div className="bg-[#18684F] z-10 -mt-40 border-4 border-black w-[60vw] mx-auto  h-[300px] rounded-3xl flex justify-between py-7 px-8 gap-x-5 relative">
            <div className="absolute -top-32 right-0 hidden sm:block">
              <Image
                src="/images/hand.png"
                alt="About"
                width={180}
                height={180}
              />
            </div>

            <div className="w-1/2 flex justify-center">
              <Image
                src="/images/field.png"
                alt="About"
                width={400}
                height={300}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            <div className="flex flex-col w-1/2 space-y-2 my-7 text-4xl">
              <p className=" text-white font-light">Kenapa Harus </p>
              <p className="font-extrabold  tracking-wider">
                <span className=" text-white ">Bermain di</span>
                <span className="text-[#FCCB04]"> Soccer Chief?</span>
              </p>
              <p className="text-base text-white tracking-wide leading-loose ">
                Dengan lapangan Kami yang berkualitas, membuat permainan Mini Soccer-mu jadi semakin seru dan nyaman!
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
