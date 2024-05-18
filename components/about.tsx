import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function About() {
  return (
    <div
      className="w-full h-full relative"
      style={{
        backgroundImage: `url(/images/banner-5.png)`,
        backgroundSize: "cover",
        backgroundPosition: "0 50%",
      }}
    >
      <section id="about" className="px-4 md:px-0 container text-white">
        <div className="w-full md:h-[1200px] h-[650px]  flex flex-col  gap-12 md:justify-center justify-end pb-10  md:pb-48">
          <div className="w-full flex gap-2 justify-end">
            <div className="w-[850px] h-full hidden md:block" />

            <div className="flex flex-col  gap-6 md:text-black text-white items-center md:items-start z-10 ">
              <div className="w-full font-black md:text-6xl text-3xl text-center md:text-left ">
                Kenapa Anda Harus <br /> Bermain di Soccer Chief?
              </div>

              <p className="text-center md:text-left">
                Soccer Chief menyediakan lapangan yang berkualitas tinggi dan{" "}
                <br />
                berstandar nasional. Tersedia juga beragam fasilitas pendukung
                yang <br className="hidden md:block" /> membuat permainan Mini
                Soccer-mu menjadi lebih menyenangkan.
              </p>
              <Link href="#galery">
                <Button className="w-fit px-6 py-2" variant={"accent-1"}>
                  Lihat Lapangan
                </Button>
              </Link>

              <div className="bg-gradient-to-b from-[#0B0B0B00] to-[#000000] w-full h-[450px] absolute bottom-0 m-auto -z-10 md:hidden block " />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
