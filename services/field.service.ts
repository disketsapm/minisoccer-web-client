import { BaseResponse } from "@/interfaces/global.interface";
import { RequestAdapter } from "./request-adapter.service";
import {
  IField,
  ISchedule,
} from "@/app/(root)/reservation/type/reservation.type";

export class FieldService extends RequestAdapter {
  constructor() {
    super();
  }

  public async getListField() {
    try {
      const { data } = await this.sendGetRequest<BaseResponse<IField[]>>(
        `/field`
      );

      return data || "";
    } catch (error) {
      throw error;
    }
  }

  public async getFieldDetail({
    params,
  }: {
    params?: {
      _id: string | undefined;
    };
  }) {
    try {
      const { data } = await this.sendGetRequest<BaseResponse<IField>>(
        `/field`,
        params
      );

      return data || "";
    } catch (error) {
      throw error;
    }
  }

  public async getSchedule({
    params,
  }: {
    params?: {
      search: string | undefined;
      _id?: string | undefined;
      priceBelow?: number | undefined;
    };
  }) {
    try {
      const { data } = await this.sendGetRequest<BaseResponse<ISchedule[]>>(
        `/schedule`,
        params
      );

      return data || "";
    } catch (error) {
      throw error;
    }
  }

  public async getScheduleById({
    params,
  }: {
    params?: {
      search: string | undefined;
      _id?: string | undefined;
    };
  }) {
    try {
      const { data } = await this.sendGetRequest<BaseResponse<ISchedule>>(
        `/schedule`,
        params
      );

      return data?.data || "";
    } catch (error) {
      throw error;
    }
  }
}
