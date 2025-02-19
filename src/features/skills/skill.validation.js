import { object, string } from "zod";

export const skillSchema = object({
  body: object({
    name: string({
      required_error: "name field is required",
    }),
  }),
});
