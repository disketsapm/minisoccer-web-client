import { z } from "zod";

const FormFieldSchema = z.object({
  field_id: z.string({
    required_error: "Lapangan harus diisi",
  }),
  type: z.string({
    required_error: "Jenis reservasi harus diisi",
  }),
  schedule_id: z
    .array(
      z.string({
        required_error: "Jadwal harus diisi",
      })
    )
    .min(1, "Minimal satu jadwal harus dipilih"),
});

export default FormFieldSchema;
