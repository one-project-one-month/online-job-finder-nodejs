import { object, string } from "zod";

export const resumeSchema = object({
  filePath: string({
    required_error: "filePath is required",
  }).url("Invalid URL format"),
});
