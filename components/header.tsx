'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { CiMenuBurger } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let shadowClass = '';
  if (scrolled) {
    shadowClass = 'shadow-xl';
  }
  const links = [
    { href: '/', label: 'Booking' },
    { href: '#about', label: 'Tentang kami' },
    { href: '#facility', label: 'Kerja Sama' },
    { href: '#find', label: 'Hubungi Kami' },
  ];
  return (
    <header className={` w-full sticky top-0 z-50 bg-white py-5 ${shadowClass} `}>
      <div className="flex justify-between items-center container px-2 md:px-0">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={100}
        />
        <div className="flex items-center justify-center gap-2 md:gap-x-10">
          <nav>
            <ul className="items-center hidden space-x-16 md:flex">
              {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <Link
                    href={href}
                    className="text-sm font-semibold hover:text-[#FC3433]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/auth">
            <Button
              variant={'accent-1'}
              className="px-6 py-2 text-xs md:px-10 md:py-6"
            >
              Masuk/Daftar
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="md:hidden "
              >
                <CiMenuBurger size={15} />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#FCCB04] max-w ">
              <nav className="mt-10 ">
                <ul className="flex flex-col items-start gap-y-16">
                  {links.map(({ href, label }) => (
                    <li key={`${href}${label}`}>
                      <Link
                        href={href}
                        className="text-2xl font-semibold  hover:text-[#FC3433]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
