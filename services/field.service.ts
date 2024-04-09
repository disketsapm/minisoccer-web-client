import { BaseResponse } from "@/interfaces/global.interface";
import { RequestAdapter } from "./request-adapter.service";

export class FieldService extends RequestAdapter {
  constructor() {
    super();
  }

  public async getListField({
    params,
  }: {
    params?: {
      _id: string | undefined;
    };
  }) {
    try {
      const { data } = await this.sendGetRequest<BaseResponse<any>>(
        `/field`,
        params
      );

      return data || "";
    } catch (error) {
      throw error;
    }
  }
}
