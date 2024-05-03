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

const ReservationSelectField: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
> = ({ onValueChange, defaultValue, disabled }) => {
  const fieldService = new FieldService();

  const { data, isLoading, isFetched, fetchStatus, isSuccess } = useQuery({
    queryKey: ["list-field"],
    queryFn: () => fieldService.getListField(),
    refetchInterval: false,
  });

  const firstRenderSelectedField =
    isFetched && isSuccess ? data?.data[0]?._id : "";

  React.useEffect(() => {
    if (firstRenderSelectedField && onValueChange) {
      onValueChange(firstRenderSelectedField);
    }
  }, [firstRenderSelectedField]);

  return (
    <>
      <Select
        onValueChange={onValueChange}
        value={defaultValue}
        defaultValue={firstRenderSelectedField}
        disabled={disabled}
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
