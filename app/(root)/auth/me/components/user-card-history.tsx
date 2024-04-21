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

const SKELETON_COUNT = 3;

const UserCardHistory = () => {
  const authService = new AuthService();

  const { data } = useQuery({
    queryKey: ["userHistory"],
    queryFn: () => authService.getUserDetail(),
  });

  const { data: historyUserData, isLoading: isLoadingHistoryUser } =
    useGetHistoryUser({
      search: data?._id,
      key: [data?._id],
      enabled: !!data,
    });

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
          "font-bold text-center text-sm  w-[250px] h-fit px-2 py-1 rounded-md",
          { "bg-[#FFE143]": status === "Pending" },
          { "bg-[#F88686]": status === "Failed" },
          { "bg-[#88FFB1]": status === "Paid" }
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
  }: {
    label: string;
    children: React.ReactNode;
  }) => {
    return (
      <div className="flex flex-col gap-2 w-full h-full">
        <p className="text-sm font-bold">{label}</p>
        <div>{children}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 w-full h-[650px] overflow-y-scroll overflow-hidden-scrollbar">
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
          <div
            key={item?._id}
            className={cn(
              "px-6 py-4 flex flex-col gap-3 rounded-xl bg-gradient-to-r from-[#FFFFFF] to-[#999999]"
            )}
          >
            <div className="w-full justify-between flex">
              <div className="flex flex-col gap-1">
                <p className="font-bold">{item?.schedules[0]?.field_name}</p>
                <p className="text-sm ">{item?.referenceNumber}</p>
              </div>

              <div className="flex gap-2">
                <RenderQRBooking
                  status={item?.paymentStatus}
                  snapUrl={item?.snap_url}
                  reservationId={item?._id}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 w-full">
              <LabelHistoryItem label="Status">
                <StatusLabel status={item?.paymentStatus} />
              </LabelHistoryItem>
              <LabelHistoryItem label="Tanggal Booking">
                {formatDate(item?.createdAt)}
              </LabelHistoryItem>
              <LabelHistoryItem
                label={`${item?.schedules?.length} Slot Sesi Lapangan - ${item?.type}`}
              >
                {formatCurrencyToIDR(item?.total)}
              </LabelHistoryItem>
              <LabelHistoryItem label="Lokasi Lapang">
                <p
                  onClick={() => window.open("item?.schedules[0]?.field_url")}
                  className="overflow-hidden whitespace-nowrap underline font-semibold text-ellipsis w-[200px] cursor-pointer"
                >
                  {item?.schedules[0]?.field_url}
                </p>
              </LabelHistoryItem>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserCardHistory;
