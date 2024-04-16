"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import ItemCardHistory from "../components/item-card-history";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import useGetDetailHistoryUser from "../hooks/useGetDetailHistoryUser";
import { IOrderHistory } from "../type/history.type";
import { formatDate } from "@fullcalendar/core/index.js";
import QRCode from "react-qr-code";

const ReservationDetail = () => {
  const params = useParams();

  const { reservationId } = params;

  const { data, isLoading } = useGetDetailHistoryUser({
    _id: reservationId as string,
  });

  const SKELETON_COUNT = 5;

  const ReservationDetailCardItem: React.FC<{ item: any }> = ({ item }) => {
    const QRValue = {
      order_id: data?.data?.referenceNumber,
      schedule_id: item?.schedule_id,
    };

    const QRValueString = JSON.stringify(QRValue);

    return (
      <Card className="w-1/2 h-full  md:h-[70%]  border border-gray-300">
        <div className="w-full h-full flex  px-6 py-4 flex-col md:flex-row">
          <div className="w-full h-full">
            <div className="w-full h-[250px] md:h-[400px]">
              <QRCode
                value={QRValueString}
                className="w-full h-full"
                size={400}
                level="Q"
              />
            </div>
          </div>

          <div className="w-full h-full flex-col p-4 gap-10 flex">
            <div
              className="w-full font-bold text-2xl  md:text-[6vh] pt-5"
              style={{ whiteSpace: "nowrap" }}
            >
              QR Session
            </div>

            <div className="w-full h-full flex flex-col gap-10">
              <div className="w-full h-fit flex gap-3 flex-col">
                <ItemCardHistory
                  label="Kode Booking"
                  size="large"
                  value={data?.data?.referenceNumber}
                />
                <ItemCardHistory
                  label="Tanggal Booking"
                  size="large"
                  value={formatDate(data?.data?.createdAt as string)}
                />
                <ItemCardHistory
                  label="Tanggal dan Jam Main"
                  size="large"
                  value="Value"
                />
                <ItemCardHistory label="Lapangan" size="large" value="Value" />
                <ItemCardHistory
                  label="Tipe"
                  size="large"
                  value={data?.data?.type}
                />
              </div>

              <div className="w-full h-full flex flex-col gap-5">
                <div className="w-full font-italic font-semibold text-[10px] h-fit">
                  *Tunjukkan QR Booking kepada kasir saat berada di lapangan
                </div>

                <div className="w-full flex justify-end gap-2">
                  <Button variant="accent-1">Lokasi Soccer Chief</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full  flex  items-center flex-col gap-5 p-4">
        {isLoading && (
          <div className="w-full h-full flex-col gap-5 p-4 flex justify-center items-center">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <Skeleton key={index} className="w-1/2 h-[650px]" />
            ))}
          </div>
        )}

        {!isLoading &&
          data?.data?.schedules?.map((item) => {
            return <ReservationDetailCardItem item={item} />;
          })}
      </div>
    </div>
  );
};

export default ReservationDetail;
