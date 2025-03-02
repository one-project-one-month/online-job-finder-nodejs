import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  destroyUserController,
  getUserSavedJobsController,
} from "./user.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";
import upload from "../../middleware/multer.js";

const userRouter = express.Router();

userRouter.post(
  "/",
  authenticateToken,
  upload.single("profilePhoto"),
  createUserController
);
userRouter.get("/", authenticateToken, getAllUsersController);
userRouter.get(
  "/:id",
  authenticateToken,
  adminMiddleware,
  getUserByIdController
);
userRouter.get("/saves", authenticateToken, getUserSavedJobsController);
userRouter.get("/:id", authenticateToken, destroyUserController);

export default userRouter;
