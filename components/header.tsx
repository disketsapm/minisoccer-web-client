import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
  const links = [
    { href: "/", label: "Booking" },
    { href: "/about", label: "Tentang kamis" },
    { href: "/about", label: "Kerja Sama" },
    { href: "/about", label: "Hubungi Kami" }
  ];
  return (
    <header className="flex justify-between my-10 ">
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
          <li>
            <Button
              variant={"accent-1"}
              size="xl"
            >
              Masuk/Daftar
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
