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

  public async getDetailReservation({ _id }: { _id: string | undefined }) {
    try {
      const response = await this.sendGetRequest<BaseResponse<IOrderHistory>>(
        `/reservation`,
        {
          _id,
        }
      );

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  public async getReservation({ search }: { search?: string }) {
    try {
      const response = await this.sendGetRequest<BaseResponse<IOrderHistory[]>>(
        `/reservation`,
        {
          search,
          filterType: "desc",
          columnName: "createdAt",
        }
      );

      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  public async putAfterPayment(body: { order_id: string }) {
    try {
      const response = await this.sendPutRequest<
        { order_id: string },
        AxiosResponse<any>
      >(`/reservation/payment`, body);

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async rescheduleReservation(body: {
    order_id: string;
    original_schedule_id: string;
    reschedule_schedule_id: string;
  }) {
    try {
      const response = await this.sendPutRequest<
        {
          order_id: string;
          original_schedule_id: string;
          reschedule_schedule_id: string;
        },
        AxiosResponse<any>
      >(`/reservation/reschedule`, body);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
