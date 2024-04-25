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
import usePostReservation from "../hooks/usePostReservation";
import ErrorDialog from "@/components/ui/error-dialog";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { AnimatePresence, motion } from "framer-motion";

const bookAnimation = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 100 },
};

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
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [submitErrorMsg, setSubmitErrorMsg] = React.useState<string>("");

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

  const {
    mutateAsync: reservationMutations,
    isPending: isPendingReservationMutations,
  } = usePostReservation({
    onError: (error) => {
      setIsOpen(false);
      setSubmitErrorMsg(error?.message);
    },
  });

  const onSubmit = async (data: IFormFieldSchema) => {
    const deletedNameInAdditionalItem = data?.additional_item?.map((item) => {
      return {
        id: item?.id,
        quantity: item?.quantity,
      };
    });

    const transformData = {
      ...data,
      additional_item: deletedNameInAdditionalItem,
    };

    reservationMutations(transformData);
  };

  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key="book-now"
          initial={{ opacity: 0, y: 100 }}
          animate={isValid ? "open" : "closed"}
          variants={bookAnimation}
          className="fixed w-full h-[200px] flex justify-center items-center bg-gradient-to-b from-transparent to-[#999999] pt-20 bottom-0 z-10 left-0 right-0 m-auto"
        >
          <div className="container">
            <Button
              className="w-full"
              variant="accent-1"
              onClick={() => {
                trigger();
                setIsOpen(true);
              }}
            >
              Book Sekarang
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      <ErrorDialog
        isOpen={Boolean(submitErrorMsg)}
        onChange={() => setSubmitErrorMsg("")}
        content={submitErrorMsg}
      />

      <ConfirmationDialog
        isOpen={isOpen && isValid}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={isPendingReservationMutations}
        submitTitle="Proses Reservasi"
        title="Konfirmasi Reservasi"
        onChange={(val: boolean) => setIsOpen(val)}
        content={
          <div className={cn("flex  flex-col  w-full h-full p-4 gap-2")}>
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
                        price={item?.price.toString()}
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

            {formValues?.additional_item
              ? formValues?.additional_item?.length > 0 && (
                  <LabelValues
                    label="Tambahan"
                    value={
                      <p>
                        {formValues?.additional_item?.map((item) => {
                          return `${item?.name} (${
                            formValues?.schedule_id?.length === item?.quantity
                              ? "Semua Sesi"
                              : item?.quantity
                          })`;
                        })}
                      </p>
                    }
                    isLoading={isFieldDetailLoading}
                  />
                )
              : null}

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
          </div>
        }
      />

      <ErrorDialog
        isOpen={isOpen && !isValid}
        onChange={(val: boolean) => setIsOpen(val)}
        content={
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
        }
      />
    </div>
  );
};

export default ReservationAction;
