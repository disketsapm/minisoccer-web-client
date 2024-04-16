"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import useGetHistoryUser from "../hooks/useGetHistoryUser";
import { formatDate } from "@fullcalendar/core/index.js";
import { cn, formatCurrencyToIDR } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import ItemCardHistory from "./item-card-history";
import { useRouter } from "next/navigation";

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

  const Link = ({
    children,
    onClick,
    isDisabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    isDisabled?: boolean;
  }) => {
    return (
      <p
        onClick={onClick}
        className={cn("font-bold", {
          "text-black": isDisabled,
          "underline text-blue-500 cursor-pointer": !isDisabled,
        })}
      >
        {children}
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
          <Link onClick={() => window.open(snapUrl)}>
            Bayar Pelunasan Disini
          </Link>
        );
      case "Failed":
        return <Link isDisabled>Pembayaran Hangus</Link>;
      case "Paid":
        return (
          <Link onClick={() => router.push(`/auth/me/${reservationId}`)}>
            Lihat QR Booking di sini
          </Link>
        );
      default:
        return "";
    }
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
          <Card
            className={cn("px-6 py-4 flex flex-col gap-3 rounded-xl", {
              "opacity-80": item?.paymentStatus === "Failed",
            })}
          >
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

              <ItemCardHistory
                label="QR Booking"
                value={
                  <RenderQRBooking
                    status={item?.paymentStatus}
                    snapUrl={item?.snap_url}
                    reservationId={item?._id}
                  />
                }
              />
            </div>
          </Card>
        ))}
    </div>
  );
};

export default UserCardHistory;
