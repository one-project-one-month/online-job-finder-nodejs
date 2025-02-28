import { object, string } from "zod";

export const jobApplySchema = object({
  body: object({
    resumeId: string({
      required_error: "You must boe upload your resume",
    }),
  }),
});
