import express from "express";
import {
  createApplicantSkillController,
  deleteApplicantSkillController,
  getApplicantSkillByIdController,
  getApplicantSkillController,
  updateApplicantSkillController,
} from "./applicant_skill.controller.js";
import validate from "../../middleware/validate.js";
import { applicantSkillSchema } from "./applicant_skill.validation.js";
import authenticateToken from "../../middlewares/authMiddleware.js";

const applicantSkillRouter = express.Router();

applicantSkillRouter.post(
  "/",
  validate(applicantSkillSchema),
  authenticateToken,
  createApplicantSkillController
);
applicantSkillRouter.get("/", authenticateToken, getApplicantSkillController);
applicantSkillRouter.get(
  "/:id",
  authenticateToken,
  getApplicantSkillByIdController
);
applicantSkillRouter.put(
  "/:id",
  validate(applicantSkillSchema),
  authenticateToken,
  updateApplicantSkillController
);
applicantSkillRouter.delete(
  "/:id",
  authenticateToken,
  deleteApplicantSkillController
);

export default applicantSkillRouter;
