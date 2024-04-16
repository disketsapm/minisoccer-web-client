import { BaseResponse } from "@/interfaces/global.interface";
import { RequestAdapter } from "./request-adapter.service";
import {
  IField,
  IFormFieldSchema,
  ISchedule,
  SnapResponse,
} from "@/app/(root)/reservation/type/reservation.type";
import { AxiosResponse } from "axios";
import { IOrderHistory } from "@/app/(root)/auth/me/type/history.type";

export class ReservationService extends RequestAdapter {
  constructor() {
    super();
  }

  public async postReservation(body: IFormFieldSchema) {
    try {
      const response = await this.sendPostRequest<
        IFormFieldSchema,
        AxiosResponse<any>
      >(`/reservation`, body);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getReservation() {
    try {
      const response = await this.sendGetRequest<BaseResponse<IOrderHistory[]>>(
        `/reservation`
      );

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  public async putAfterPayment(body: { orderId: string }) {
    try {
      const response = await this.sendPutRequest<
        { orderId: string },
        AxiosResponse<any>
      >(`/reservation/payment`, body);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
