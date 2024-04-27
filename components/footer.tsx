import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="md:h-[200px] bg-gradient-to-r z-50 from-white to-[#999999] items-center flex flex-col md:flex-row justify-betwee font-semibold text-black md:px-20 py-5 w-full px-10 text-md gap-5">
      <div className="relative w-32 h-32">
        <Image src="/images/logo-2.png" alt="logo" fill objectFit="contain" />
      </div>
      <div className="flex justify-between w-full mx-auto md:w-1/3">
        <div className="flex flex-col gap-20">
          <Link href={"#"} className="text-md">
            Booking
          </Link>
          <Link href={"#about"} className="text-md">
            Tentang Kami
          </Link>
        </div>
        <div className="flex flex-col gap-20">
          <div>Kerja Sama</div>
          <div>Hubungi Kami</div>
        </div>
      </div>
      <div className="mt-2 w-full md:w-[300px] h-[180px] relative">
        <Image src="/images/payment.png" alt="logo" fill objectFit="contain" />
      </div>
    </footer>
  );
}
