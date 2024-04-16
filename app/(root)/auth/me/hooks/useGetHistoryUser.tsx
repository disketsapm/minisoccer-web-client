import { ReservationService } from "@/services/reservation.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetHistoryUser = () => {
  const reservationService = new ReservationService();

  return useQuery({
    queryKey: ["userHistory"],
    queryFn: () => reservationService.getReservation(),
  });
};

export default useGetHistoryUser;
