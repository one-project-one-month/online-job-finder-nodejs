import express from "express";
import {
  authUserController,
  loginController,
  registerController,
} from "./auth.controller.js";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
} from "./auth.vaidation.js";
import validate from "../../middleware/validate.js";
import { changePasswordController } from "./auth.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", validate(registerSchema), registerController);
authRouter.post("/signin", validate(loginSchema), loginController);
authRouter.get("/me", authenticateToken, authUserController);
authRouter.post(
  "/passowrd/change ",
  validate(changePasswordSchema),
  authenticateToken,
  changePasswordController
);

export default authRouter;
