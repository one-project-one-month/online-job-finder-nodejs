import express from "express";
import {
  createApplicationExperienceController,
  destoryApplicationExperienceController,
  getApplicationExperienceByIdController,
  getApplicationExperienceController,
  updateApplicationExperienceController,
} from "./application.controller.js";
import validate from "../../middleware/validate.js";
import { applicantCategorySchema } from "./application.validation.js";
import authenticateToken from "../../middlewares/authMiddleware.js";

const applicationExperienceRouter = express.Router();

applicationExperienceRouter.post(
  "/",
  authenticateToken,
  validate(applicantCategorySchema),
  createApplicationExperienceController
);
applicationExperienceRouter.get("/", getApplicationExperienceController);
applicationExperienceRouter.get("/:id", getApplicationExperienceByIdController);
applicationExperienceRouter.put(
  "/:id",
  validate(applicantCategorySchema),
  authenticateToken,
  updateApplicationExperienceController
);
applicationExperienceRouter.delete(
  "/:id",
  authenticateToken,
  destoryApplicationExperienceController
);

export default applicationExperienceRouter;
