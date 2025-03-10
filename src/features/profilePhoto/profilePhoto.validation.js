import { object, string } from "zod";

export const profilePhotoSchema = object({
  filePath: string({
    required_error: "filePath is required",
  })
    .url("Invalid URL format")
    .optional(),
});
