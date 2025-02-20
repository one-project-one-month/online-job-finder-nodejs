import express from "express";
import validate from "../../middleware/validate.js";
import { jobSchema } from "./job.validation.js";
import {
  createJobController,
  destoryJobController,
  getAllJobController,
  getJobByIdController,
  updateJobController,
} from "./job.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const jobRouter = express.Router();

jobRouter.post(
  "/",
  validate(jobSchema),
  authenticateToken,
  adminMiddleware,
  createJobController
);
jobRouter.get("/", getAllJobController);
jobRouter.get("/:id", getJobByIdController);
jobRouter.put(
  "/:id",
  validate(jobSchema),
  authenticateToken,
  adminMiddleware,
  updateJobController
);
jobRouter.delete(
  "/:id",
  authenticateToken,
  adminMiddleware,
  destoryJobController
);

export default jobRouter;
