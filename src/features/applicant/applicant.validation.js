import { object, string } from "zod";

export const applicantSchema = object({
  body: object({
    fullName: string({
      required_error: "full name field is required",
    }),
    phone: string({
      required_error: "phone field is required",
    }),
  }),
});
