import express from "express";
import {
  createResumeController,
  getResumesController,
  getResumeByIdController,
  updateResumeController,
  destroyResumeController,
} from "./resumes.controller.js";
import validate from "../../middleware/validate.js";
import { resumeSchema } from "./resumes.validation.js";
import authenticateToken from "../../middlewares/authMiddleware.js";

const resumeRouter = express.Router();

resumeRouter.post(
  "/",
  validate(resumeSchema),
  authenticateToken,
  createResumeController
);
resumeRouter.get("/", getResumesController);
resumeRouter.get("/:id", getResumeByIdController);
resumeRouter.put(
  "/:id",
  validate(resumeSchema),
  authenticateToken,
  updateResumeController
);
resumeRouter.delete("/:id", authenticateToken, destroyResumeController);

export default resumeRouter;
