import { checkWeeksHaveOneDay, getWeeksOfMonth } from "@/lib/utils";
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
  })
  .refine(
    (value) => {
      if (value?.type === "Event") {
        return value.schedule_id.length === 3;
      }
      return true; // For other types, any schedule length is valid
    },
    {
      message: "Event harus memiliki 3 jadwal",
      path: ["schedule_id"],
    }
  )

  .refine(
    (value) => {
      if (value?.type === "Game") {
        return value.schedule_id.length > 0;
      }
      return true; // For other types, any schedule length is valid
    },
    {
      message: "Game harus memiliki minimal 1 jadwal",
      path: ["schedule_id"],
    }
  )
  .refine(
    (value) => {
      if (value.type === "Training") {
        const checkWeeks = checkWeeksHaveOneDay(value.schedule_id);

        if (!checkWeeks) {
          return false;
        }

        if (value?.schedule_id.length !== 4) {
          return false;
        }
      }
      return true;
    },
    {
      message:
        "Training harus memiliki 4 minggu, setiap minggu harus memiliki satu jadwal",
      path: ["schedule_id"],
    }
  );

export default FormFieldSchema;
