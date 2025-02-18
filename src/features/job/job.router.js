import express from "express";
import validate from "../../middleware/validate.js";
import { jobSchema } from "./job.validation.js";
import { createJobController, getAllJobController } from "./job.controller.js";

const jobRouter = express.Router();

jobRouter.post("/", validate(jobSchema), createJobController);
jobRouter.get("/", getAllJobController);

export default jobRouter;
