import { number, object, string } from "zod";

export const jobSchema = object({
  body: object({
    title: string({
      required_error: "name field is required",
    }),
    jobCategoryId: string({
      required_error: "job category field is required",
    }),
    locationId: string({
      required_error: "location field is required",
    }),
    type: string({
      required_error: "type field is required",
    }),
    requirements: string({
      required_error: "requirements field is required",
    }),
    numOfPosts: number({
      required_error: "number of posts field is required",
    }),
    salary: number({
      required_error: "salary  field is required",
    }),
    status: string({
      required_error: "job status  field is required",
    }),
  }),
});
