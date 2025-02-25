import express from "express";
import {
  authUserController,
  authUserSkillController,
  loginController,
  registerController,
} from "./auth.controller.js";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
} from "./auth.validation.js";
import validate from "../../middleware/validate.js";
import { changePasswordController } from "./auth.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.get("/me", authenticateToken, authUserController);
authRouter.get("/me/skills", authenticateToken, authUserSkillController);
authRouter.post("/signup", validate(registerSchema), registerController);
authRouter.post("/signin", validate(loginSchema), loginController);
authRouter.post(
  "/change/password",
  validate(changePasswordSchema),
  authenticateToken,
  changePasswordController
);

export default authRouter;
