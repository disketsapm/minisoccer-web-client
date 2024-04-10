"use client";

import React from "react";
import ReservationSelectField from "./reservation-select-field";
import {
  FieldValues,
  Form,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
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
import ReservationSelectType from "./reservation-select-type";

const ReservationForm = () => {
  const { control, handleSubmit } =
    useFormContext<z.infer<typeof FormFieldSchema>>();

  const onSubmit = async (data: z.infer<typeof FormFieldSchema>) => {
    // console.log(data);
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
                <ReservationSelectField
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        name="type"
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Jenis Reservasi</FormLabel>
              <FormControl>
                <ReservationSelectType
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
