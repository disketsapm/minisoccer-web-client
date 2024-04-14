import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import {
  cn,
  formatCurrencyToIDR,
  getTotalPriceInListOfPrice,
} from "@/lib/utils";
import { AlertCircle, HelpCircle, ExternalLink } from "lucide-react";
import useGetListOfScheduleById from "../hooks/useGetListOfScheduleById";
import useGetFieldById from "../hooks/useGetFieldById";
import { IFormFieldSchema } from "../type/reservation.type";
import ReservationSessionCard from "./reservation-session-card";

const LabelValues: React.FC<{
  label: string;
  value: React.ReactNode;
  isLoading?: boolean;
  loadingClassname?: string;
}> = ({ label, value, isLoading, loadingClassname }) => {
  return (
    <div className="flex gap-2 w-full h-full">
      <div className="text-sm text-gray-500 w-[150px] flex-grow-0 flex-shrink-0">
        {label}
      </div>
      <div>:</div>
      {isLoading ? (
        <Skeleton className={`w-36 h-5 ${loadingClassname}`} />
      ) : (
        <div className="text-sm font-semibold w-full h-full">{value}</div>
      )}
    </div>
  );
};

const ReservationAction: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { getValues, handleSubmit, trigger, formState } =
    useFormContext<IFormFieldSchema>();

  const formValues = getValues();

  const isValid: boolean = formState?.isValid;

  const { data: fieldDetail, isLoading: isFieldDetailLoading } =
    useGetFieldById({
      key: [
        "reservation-confirmation",
        formValues?.field_id,
        isOpen,
        formState?.isValid,
      ],
      enabled: !!formValues?.field_id && isOpen && formState?.isValid,
    });

  const { data: scheduleData, isLoading: isListScheduleLoading } =
    useGetListOfScheduleById({
      isOpen,
    });

  const onSubmit = async (data: IFormFieldSchema) => {};

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger className="w-[fit-content]">
        <Button
          className="w-fit"
          variant="accent-1"
          onClick={() => {
            trigger();
            setIsOpen(true);
          }}
        >
          Book Sekarang
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base">
            <div className="flex gap-2 items-center">
              {isValid ? (
                <HelpCircle className="text-blue-500" />
              ) : (
                <AlertCircle className="text-red-500" />
              )}

              <p className="text-base">
                {isValid
                  ? "Konfirmasi Reservasi"
                  : "Terjadi Kesalahan Pada Form!"}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full h-full rounded-sm border border-gray-100")}>
          <div className={cn("flex  flex-col  w-full h-full p-4 gap-2")}>
            {isValid ? (
              <>
                <LabelValues
                  label="Lapangan"
                  value={fieldDetail?.data?.yardName || ""}
                  isLoading={isFieldDetailLoading}
                />
                <LabelValues
                  label="Jenis Reservasi"
                  value={formValues?.type}
                  isLoading={isFieldDetailLoading}
                />

                <LabelValues
                  label="Sesi"
                  value={
                    <div className="w-full h-full flex gap-2 flex-wrap">
                      {scheduleData?.map((item) => {
                        return (
                          <ReservationSessionCard
                            key={item?._id}
                            sessionName={item?.session}
                            startTime={item?.timeStart.toString()}
                            endTime={item?.timeEnd.toString()}
                          />
                        );
                      })}
                    </div>
                  }
                  loadingClassname="h-12"
                  isLoading={isListScheduleLoading}
                />

                <LabelValues
                  label="Total Harga"
                  value={getTotalPriceInListOfPrice(scheduleData)}
                  isLoading={isListScheduleLoading}
                />

                <LabelValues
                  label="Lokasi"
                  value={
                    <a
                      href={fieldDetail?.data?.yardLocationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 h-full text-center w-full flex items-center underline gap-2"
                    >
                      <p>Lihat Lokasi</p>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  }
                  isLoading={isFieldDetailLoading}
                />
              </>
            ) : (
              <div className="text-red-400 font-semibold text-sm">
                {formState?.errors?.field_id ? (
                  <div>* {formState?.errors?.field_id?.message}</div>
                ) : null}
                {formState?.errors?.type ? (
                  <div>* {formState?.errors?.type?.message}</div>
                ) : null}

                {formState?.errors?.schedule_id ? (
                  <div>* {formState?.errors?.schedule_id?.message}</div>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Tutup
          </Button>
          {isValid ? (
            <Button variant="accent-1">Proses Reservasi</Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationAction;
