import express from "express";
import applicantRouter from "../features/applicant/applicant.router.js";
import authRouter from "../features/auth/auth.router.js";
import recruiterRouter from "../features/recruiter/recruiter.route.js";
import locationRouter from "../features/locations/location.route.js";
import skillRouter from "../features/skills/skill.route.js";
import jobCategoryRouter from "../features/job_category/job_category.router.js";


const route = express.Router();

route.use("/auth", authRouter);
route.use("/applicants", applicantRouter);
route.use("/recruiter", recruiterRouter);

export default route;
