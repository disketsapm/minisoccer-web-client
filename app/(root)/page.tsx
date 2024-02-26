import About from '@/components/about';
import Facility from '@/components/facility';
import Find from '@/components/find';
import Gallery from '@/components/gallery';
import Hero from '@/components/hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function Page() {
  return (
    <>
      <Button
        variant={'accent-1'}
        className="fixed z-10 bottom-5 right-5"
      >
        <div className="flex items-center justify-center gap-2">
          <FaWhatsapp size={24} />{' '}
          <span className="text-xs">
            <Link
              href="https://wa.me/628112312356789"
              target="_blank"
            >
              Hubungi WhatsApp Kami
            </Link>
          </span>
        </div>
      </Button>
      <div className="container">
        <Hero />
        <About />
        <Facility />
        <Gallery />
        <Find />
      </div>
    </>
  );
}
