import { useEffect } from "react";
import { TransactionStatusEnum } from "../constants/auth.data";
import usePutReservationAfterPayment from "../hooks/usePutReservationAfterPayment";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const className = "text-6xl font-bold";

const getTransactionMessage = (status: TransactionStatusEnum) => {
  switch (status) {
    case TransactionStatusEnum.Pending:
      return {
        message: (
          <>
            <div className={className}>
              Pembayaran <br /> Anda <br /> Sedang Diproses
            </div>
            <p>Silakan Tunggu Secara Berkala</p>
          </>
        ),
      };
    case TransactionStatusEnum.Expired:
    case TransactionStatusEnum.Deny:
    case TransactionStatusEnum.Cancel:
      return {
        message: (
          <>
            <div className={className}>
              Terjadi <br /> Kesalahan <br /> Pembayaran
            </div>
            <p>Silakan Coba Kembali Pembayaran</p>
          </>
        ),
      };
    case TransactionStatusEnum.Success:
      return {
        message: (
          <>
            <div className={className}>
              Pembayaran <br /> Anda <br /> Berhasil!
            </div>
            <p>Silakan Cek Email Anda</p>
          </>
        ),
      };
    default:
      return {
        message: <></>,
      };
  }
};

export const TransactionStatus: React.FC = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const transaction_status = searchParams.get("transaction_status");

  const {
    mutate: mutateReservationAfterPayment,
    isError: isErrorReservationAfterPayment,
    isPending: isPendingReservationAfterPayment,
  } = usePutReservationAfterPayment();

  useEffect(() => {
    if (orderId && transaction_status === TransactionStatusEnum.Success) {
      mutateReservationAfterPayment({ order_id: orderId });
    }
  }, [orderId, mutateReservationAfterPayment]);

  if (transaction_status) {
    // handle error separately if transaction_status is success but error occurred during reservation update
    if (
      isErrorReservationAfterPayment &&
      transaction_status === TransactionStatusEnum.Success
    ) {
      return (
        <>
          <div className={className}>
            Terjadi <br /> Kesalahan <br /> Pembayaran
          </div>
          <p>Silakan Coba Kembali Pembayaran</p>
        </>
      );
    }

    // handle skeleton loading if transaction_status is success but reservation update is still pending
    if (
      isPendingReservationAfterPayment &&
      transaction_status === TransactionStatusEnum.Success
    ) {
      return <Skeleton className="w-[250px] md:w-full  h-[250px]" />;
    }

    // handle transaction status message
    const { message } = getTransactionMessage(
      transaction_status as TransactionStatusEnum
    );
    return message;
  }

  return <></>;
};
