import { boolean, date, object, string } from "zod";

export const applicantCategorySchema = object({
  body: object({
    applicantId: string({
      required_error: "applicant is required",
    }),
    companyName: string({
      required_error: "industry is required",
    }),
    title: string({
      required_error: "location is required",
    }),
    jobType: string({
      required_error: "jobType is required",
    }),
    startDate: date({
      required_error: "location is required",
    }),
    currentlyWorking: boolean({
      required_error: "currently working is required",
    }),
  }),
});
