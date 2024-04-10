import { z } from "zod";

const FormFieldSchema = z.object({
  field: z.string({
    required_error: "Lapangan harus diisi",
  }),
  type: z.string({
    required_error: "Jenis reservasi harus diisi",
  }),
});

export default FormFieldSchema;
