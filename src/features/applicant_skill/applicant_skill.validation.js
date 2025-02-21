import { object, string } from "zod";

export const applicantSkillSchema = object({
  body: object({
    applicantId: string({
      required_error: "applicant profile is required",
    }),
    skillId: string({
      required_error: "skill name is required",
    }),
  }),
});
