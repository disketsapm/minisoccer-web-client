import { ReservationService } from "@/services/reservation.service";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { IFormFieldSchema } from "../type/reservation.type";

type IPostReservationResponse = {
  onError?: (error: any) => void;
};

const usePostReservation = ({ onError }: IPostReservationResponse) => {
  const reservationService = new ReservationService();

  return useMutation({
    mutationFn: (data: any) => reservationService.postReservation(data),

    onSuccess: (response) => {
      const snapRedirectUrl = response?.data?.data?.snap_redirect_url;

      if (snapRedirectUrl) {
        window.location.href = snapRedirectUrl;
      }
    },

    onError: (error) => {
      onError && onError(error);
    },
  });
};

export default usePostReservation;
