import express from "express";
import {
  createJobSkillController,
  getJobSkillByIdController,
  getJobsSkillController,
} from "./job_skill.controller.js";
import validate from "../../middleware/validate.js";
import { jobSkillSchema } from "./job_skill.validation.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const jobSkillRouter = express.Router();

jobSkillRouter.post(
  "/",
  validate(jobSkillSchema),
  authenticateToken,
  adminMiddleware,
  createJobSkillController
);
jobSkillRouter.get("/", authenticateToken, getJobsSkillController);
jobSkillRouter.get("/:id", authenticateToken, getJobSkillByIdController);

export default jobSkillRouter;
