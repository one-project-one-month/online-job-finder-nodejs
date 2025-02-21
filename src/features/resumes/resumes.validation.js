import { object, string } from "zod";

export const resumeSchema = object({
  body: object({
    filePath: string({
      required_error: "file path field is required",
    }),
  }),
});
