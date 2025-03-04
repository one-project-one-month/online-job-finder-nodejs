import express from "express";
import {
  updateUserController,
  getAllUsersController,
  getUserByIdController,
  destroyUserController,
  getUserSavedJobsController,
} from "./user.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";
import { userSchema } from "./user.validation.js";
import validate from "../../middleware/validate.js";

const userRouter = express.Router();

userRouter.put(
  "/:id",
  validate(userSchema),
  authenticateToken,
  updateUserController
);
userRouter.get("/", authenticateToken, getAllUsersController);
userRouter.get(
  "/:id",
  authenticateToken,
  adminMiddleware,
  getUserByIdController
);
userRouter.get("/saves", authenticateToken, getUserSavedJobsController);
userRouter.delete("/:id", authenticateToken, destroyUserController);

export default userRouter;
