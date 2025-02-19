import express from "express";
import authRouter from "../features/auth/auth.router.js";
import locationRouter from "../features/locations/location.route.js";
import skillRouter from "../features/skills/skill.route.js";
import jobCategoryRouter from "../features/job_category/job_category.router.js";
import jobRouter from "../features/job/job.router.js";

const route = express.Router();

route.use("/auth", authRouter);
route.use("/location", locationRouter);
route.use("/skill", skillRouter);
route.use("/job_category", jobCategoryRouter);
route.use("/jobs", jobRouter);

export default route;
