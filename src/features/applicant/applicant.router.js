import express from "express";
import {
  createApplicantController,
  getApplicantsController,
  getApplicantByIdController,
  updateApplicantController,
  destroyApplicantController,
} from "./applicant.controller.js";
import validate from "../../middleware/validate.js";
import { applicantSchema } from "./applicant.validation.js";
import authenticateToken from "../../middlewares/authMiddleware.js";

const applicantRouter = express.Router();

applicantRouter.post(
  "/",
  validate(applicantSchema),
  authenticateToken,
  createApplicantController
);
applicantRouter.get("/", getApplicantsController);
applicantRouter.get("/:id", getApplicantByIdController);
applicantRouter.put(
  "/:id",
  validate(applicantSchema),
  authenticateToken,
  updateApplicantController
);
applicantRouter.delete("/:id", authenticateToken, destroyApplicantController);

export default applicantRouter;
