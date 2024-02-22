import About from "@/components/about";
import Facility from "@/components/facility";
import Find from "@/components/find";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

export default function Page() {
  return (
    <>
      <div className="md:mx-auto w-full md:w-[80vw] ">
        <Hero />
        <About />
        <Facility />
        <Gallery />
        <Find />
      </div>
      <Button
        variant={"accent-1"}
        className=" fixed z-10 bottom-5 right-5"
      >
        <div className="flex justify-center items-center gap-2">
          <FaWhatsapp size={24} /> <span className="text-xs"> Hubungi WhatsApp Kami</span>
        </div>
      </Button>
    </>
  );
}
