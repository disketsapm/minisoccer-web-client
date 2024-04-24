"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import useGetHistoryUser from "../hooks/useGetHistoryUser";
import { formatDate } from "@fullcalendar/core/index.js";
import { cn, formatCurrencyToIDR } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import ItemCardHistory from "./item-card-history";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { IOrderHistory } from "../type/history.type";

const UserCardHistory: React.FC<{
  historyUserData: IOrderHistory;
  variant?: "default" | "detail";
  isLoading?: boolean;
}> = ({ historyUserData, variant = "default", isLoading }) => {
  const StatusLabel = ({ status }: { status: string }) => {
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
      <p
        className={cn(
          "font-bold text-center text-sm   h-fit px-2 py-1 rounded-md",
          { "bg-[#FFE143]": status === "Pending" },
          { "bg-[#F88686]": status === "Failed" },
          { "bg-[#88FFB1]": status === "Paid" },
          { "md:w-[250px] w-[150px]": variant === "default" },
          { "md:w-[150px]": variant === "detail" }
        )}
      >
        {renderStatusLabel()}
      </p>
    );
  };

  const RenderQRBooking = ({
    status,
    snapUrl,
    reservationId,
  }: {
    status: string;
    snapUrl?: string;
    reservationId?: string;
  }) => {
    const router = useRouter();

    switch (status) {
      case "Pending":
        return (
          <Button variant="outline" onClick={() => window.open(snapUrl)}>
            Bayar Pelunasan Disini
          </Button>
        );
      case "Failed":
        return <></>;
      case "Paid":
        return (
          <Button
            variant="outline"
            onClick={() => router.push(`/auth/me/${reservationId}`)}
          >
            Lihat QR Code
          </Button>
        );
      default:
        return "";
    }
  };

  const LabelHistoryItem = ({
    label,
    children,
    isLoading,
  }: {
    label: string;
    children: React.ReactNode;
    isLoading?: boolean;
  }) => {
    return (
      <div className="flex flex-col gap-2 w-full h-full">
        {isLoading ? (
          <Skeleton className="w-[190px] h-[50px]" />
        ) : (
          <>
            <p className="text-sm font-bold">{label}</p>
            <div>{children}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "px-6 py-4 flex flex-col gap-3 rounded-xl bg-gradient-to-r from-[#FFFFFF] to-[#999999]",
        {
          "h-auto": variant === "default",
          "h-full justify-between": variant === "detail",
        }
      )}
    >
      <>
        <div className="w-full justify-between flex flex-col md:flex-row gap-3">
          <div className="flex flex-col gap-1">
            {isLoading ? (
              <Skeleton className="w-[250px] h-[30px]" />
            ) : (
              <p className="font-bold">
                {historyUserData?.schedules[0]?.field_name}
              </p>
            )}

            {isLoading ? (
              <Skeleton className="w-[250px] h-[30px]" />
            ) : (
              <p className="text-sm ">{historyUserData?.referenceNumber}</p>
            )}
          </div>

          <div className="flex gap-2">
            {variant === "default" ? (
              <RenderQRBooking
                status={historyUserData?.paymentStatus}
                snapUrl={historyUserData?.snap_url}
                reservationId={historyUserData?._id}
              />
            ) : null}
          </div>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1 w-full gap-5 md:gap-0">
          <LabelHistoryItem label="Status" isLoading={isLoading}>
            <StatusLabel status={historyUserData?.paymentStatus} />
          </LabelHistoryItem>
          <LabelHistoryItem label="Tanggal Booking" isLoading={isLoading}>
            {formatDate(historyUserData?.createdAt)}
          </LabelHistoryItem>
          <LabelHistoryItem
            isLoading={isLoading}
            label={`${historyUserData?.schedules?.length} Slot Sesi Lapangan - ${historyUserData?.type}`}
          >
            {formatCurrencyToIDR(historyUserData?.total)}
          </LabelHistoryItem>

          <LabelHistoryItem label="Lokasi Lapang" isLoading={isLoading}>
            <p
              onClick={() => window.open("item?.schedules[0]?.field_url")}
              className="overflow-hidden whitespace-nowrap underline font-semibold text-ellipsis md:w-[200px] w-[150px] cursor-pointer"
            >
              {historyUserData?.schedules[0]?.field_url}
            </p>
          </LabelHistoryItem>
        </div>
      </>
    </div>
  );
};

export default UserCardHistory;
