import { ReservationService } from "@/services/reservation.service";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { IFormFieldSchema } from "../type/reservation.type";

const usePostReservation = () => {
  const reservationService = new ReservationService();

  return useMutation({
    mutationFn: (data: IFormFieldSchema) =>
      reservationService.postReservation(data),
  });
};

export default usePostReservation;
