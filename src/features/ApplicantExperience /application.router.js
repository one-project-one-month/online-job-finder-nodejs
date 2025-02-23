import express from "express";
import { createApplicationExperienceController } from "./application.controller.js";
import validate from "../../middleware/validate.js";
import { applicantCategorySchema } from "./application.validation.js";

const applicationExperienceRouter = express.Router();

applicationExperienceRouter.post(
  "/",
  validate(applicantCategorySchema),
  createApplicationExperienceController
);

export default applicationExperienceRouter;
