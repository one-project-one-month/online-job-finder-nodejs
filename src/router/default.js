import express from "express";
import applicantRouter from "../features/applicant/applicant.router.js";
import authRouter from "../features/auth/auth.router.js";
import resumeRouter from "../features/resumes/resumes.router.js";

const route = express.Router();

route.use("/auth", authRouter);
route.use("/me", applicantRouter);
route.use("/resumes", resumeRouter);

export default route;
