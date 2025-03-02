import { object, string } from "zod";

export const jobSkillSchema = object({
  body: object({
    jobId: string({
      required_error: "job is required",
    }),
    skillId: string({
      required_error: "skill is required",
    }),
  }),
});
