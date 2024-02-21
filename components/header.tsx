import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
export default function Header() {
  const links = [
    { href: "/", label: "Booking" },
    { href: "/about", label: "Tentang kami" },
    { href: "/about", label: "Kerja Sama" },
    { href: "/about", label: "Hubungi Kami" }
  ];
  return (
    <header className="flex justify-between items-center my-10 px-2 md:mx-auto md:w-[80vw] w-full  ">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
      />
      <nav>
        <ul className=" space-x-16 items-center hidden md:flex">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a
                href={href}
                className="text-sm font-semibold hover:text-gray-300"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex gap-2">
        <Link href="/auth">
          <Button
            variant={"accent-1"}
            className="text-xs px-6 py-2 md:px-10 md:py-6"
          >
            Masuk/Daftar
          </Button>
        </Link>

        <Button
          className=" md:hidden"
          size={"sm"}
          variant={"outline"}
        >
          <CiMenuBurger size={15} />
        </Button>
      </div>
    </header>
  );
}
