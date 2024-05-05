import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ModalInfoBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalInfoBooking({
  isOpen,
  onClose,
}: ModalInfoBookingProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className=" border-none rounded-md overflow-hidden radial-gradient-3 ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-3xl font-black">
            Syarat dan <br /> Ketentuan Booking
          </AlertDialogTitle>
          <AlertDialogDescription className="text-justify w-full p-5 max-h-[400px] overflow-y-auto text-black">
            Merupakan tanggung jawab penyewa untuk membaca dan memahami Syarat
            dan Ketentuan Pemesananan ini, ketentuan-ketentuan lainnya yang
            dikeluarkan oleh Soccer Chief untuk memahami risiko, kewajiban dan
            tanggung jawab yang menyertainya. Soccer Chief tidak akan
            bertanggung jawab atas keterlambatan, kerugian, dan biaya yang
            timbul dari kelalaian dan kesalahan penyewa dalam memenuhi
            kewajiban-kewajiban penyewaan.
            <br />
            <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="p-5">
          <AlertDialogCancel className="w-full ">Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
