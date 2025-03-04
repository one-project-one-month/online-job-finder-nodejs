import { boolean, number, object, string } from "zod";

export const userSchema = object({
  body: object({
    username: string({
      required_error: "Username field is required",
    }),
    email: string({
      required_error: "Email field is required",
    }).email("Invalid email format"),
    password: string({
      required_error: "Password field is required",
    }).min(6, "Password must be at least 6 characters"),
    roleId: number({
      required_error: "Role ID is required",
    }),
    isInformationCompleted: boolean({
      required_error: "isInformationCompleted field is required",
    }),
  }),
});
