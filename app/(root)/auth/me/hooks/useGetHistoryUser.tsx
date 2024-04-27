import { ReservationService } from "@/services/reservation.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type IUseGetHistoryUser = {
  search?: string;
  enabled?: boolean;
  key?: any;
};

const useGetHistoryUser = ({ search, enabled, key }: IUseGetHistoryUser) => {
  const reservationService = new ReservationService();

  return useQuery({
    queryKey: ["userHistory", ...key],
    queryFn: () =>
      reservationService.getReservation({
        search,
      }),

    enabled,
  });
};

export default useGetHistoryUser;
