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

const applicantRouter = express.Router();

applicantRouter.post("/", validate(applicantSchema), createApplicantController);
applicantRouter.get("/", getApplicantsController);
applicantRouter.get("/:id", getApplicantByIdController);
applicantRouter.put(
  "/:id",
  validate(applicantSchema),
  updateApplicantController
);
applicantRouter.delete("/:id", destroyApplicantController);

export default applicantRouter;
