import { object, string } from "zod";

export const applicantSkillSchema = object({
  body: object({
    skillId: string({
      required_error: "skill name is required",
    }),
  }),
});
