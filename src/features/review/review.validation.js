import { number, object, string } from "zod";

export const reviewSchema = object({
  body: object({
    companyId: string({
      required_error: "company field is required",
    }),
    rating: number({
      required_error: "You should provide a rating",
    }),
    comment: string({
      required_error: "You must provide a comment",
    }),
  }),
});
