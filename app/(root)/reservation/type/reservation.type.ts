export type ISchedule = {
  _id: string;
  date: string;
  timeStart: Date;
  timeEnd: Date;
  price: number;
  status: "Available" | "Maintenance" | "Unavailable";
  venue_id: string;
  updatedAt: Date;
  scheduleBoardId: string;
  createdAt: Date;
  session: string;
  __v: number;
};

type YardFacility = {
  iconId: string;
  name: string;
  _id: string;
};

type Asset = {
  url: string;
  _id: string;
};

type YardScheduleId = string;

export type IField = {
  _id: string;
  yardName: string;
  yardCapacity: number;
  yardSize: string;
  yardFacilities: YardFacility[];
  yardLocationUrl: string;
  isPublished: boolean;
  assets: Asset[];
  schedule_id: YardScheduleId[];
  additional_item: any[]; // Change `any[]` to the appropriate type if possible
  __v: number;
};
