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

import { Button } from "@/components/ui/button";
import ReservationSelectType from "./reservation-select-type";
import ReservationCalendar from "./reservation-calendar";
import ReservationAction from "./reservation-action";
import { IFormFieldSchema } from "../type/reservation.type";
import ReservationAditionalItem from "./reservation-aditional-item";
import ReservationGalery from "./reservation-galery";

const ReservationForm = () => {
  const { control, getValues } = useFormContext<IFormFieldSchema>();

  const fieldId = getValues("field_id");

  return (
    <div className="w-full flex flex-col gap-6 px-4 h-full pb-6 relative ">
      <div className="w-full h-full flex-col md:flex-row flex gap-3">
        <div className="w-full">
          <FormField
            name="field_id"
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
        </div>

        <div className="w-full">
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
        </div>
      </div>

      <ReservationGalery />

      {fieldId ? (
        <p className="text-3xl font-black">Pilih Jadwal Booking</p>
      ) : null}

      <FormField
        name="schedule_id"
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <ReservationCalendar
                  onChange={field.onChange}
                  values={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        name="additional_item"
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <ReservationAditionalItem
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <ReservationAction />
    </div>
  );
};

export default ReservationForm;
