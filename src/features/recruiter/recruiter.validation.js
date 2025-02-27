import { object, string } from "zod";

export const companyProfileSchema = object({
  body: object({
    companyName: string({
      required_error: "Company name is required",
    }),
    phone: string({
      required_error: "Phone number is required",
      // pattern: /^\+\d{1,}-\d{1,}-\d{1,}-\d{1,}$/,
      // message: "Invalid phone number format",
    }),
  }),
});