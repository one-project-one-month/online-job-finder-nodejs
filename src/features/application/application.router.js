import express from "express";
import {
  applyJobController,
  saveJobController,
  updateJobStatusController,
} from "./application.controller.js";

const applicationRouter = express.Router();

applicationRouter.post("/:id/apply", applyJobController);
applicationRouter.post("/:id/save", saveJobController);
applicationRouter.put("/:id/update", updateJobStatusController);

export default applicationRouter;
