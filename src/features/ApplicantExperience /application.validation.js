import { boolean, date, object, string } from "zod";

export const applicantCategorySchema = object({
  body: object({
    companyName: string({
      required_error: "industry is required",
    }),
    title: string({
      required_error: "location is required",
    }),
    jobType: string({
      required_error: "jobType is required",
    }),
    location: string({
      required_error: "location is required",
    }),
    currentlyWorking: boolean({
      required_error: "currently working is required",
    }),
  }),
});
