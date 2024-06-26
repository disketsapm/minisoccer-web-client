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
  title: string;
  description: string;
  imageSrc: string;
}

export default function ModalInfoBooking({
  isOpen,
  onClose,
  title,
  description,
  imageSrc,
}: ModalInfoBookingProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="p-0 border-none rounded-md overflow-hidden radial-gradient-3 ">
        <div className="w-full h-[400px] relative">
          <Image src={imageSrc} alt="Booking Success" fill objectFit="cover" />
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-2xl font-black">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-justify w-full p-5 text-black">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="p-5">
          <AlertDialogCancel className="w-full ">Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
