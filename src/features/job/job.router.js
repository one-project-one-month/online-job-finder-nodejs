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
import {
  adminMiddleware,
  adminRecruiterMiddleware,
} from "../../middlewares/adminRecruiterMiddleware.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobController);
jobRouter.post(
  "/",
  authenticateToken,
  adminRecruiterMiddleware,
  validate(jobSchema),
  createJobController
);
jobRouter.put(
  "/:id",
  authenticateToken,
  adminRecruiterMiddleware,
  validate(jobSchema),
  updateJobController
);
jobRouter.delete(
  "/:id",
  authenticateToken,
  adminMiddleware,
  destoryJobController
);

jobRouter.get("/:id", getJobByIdController);

export default jobRouter;
