import express from "express";
import applicantRouter from "../features/applicant/applicant.router.js";
import authRouter from "../features/auth/auth.router.js";

const route = express.Router();

route.use("/auth", authRouter);
route.use("/applicants", applicantRouter);

export default route;
