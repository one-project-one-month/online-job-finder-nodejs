// for user route
import express from "express";
import {
  getAllUsersAccountController,
  getUserAccountByIdController,
} from "./user.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", authenticateToken, getAllUsersAccountController);
userRouter.get(
  "/:id",
  authenticateToken,
  adminMiddleware,
  getUserAccountByIdController
);

export default userRouter;
