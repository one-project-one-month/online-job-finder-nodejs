import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  destroyUserController,
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
userRouter.delete("/:id", authenticateToken, destroyUserController);

export default userRouter;
