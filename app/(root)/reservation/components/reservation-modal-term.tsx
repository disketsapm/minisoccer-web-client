import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
      <AlertDialogContent
        sizes="2xl"
        className=" border-none w-[80vw]  rounded-md overflow-hidden radial-gradient-3 "
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-3xl font-black">
            Syarat dan <br /> Ketentuan Booking
          </AlertDialogTitle>
          <AlertDialogDescription className="text-justify w-full p-5 h-[550px] overflow-y-auto text-black relative">
            <iframe
              src="../../../../public/files/TNC_MINSOC.pdf"
              width="100%"
              height="100%"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="p-5">
          <AlertDialogCancel className="w-full ">Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
