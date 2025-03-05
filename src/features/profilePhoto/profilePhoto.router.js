import express from "express";
import authenticateToken from "../../middlewares/authMiddleware.js";
import {
  createProfilePhotoController,
  destroyProfilePhotoController,
  getProfilePhotoByUserIdController,
} from "./profilePhoto.controller.js";
import upload from "../../middleware/multer.js";

const profilePhotoRouter = express.Router();

profilePhotoRouter.post(
  "/",
  authenticateToken,
  upload.single("profilePhoto"),
  createProfilePhotoController
);
profilePhotoRouter.get("/:id", getProfilePhotoByUserIdController);
profilePhotoRouter;
profilePhotoRouter.delete(
  "/:id",
  authenticateToken,
  destroyProfilePhotoController
);

export default profilePhotoRouter;
