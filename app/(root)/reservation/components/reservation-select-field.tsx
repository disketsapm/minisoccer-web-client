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
> = ({ onValueChange, defaultValue }) => {
  const fieldService = new FieldService();

  const { data, isLoading } = useQuery({
    queryKey: ["list-field"],
    queryFn: () => fieldService.getListField({}),
  });

  return (
    <>
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <SelectTrigger isLoading={isLoading}>
          <SelectValue placeholder="Pilih Lapangan" />
        </SelectTrigger>
        <SelectContent>
          {data?.data?.map((item: any) => {
            return <SelectItem value={item._id}>{item.yardName}</SelectItem>;
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default ReservationSelectField;
