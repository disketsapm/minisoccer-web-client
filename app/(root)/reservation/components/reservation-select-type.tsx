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

const DATA_TYPE: { label: string; value: string }[] = [
  {
    label: "Event",
    value: "event",
  },
  {
    label: "Game",
    value: "game",
  },
];

const ReservationSelectType: React.FC<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
> = ({ onValueChange, defaultValue }) => {
  return (
    <>
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder="Pilih Tipe Booking" />
        </SelectTrigger>
        <SelectContent>
          {DATA_TYPE?.map((item) => {
            return <SelectItem value={item.label}>{item.label}</SelectItem>;
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default ReservationSelectType;