import express from "express";
// import authenticateToken from "../../middlewares/authMiddleware.js";
import { getRecruiterController } from "./recruiter.controller.js";

const recruiterRouter = express.Router();

recruiterRouter.get("/recruiters", getRecruiterController);

export default recruiterRouter;