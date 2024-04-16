import { Card } from "@/components/ui/card";
import React from "react";
import ItemCardHistory from "../components/item-card-history";
import { Button } from "@/components/ui/button";

const ReservationDetail = () => {
  const ReservationDetailCardItem = () => {};

  return (
    <div className="w-full h-[70vh] overflow-hidden">
      <div className="w-full h-full flex justify-center items-center">
        <Card className="w-1/2 h-[450px]  border border-gray-300">
          <div className="w-full h-full flex gap-2 px-6 py-4">
            <div className="w-full h-full p-3">
              <div className="w-full h-full bg-gray-300 rounded-md" />
            </div>
            <div className="w-full h-full flex-col gap-5 flex">
              <div className="font-bold text-[70px]">QR Session</div>

              <div className="w-full h-full flex flex-col gap-10">
                <div className="w-full h-fit flex gap-3 flex-col p-3">
                  <ItemCardHistory
                    label="Kode Booking"
                    size="large"
                    value="Value"
                  />
                  <ItemCardHistory
                    label="Tanggal Booking"
                    size="large"
                    value="Value"
                  />
                  <ItemCardHistory
                    label="Tanggal dan Jam Main"
                    size="large"
                    value="Value"
                  />
                  <ItemCardHistory
                    label="Lapangan"
                    size="large"
                    value="Value"
                  />
                  <ItemCardHistory label="Tipe" size="large" value="Value" />
                </div>

                <div className="w-full flex justify-between gap-2">
                  <div className="w-full font-italic font-semibold text-[10px] h-fit">
                    *Tunjukkan QR Booking kepada kasir saat berada di lapangan
                  </div>

                  <Button variant="accent-1">Lokasi Soccer Chief</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReservationDetail;
