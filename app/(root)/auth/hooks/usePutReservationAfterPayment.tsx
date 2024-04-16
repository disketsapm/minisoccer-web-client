import { ReservationService } from "@/services/reservation.service";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const usePutReservationAfterPayment = () => {
  const reservationService = new ReservationService();

  return useMutation({
    mutationFn: async (data: { orderId: string }) =>
      reservationService.putAfterPayment(data),
    mutationKey: ["putReservationAfterPayment"],
  });
};

export default usePutReservationAfterPayment;
