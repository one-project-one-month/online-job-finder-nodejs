import express from "express";
import {
  createJobCategoryController,
  destoryJobCategoryController,
  getJobCategoryByIdController,
  getJobCategoryController,
  updateJobCategoryController,
} from "./job_category.controller.js";
import validate from "../../middleware/validate.js";
import { jobCategoriesSchema } from "./job_category.validation.js";

const jobCategoryRouter = express.Router();

jobCategoryRouter.post(
  "/",
  validate(jobCategoriesSchema),
  createJobCategoryController
);
jobCategoryRouter.get("/", getJobCategoryController);
jobCategoryRouter.get("/:id", getJobCategoryByIdController);
jobCategoryRouter.put(
  "/:id",
  validate(jobCategoriesSchema),
  updateJobCategoryController
);
jobCategoryRouter.delete("/:id", destoryJobCategoryController);

export default jobCategoryRouter;
