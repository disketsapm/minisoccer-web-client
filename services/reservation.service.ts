import { BaseResponse } from "@/interfaces/global.interface";
import { RequestAdapter } from "./request-adapter.service";
import {
  IField,
  IFormFieldSchema,
  ISchedule,
  SnapResponse,
} from "@/app/(root)/reservation/type/reservation.type";
import { AxiosResponse } from "axios";

export class ReservationService extends RequestAdapter {
  constructor() {
    super();
  }

  public async postReservation(
    body: IFormFieldSchema
  ): Promise<AxiosResponse<BaseResponse<SnapResponse>>> {
    try {
      const response = await this.sendPostRequest<
        IFormFieldSchema,
        AxiosResponse<BaseResponse<SnapResponse>>
      >(`/reservation`, body);

      return response?.data;
    } catch (error) {
      throw error;
    }
  }
}
