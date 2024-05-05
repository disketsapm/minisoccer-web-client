import { FieldService } from "@/services/field.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormFieldSchema from "../schema/form-field-schema";
import { z } from "zod";
import { useParams, useSearchParams } from "next/navigation";

const useGetScheduleIdByQueryParams = () => {
  const fieldService = new FieldService();

  const { watch } = useFormContext<z.infer<typeof FormFieldSchema>>();

  const fieldId = watch("field_id");

  const queryParams = useSearchParams();

  const scheduleId = queryParams.get("schedule_id");

  return useQuery({
    queryKey: ["reservation-reschedule-card"],

    queryFn: () =>
      fieldService.getScheduleById({
        params: {
          _id: scheduleId as string,
          search: fieldId,
        },
      }),
  });
};

export default useGetScheduleIdByQueryParams;
