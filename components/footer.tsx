import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" md:h-[200px] bg-black items-center flex flex-col md:flex-row justify-between text-white md:px-20 py-5 w-full px-10 text-xl">
      <div className="h-32 w-32 relative">
        <Image
          src="/images/logo-2.png"
          alt="logo"
          fill
          objectFit="contain"
        />
      </div>
      <div className="flex justify-between w-full md:w-1/3 mx-auto">
        <div className="flex flex-col gap-20">
          <div>Booking</div>
          <div>Tentang Kami</div>
        </div>
        <div className="flex flex-col gap-20">
          <div>Kerja Sama</div>
          <div>Hubungi Kami</div>
        </div>
      </div>
      <div className="mt-2 w-full md:w-[300px] h-[200px] relative">
        <Image
          src="/images/payment.png"
          alt="logo"
          fill
          objectFit="contain"
        />
      </div>
    </footer>
  );
}
