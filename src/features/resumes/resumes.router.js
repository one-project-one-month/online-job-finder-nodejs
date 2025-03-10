import express from "express";
import {
  createResumeController,
  getResumesByUserIdController,
  getResumeByIdController,
  destroyResumeController,
} from "./resumes.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import upload from "../../middleware/multer.js";

const resumeRouter = express.Router();

resumeRouter.post(
  "/",
  authenticateToken,
  upload.single("resume"),
  createResumeController
);
resumeRouter.get("/", authenticateToken, getResumesByUserIdController);
resumeRouter.get("/:id", getResumeByIdController);
resumeRouter.delete("/:id", authenticateToken, destroyResumeController);

export default resumeRouter;
