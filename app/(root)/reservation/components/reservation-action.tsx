import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldService } from "@/services/field.service";
import { useQuery } from "@tanstack/react-query";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import FormFieldSchema from "../schema/form-field-schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertError } from "@/components/ui/alert-error";
import { cn } from "@/lib/utils";
import { AlertCircle, HelpCircle } from "lucide-react";

const LabelValues: React.FC<{
  label: string;
  value: string;
  isLoading?: boolean;
}> = ({ label, value, isLoading }) => {
  return (
    <div className="flex gap-2">
      <div className="text-sm text-gray-500 w-[150px] flex-grow-0 flex-shrink-0">
        {label}
      </div>
      <div>:</div>
      {isLoading ? (
        <Skeleton className="w-36 h-5" />
      ) : (
        <div className="text-sm font-semibold">{value}</div>
      )}
    </div>
  );
};

const ReservationAction: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { getValues, handleSubmit, trigger, formState } =
    useFormContext<z.infer<typeof FormFieldSchema>>();

  const formValues = getValues();

  const fieldService = new FieldService();

  const isValid: boolean = formState?.isValid;

  const { data: fieldDetail, isLoading } = useQuery({
    queryKey: [
      "reservation-confirmation",
      formValues?.field_id,
      isOpen,
      formState?.isValid,
    ],
    queryFn: () =>
      fieldService.getFieldDetail({
        params: {
          _id: formValues?.field_id,
        },
      }),
    enabled: !!formValues?.field_id && isOpen && formState?.isValid,
  });

  const onSubmit = async (data: z.infer<typeof FormFieldSchema>) => {};

  console.log(formState?.errors);

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
          <div className={cn("flex  flex-col  w-full h-full p-4")}>
            {isValid ? (
              <>
                <LabelValues
                  label="Lapangan"
                  value={fieldDetail?.data?.yardName || ""}
                  isLoading={isLoading}
                />
                <LabelValues
                  label="Jenis Reservasi"
                  value={formValues?.type}
                  isLoading={isLoading}
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
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationAction;
