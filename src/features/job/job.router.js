import express from "express";
import validate from "../../middleware/validate.js";
import { jobSchema } from "./job.validation.js";
import { getAllJobController, getJobByIdController } from "./job.controller.js";
//import authenticateToken from "../../middlewares/authMiddleware.js";
//import adminMiddleware from "../../middlewares/adminMiddleware.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobController);
jobRouter.get("/:id", getJobByIdController);

export default jobRouter;
