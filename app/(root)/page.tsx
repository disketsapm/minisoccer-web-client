import About from '@/components/about';
import Facility from '@/components/facility';
import Find from '@/components/find';
import Footer from '@/components/footer';
import Gallery from '@/components/gallery';
import Header from '@/components/header';
import Hero from '@/components/hero';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <>
      <div className="mx-auto w-[80vw] ">
        <Header />
        <Hero />
        <About />
        <Facility />
        <Gallery />
        <Find />
      </div>
      <Footer />
      <Button
        variant={'accent-1'}
        size={'lg'}
        className=" fixed z-10 bottom-5 right-5"
      >
        <span> Whastapp</span>
      </Button>
    </>
  );
}
