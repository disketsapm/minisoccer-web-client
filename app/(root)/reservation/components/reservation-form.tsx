"use client";

import React from "react";
import ReservationSelect from "./reservation-select";
import { Form, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import FormFieldSchema from "../schema/form-field-schema";
import { Button } from "@/components/ui/button";

const ReservationForm = () => {
  const { control, handleSubmit } = useFormContext();

  const onSubmit = (data: z.infer<typeof FormFieldSchema>) => {
    console.log(data);
  };

  return (
    <form
      className="w-full flex flex-col gap-2 px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        name="field"
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Pilih Lapangan</FormLabel>
              <FormControl>
                <ReservationSelect
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <Button type="submit" className="w-full" variant="accent-1">
        Submit
      </Button>
    </form>
  );
};

export default ReservationForm;
