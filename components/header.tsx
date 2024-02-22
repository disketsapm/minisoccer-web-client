'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { CiMenuBurger } from 'react-icons/ci';
import { useEffect, useState } from 'react';
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
    { href: '#', label: 'Kerja Sama' },
    { href: '#find', label: 'Hubungi Kami' },
  ];
  return (
    <header className={`flex justify-between items-center  md:px-[10vw] w-full sticky top-0 z-50 bg-white py-5 ${shadowClass} `}>
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
      />
      <div className="flex gap-2 justify-center items-center md:gap-x-10">
        <nav>
          <ul className=" space-x-16 items-center hidden md:flex">
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
            className="text-xs px-6 py-2 md:px-10 md:py-6"
          >
            Masuk/Daftar
          </Button>
        </Link>

        <Button
          className=" md:hidden"
          size={'sm'}
          variant={'outline'}
        >
          <CiMenuBurger size={15} />
        </Button>
      </div>
    </header>
  );
}
