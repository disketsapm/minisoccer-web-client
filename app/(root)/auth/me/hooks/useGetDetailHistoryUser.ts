import { ReservationService } from "@/services/reservation.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type IOrderHistory = {
  _id?: string | undefined;
};

const useGetDetailHistoryUser = ({ _id }: IOrderHistory) => {
  const reservationService = new ReservationService();

  return useQuery({
    queryKey: ["userHistory", _id],
    queryFn: () =>
      reservationService.getDetailReservation({
        _id: _id,
      }),
  });
};

export default useGetDetailHistoryUser;
