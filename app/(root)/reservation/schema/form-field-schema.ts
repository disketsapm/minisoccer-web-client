import {
  checkWeeksHaveOneDay,
  checkWeeksHaveOneDayBasedOnDate,
  getWeeksOfMonth,
} from "@/lib/utils";
import { z } from "zod";

const ScheduleSchema = z.object({
  id: z.string({
    required_error: "Schedule ID harus diisi",
  }),
  startDate: z.date({
    required_error: "Start Date harus diisi",
  }),
  endDate: z.date({
    required_error: "End Date harus diisi",
  }),
});

const FormFieldSchema = z
  .object({
    field_id: z.string({
      required_error: "Lapangan harus diisi",
    }),
    type: z.string({
      required_error: "Jenis reservasi harus diisi",
    }),
    schedule_id: z.array(ScheduleSchema),
    reservation_type: z.string().optional().nullable(),
    startDateReschedule: z.date().optional().nullable(),
  })
  .refine(
    (value) => {
      if (value?.type === "Event" && value?.reservation_type !== "reschedule") {
        return value.schedule_id.length >= 2;
      }

      if (value?.type === "Event" && value?.reservation_type === "reschedule") {
        return value?.schedule_id.length === 1;
      }

      return true; // For other types, any schedule length is valid
    },
    {
      message: "Event harus memiliki minimal 2 jadwal",
      path: ["schedule_id"],
    },
  )

  .refine(
    (value) => {
      if (value?.type === "Game" && value?.reservation_type !== "reschedule") {
        return value.schedule_id.length > 0;
      }

      if (value?.type === "Game" && value?.reservation_type === "reschedule") {
        return value?.schedule_id.length === 1;
      }

      return true; // For other types, any schedule length is valid
    },
    {
      message: "Game harus memiliki minimal 1 jadwal",
      path: ["schedule_id"],
    },
  )
  .refine(
    (value) => {
      //FIXME: uncomment this code for unable to submit training if not have 4 weeks
      // if (
      //   value.type === "Training" &&
      //   value.reservation_type !== "reschedule"
      // ) {
      // //   const checkWeeks = checkWeeksHaveOneDay(value.schedule_id);
      //
      //   if (!checkWeeks) {
      //     return false;
      //   }
      //
      //   if (value?.schedule_id.length !== 4) {
      //     return false;
      //   }
      // }
      //
      // if (
      //   value.type === "Training" &&
      //   value.reservation_type === "reschedule"
      // ) {
      //   const checkWeeks = checkWeeksHaveOneDayBasedOnDate(
      //     value.schedule_id,
      //     value?.startDateReschedule as Date,
      //   );
      //
      //   console.log(checkWeeks);
      //
      //   if (!checkWeeks) {
      //     return false;
      //   }
      //
      //   if (value?.schedule_id.length > 1) {
      //     return false;
      //   }
      // }

      if (
        value?.type === "Training" &&
        value?.reservation_type !== "reschedule"
      ) {
        return value.schedule_id.length >= 4;
      }

      if (
        value?.type === "Training" &&
        value?.reservation_type === "reschedule"
      ) {
        return value?.schedule_id.length === 1;
      }

      return true; // For other types, any schedule length is valid
    },
    {
      message: "Training harus memiliki minimal 1 jadwal",
      path: ["schedule_id"],
    },
  );

export default FormFieldSchema;
