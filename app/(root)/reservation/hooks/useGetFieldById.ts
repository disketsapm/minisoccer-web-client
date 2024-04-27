import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import FormFieldSchema from "../schema/form-field-schema";
import { FieldService } from "@/services/field.service";

type IUseFieldById = {
  key: any[];
  enabled?: boolean;
};

const useGetFieldById = ({ key, enabled }: IUseFieldById) => {
  const fieldService = new FieldService();

  const { getValues } = useFormContext<z.infer<typeof FormFieldSchema>>();

  const formValues = getValues();

  return useQuery({
    queryKey: [...key],
    queryFn: () =>
      fieldService.getFieldDetail({
        params: {
          _id: formValues?.field_id,
        },
      }),
    enabled,
  });
};

export default useGetFieldById;
