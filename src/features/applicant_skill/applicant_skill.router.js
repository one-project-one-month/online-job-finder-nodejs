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
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const applicantSkillRouter = express.Router();

applicantSkillRouter.post(
  "/",
  validate(applicantSkillSchema),
  adminMiddleware,
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
  adminMiddleware,
  updateApplicantSkillController
);
applicantSkillRouter.delete(
  "/:id",
  authenticateToken,
  adminMiddleware,
  deleteApplicantSkillController
);

export default applicantSkillRouter;
