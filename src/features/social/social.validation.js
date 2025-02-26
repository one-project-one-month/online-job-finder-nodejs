import { object, string } from "zod";

export const socialMediaSchema = object({
  body: object({
    link: string({
      required_error: "link field is required",
    })
  }),
});