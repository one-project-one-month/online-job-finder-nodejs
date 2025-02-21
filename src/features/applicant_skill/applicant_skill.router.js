import express from "express";
import {
  createApplicantSkillController,
  getApplicantSkillController,
} from "./applicant_skill.controller.js";

const applicantSkillRouter = express.Router();

applicantSkillRouter.post("/", createApplicantSkillController);
applicantSkillRouter.get("/", getApplicantSkillController);

export default applicantSkillRouter;
