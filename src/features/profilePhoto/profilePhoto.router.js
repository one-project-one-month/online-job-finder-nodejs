import express from "express";
import authenticateToken from "../../middlewares/authMiddleware.js";
import {
  createProfilePhotoController,
  destroyProfilePhotoController,
  getProfilePhotoByUserIdController,
} from "./profilePhoto.controller.js";
import upload from "../../middleware/multer.js";

const profilePhotoRouter = express.Router();

profilePhotoRouter.put(
  "/:id",
  authenticateToken,
  upload.single("profilePhoto"),
  createProfilePhotoController
);
profilePhotoRouter.get("/:id", getProfilePhotoByUserIdController);
profilePhotoRouter;
profilePhotoRouter.delete(
  "/",
  authenticateToken,
  destroyProfilePhotoController
);

export default profilePhotoRouter;
