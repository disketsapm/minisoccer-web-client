import { FieldService } from "@/services/field.service";
import { useQuery } from "@tanstack/react-query";
import * as SelectPrimitive from "@radix-ui/react-select";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";
import { useFormContext } from "react-hook-form";

const ReservationSelectField: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
> = ({ onValueChange, defaultValue }) => {
  const fieldService = new FieldService();

  const { data, isLoading, isFetched, fetchStatus } = useQuery({
    queryKey: ["list-field"],
    queryFn: () => fieldService.getListField(),
  });

  const firstRenderSelectedField =
    isFetched && fetchStatus === "idle" ? data?.data[0]?._id : "";

  React.useEffect(() => {
    if (firstRenderSelectedField && onValueChange) {
      onValueChange(firstRenderSelectedField);
    }
  }, [firstRenderSelectedField, onValueChange]);

  return (
    <>
      <Select
        onValueChange={onValueChange}
        value={defaultValue}
        defaultValue={firstRenderSelectedField}
      >
        <SelectTrigger isLoading={isLoading}>
          <SelectValue placeholder="Pilih Lapangan" />
        </SelectTrigger>
        <SelectContent>
          {data?.data?.map((item: any) => {
            return (
              <SelectItem key={item?._id} value={item._id}>
                {item.yardName}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default ReservationSelectField;
