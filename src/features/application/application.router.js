import express from "express";
import {
  applyJobController,
  getSaveJobsController,
  saveJobController,
  unsaveJobController,
  updateJobStatusController,
} from "./application.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";
import validate from "../../middleware/validate.js";
import { jobApplySchema } from "./application.validation.js";

const applicationRouter = express.Router();

applicationRouter.get("/get/save", authenticateToken, getSaveJobsController);
applicationRouter.post(
  "/:id/apply",
  validate(jobApplySchema),
  authenticateToken,
  applyJobController
);
applicationRouter.post("/:id/save", authenticateToken, saveJobController);
applicationRouter.put(
  "/:id/update",
  authenticateToken,
  adminMiddleware,
  updateJobStatusController
);

applicationRouter.delete("/:id/unsave", authenticateToken, unsaveJobController);

export default applicationRouter;
