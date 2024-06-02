"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/hooks/auth/useLogout";
import Loading from "@/app/loading";
import {
  getFirstLetterAndLastName,
  getItemFromLocalStorage,
} from "@/lib/utils";
import { SignInResponse, UserType } from "@/interfaces/auth.interface";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dataUser = getItemFromLocalStorage<UserType>("user");

  let shadowClass = "";
  if (scrolled) {
    shadowClass = "shadow-xl";
  }
  const links = [
    { href: "/reservation", label: "Booking" },
    { href: "/#about", label: "Kenapa Kami" },
    { href: "/#facility", label: "Fasilitas" },
    { href: "/#find", label: "Hubungi Kami" },
  ];
  return (
    <header
      className={` w-full sticky top-0 z-50 bg-gradient-to-r from-white to-[#999999] py-5 ${shadowClass} `}
    >
      <div className="flex justify-between items-center md:container px-4 md:px-[5rem] ">
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className="flex items-center justify-center gap-2 md:gap-x-10">
          <nav>
            <ul className="items-center hidden space-x-16 md:flex list-none">
              {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <Link href={href} className="text-sm font-semibold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {dataUser?.email ? (
            <Link href="/auth/me">
              <Avatar>
                <AvatarImage
                  src={
                    dataUser?.photo ??
                    `https://drive.google.com/file/d/1em-PVgw9RWYunZvZHdNrBUnRLu6Hl3lY/view?usp=sharing`
                  }
                />
                <AvatarFallback className="font-semibold">
                  {dataUser?.fullName
                    ? getFirstLetterAndLastName(dataUser?.fullName)
                    : ""}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Button
              variant={"accent-1"}
              className="px-6 py-2 text-xs md:px-10 md:py-6"
              onClick={() => router.push("/auth")}
            >
              Masuk/Daftar
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden ">
                <CiMenuBurger size={15} />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-gradient-to-b from-[#E7D8D8] to-[#999999] h-full flex flex-col gap-2 ">
              <nav className="mt-10 h-full flex-col gap-2">
                <ul className="flex flex-col items-start gap-y-16 justify-center">
                  {links.map(({ href, label }) => (
                    <li key={`${href}${label}`}>
                      <Link href={href} className="text-3xl font-semibold ">
                        <SheetClose>{label}</SheetClose>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="relative w-32 h-32">
                <Image
                  src="/images/logo-2.png"
                  alt="logo"
                  fill
                  objectFit="contain"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
