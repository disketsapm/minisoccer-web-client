import { Card } from "@/components/ui/card";
import React from "react";
import useGetHistoryUser from "../hooks/useGetHistoryUser";
import { formatDate } from "@fullcalendar/core/index.js";
import { cn, formatCurrencyToIDR } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import ItemCardHistory from "./item-card-history";

const SKELETON_COUNT = 3;

const UserCardHistory = () => {
  const { data: historyUserData, isLoading: isLoadingHistoryUser } =
    useGetHistoryUser();

  const TitleCardHistory: React.FC<{ title: string; status: string }> = ({
    title,
    status,
  }) => {
    const renderStatusLabel = () => {
      switch (status) {
        case "Pending":
          return "Menunggu Pembayaran";
        case "Failed":
          return "Gagal";
        case "Paid":
          return "Lunas";
        default:
          return "";
      }
    };

    return (
      <div className="w-full flex gap-3 items-center">
        <p className="font-semibold text-sm">{title}</p>

        <p
          className={cn(
            "font-bold text-center text-sm  w-[250px] h-fit px-2 py-1 rounded-md",
            { "bg-[#F9A62A]": status === "Pending" },
            { "bg-[#CC3D3D]": status === "Failed" },
            { "bg-[#48CC3D]": status === "Paid" }
          )}
        >
          {renderStatusLabel()}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 w-full h-[650px] overflow-y-scroll overflow-hidden-scrollbar ">
      {isLoadingHistoryUser && (
        <>
          {Array.from({ length: SKELETON_COUNT }).map((i, _index) => (
            <Skeleton
              key={_index}
              className="px-6 py-4 h-[340px] flex flex-col gap-3 rounded-xl"
            />
          ))}
        </>
      )}

      {!isLoadingHistoryUser &&
        historyUserData?.data?.map((item) => (
          <Card className="px-6 py-4 flex flex-col gap-3 rounded-xl">
            <div>
              <TitleCardHistory
                title="Lapangan Testing"
                status={item?.paymentStatus}
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <ItemCardHistory
                label="Kode Booking"
                value={item?.referenceNumber}
              />

              <ItemCardHistory
                label="Tanggal Booking"
                value={formatDate(item?.createdAt)}
              />

              <ItemCardHistory label="Tipe" value={item?.type} />

              <ItemCardHistory
                label="Total Biaya"
                value={formatCurrencyToIDR(item?.total)}
              />
            </div>
          </Card>
        ))}
    </div>
  );
};

export default UserCardHistory;
