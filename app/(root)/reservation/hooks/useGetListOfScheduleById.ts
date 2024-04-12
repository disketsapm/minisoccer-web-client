import { FieldService } from "@/services/field.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormFieldSchema from "../schema/form-field-schema";
import { z } from "zod";

type IUseGetListOfScheduleById = {
  isOpen?: boolean;
};

const useGetListOfScheduleById = ({ isOpen }: IUseGetListOfScheduleById) => {
  const fieldService = new FieldService();

  const { getValues, formState } =
    useFormContext<z.infer<typeof FormFieldSchema>>();

  const formValues = getValues();

  return useQuery({
    queryKey: [
      "reservation-schedule",
      formValues?.field_id,
      isOpen,
      formState?.isValid,
      formValues?.schedule_id,
    ],
    enabled: !!formValues?.field_id && isOpen && formState?.isValid,
    queryFn: () => {
      const promises = formValues?.schedule_id?.map((id) => {
        return fieldService.getScheduleById({
          params: {
            _id: id,
            search: formValues?.field_id,
          },
        });
      });

      return Promise.all(promises);
    },
  });
};

export default useGetListOfScheduleById;
