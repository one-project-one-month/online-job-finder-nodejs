import { object, string } from "zod";

export const jobCategoriesSchema = object({
  body: object({
    industry: string({
      required_error: "name field is required",
    }),
  }),
});
