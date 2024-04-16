export type IScheduleHistory = {
  schedule_id: string;
  field_id: string;
  name: string;
  price: number;
  status: boolean;
  _id: string;
};

export type IOrderHistory = {
  _id: string;
  referenceNumber: string;
  type: string;
  total: number;
  orderStatus: string;
  paymentStatus: string;
  proofOfPayment: any; // Change 'any' to the correct type if it's known
  user_id: string;
  additional_items: any[]; // Change 'any[]' to the correct type if it's known
  schedules: IScheduleHistory[];
  updatedAt: string;
  createdAt: string;
  snap_url: string;
  __v: number;
};
