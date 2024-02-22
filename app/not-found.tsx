import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-5">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={100}
        height={100}
      />
      <Image
        src="/images/404.png"
        alt="404"
        width={500}
        height={500}
      />

      <Button
        variant={"accent-1"}
        size={"lg"}
      >
        Kembali ke Beranda
      </Button>
    </div>
  );
}
