"use client;";
import { ReservationService } from "@/services/reservation.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { IFormFieldSchema } from "../type/reservation.type";
import { useRouter } from "next/navigation";
import useCustomToast from "@/hooks/core/useCustomToast";

type IRescheduleReservation = {
  onError?: (error: any) => void;
};

const useRescheduleReservations = ({ onError }: IRescheduleReservation) => {
  const reservationService = new ReservationService();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { openToast } = useCustomToast();

  return useMutation({
    mutationFn: (data: {
      order_id: string;
      original_schedule_id: string;
      reschedule_schedule_id: string;
    }) => reservationService.rescheduleReservation(data),

    onSuccess: (response) => {
      openToast({
        message: "Reschedule Jadwal Berhasil",
        variant: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["userHistory"],
      });

      router.back();
    },

    onError: (error) => {
      openToast({
        message: error?.message,
        variant: "error",
      });
      onError && onError(error);
    },
  });
};

export default useRescheduleReservations;
