import { Card } from "@/components/ui/card";
import { IOrderHistory, IScheduleHistory } from "../../type/history.type";
import QRCode from "react-qr-code";
import { formattedTime } from "@/utils/formatTime";
import { Button } from "@/components/ui/button";
import { cn, formatDateToIndonesian, getDiffDays } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ReservationDetailCardItem: React.FC<{
  item: IScheduleHistory;
  data: IOrderHistory;
}> = ({ item, data }) => {
  const QRValue = {
    order_id: data?.referenceNumber,
    schedule_id: item?.schedule_id,
  };

  const router = useRouter();

  const [viewQR, setViewQR] = useState<boolean>(false);

  const currentDiffDays = getDiffDays(item?.start_time);

  const isExpired = currentDiffDays < 0;
  const isToday = currentDiffDays === 0;
  const isCommingSoon = currentDiffDays <= 2;

  const isCanReschedule = currentDiffDays > 2;

  const renderLabel = () => {
    if (isExpired) return "Booking Expired";

    if (isToday) return "Tampilkan QR";

    if (isCanReschedule) return "Jadwal Ulang";

    if (isCommingSoon) return `${currentDiffDays} Hari Lagi`;
  };

  const QRValueString = JSON.stringify(QRValue);

  const BlurBackground = () => {
    return (
      <div className="w-full h-full absolute inset-0 rounded-xl backdrop-blur-md grid place-items-center">
        <div className="w-[90px] h-[90px] relative">
          <Image src="/images/logo-white.png" fill alt="logo-white" priority />
        </div>
      </div>
    );
  };

  return (
    <Card className="w-[300px] h-full rounded-xl">
      <div className="w-full h-full flex  px-8 py-4 flex-col rounded-xl radial-gradient-4">
        <div className="w-full h-full flex  flex-col gap-5   items-center justify-center">
          <div className="w-full h-full p-4 rounded-2xl shadow-lg  bg-white relative">
            <QRCode value={QRValueString} className="w-full h-full" level="Q" />
            {viewQR ? null : <BlurBackground />}
          </div>

          <div className="w-full flex justify-center items-center  gap-2 flex-col text-white">
            <p className=" font-semibold text-xl">
              {formatDateToIndonesian(item?.start_time)}
            </p>
            <p className="text-sm font-light">
              {formattedTime(item?.start_time)} -{" "}
              {formattedTime(item?.end_time)} ({item?.name})
            </p>
          </div>

          <Button
            variant="outline"
            className={cn("text-white border-white w-full", {
              "bg-black text-white border-black cursor-default  hover:bg-black ":
                isExpired || isCommingSoon,
              "hover:bg-black hover:border-black": isToday || isCanReschedule,
            })}
            onClick={() => {
              if (isExpired || isCommingSoon) return;

              if (isToday) setViewQR(true);

              if (isCanReschedule)
                router.push(`/reservation/${item?.schedule_id}`);
            }}
          >
            {renderLabel()}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ReservationDetailCardItem;
