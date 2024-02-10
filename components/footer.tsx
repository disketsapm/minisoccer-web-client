import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20 h-[200px] bg-[#18684F] flex justify-between text-white px-20 py-10">
      <div>
        <Image
          src="/images/logo-2.png"
          alt="logo"
          width={150}
          height={150}
        />
      </div>
      <div className="grid grid-cols-2 gap-14 gap-x-80">
        <div>Booking</div>
        <div>Tentang Kami</div>
        <div>Kerja Sama</div>
        <div>Hubungi Kami</div>
      </div>
      <div>
        <Image
          src="/images/payment.png"
          alt="logo"
          width={300}
          height={300}
        />
      </div>
    </footer>
  );
}
