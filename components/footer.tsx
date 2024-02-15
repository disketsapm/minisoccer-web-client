import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" h-[200px] bg-[#18684F] flex justify-between text-white px-20 py-10">
      <div>
        <Image
          src="/images/logo-2.png"
          alt="logo"
          width={150}
          height={150}
        />
      </div>
      <div className="flex gap-40">
        <div className="flex flex-col gap-20">
          <div>Booking</div>
          <div>Tentang Kami</div>
        </div>
        <div className="flex flex-col gap-20">
          <div>Kerja Sama</div>
          <div>Hubungi Kami</div>
        </div>
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
