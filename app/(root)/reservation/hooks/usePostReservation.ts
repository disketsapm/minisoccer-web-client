import { ReservationService } from "@/services/reservation.service";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { IFormFieldSchema } from "../type/reservation.type";
import { useRouter } from "next/navigation";

type IPostReservationResponse = {
  onError?: (error: any) => void;
};

const usePostReservation = ({ onError }: IPostReservationResponse) => {
  const reservationService = new ReservationService();

  const router = useRouter();

  return useMutation({
    mutationFn: (data: any) => reservationService.postReservation(data),

    onSuccess: (response) => {
      const snapRedirectUrl = response?.data?.data?.snap_redirect_url;

      router?.push("/auth?type=waiting-payment");

      if (snapRedirectUrl) {
        window.open(snapRedirectUrl, "_blank");
      }
    },

    onError: (error) => {
      console.log(error);
      onError && onError(error);
    },
  });
};

export default usePostReservation;
