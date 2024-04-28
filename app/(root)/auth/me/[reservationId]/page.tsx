"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import ItemCardHistory from "../components/item-card-history";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import useGetDetailHistoryUser from "../hooks/useGetDetailHistoryUser";
import { IOrderHistory, IScheduleHistory } from "../type/history.type";
import { formatDate } from "@fullcalendar/core/index.js";
import QRCode from "react-qr-code";
import { formattedTime } from "@/utils/formatTime";
import { formatDateToIndonesian } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import UserCardHistory from "../components/user-card-history";
import ReservationDetailCardItem from "./components/reservation-detail-card-item";

const ReservationDetail = () => {
  const params = useParams();

  const { reservationId } = params;

  const { data, isLoading } = useGetDetailHistoryUser({
    _id: reservationId as string,
  });

  const router = useRouter();

  const SKELETON_COUNT = 5;

  return (
    <div className="w-full h-full radial-gradient-3 px-4">
      <div className="w-full h-full flex flex-col container gap-2 py-5">
        <div className="w-full justify-between flex gap-2 items-center flex-col md:flex-row">
          <p className="bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF00] w-fit h-fit px-6 py-2 rounded-lg text-2xl font-black">
            Detail Booking
          </p>

          <Button
            variant="outline"
            className="hidden md:block"
            onClick={() => router.push("/auth/me")}
          >
            ← Kembali ke Riwayat Booking
          </Button>
        </div>

        <div className="w-full h-full   flex  items-center flex-col gap-5 p-4">
          {isLoading && (
            <div className="w-full flex gap-3 ">
              {Array.from({
                length: SKELETON_COUNT,
              }).map((i, _index) => (
                <Skeleton key={_index} className="w-[300px] h-[350px]" />
              ))}
            </div>
          )}

          {!isLoading && (
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full overflow-hidden md:block "
            >
              <CarouselContent className="-ml-4">
                {data?.data?.schedules?.map((item: any, index: number) => (
                  <CarouselItem key={index} className="basis-1/1">
                    <ReservationDetailCardItem
                      key={item?._id}
                      item={item}
                      data={data?.data}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>

        <div className="w-full md:h-[250px] h-full flex gap-3 flex-col md:flex-row ">
          <div className="w-full h-full">
            <UserCardHistory
              historyUserData={data?.data as IOrderHistory}
              variant="detail"
              isLoading={isLoading}
            />
          </div>

          <div className="md:w-1/2 w-full h-[250px]  md:h-full overflow-hidden  rounded-lg ">
            {isLoading ? (
              <Skeleton className="w-full h-[250px]" />
            ) : (
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.938525379262!2d106.76214517453191!3d-6.271814661395947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f0526938c0bf%3A0x945ab245061f8415!2sJl.%20RC.%20Veteran%20Raya%20No.1%2C%20RT.9%2FRW.3%2C%20Bintaro%2C%20Kec.%20Pesanggrahan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012330!5e0!3m2!1sid!2sid!4v1707502591058!5m2!1sid!2sid"
                width="1030"
                height="700"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
