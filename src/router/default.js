import express from "express";
import applicantRouter from "../features/applicant/applicant.router.js";
import resumeRouter from "../features/resumes/resumes.router.js";
import skillRouter from "../features/skills/skill.route.js";
import jobRouter from "../features/job/job.router.js";
import applicationRouter from "../features/application/application.router.js";
import userRouter from "../features/user/user.route.js";
import applicantSkillRouter from "../features/applicant_skill/applicant_skill.router.js";
import jobSkillRouter from "../features/job_skill/job_skill.router.js";
import reviewRouter from "../features/review/review.router.js";
import applicationExperienceRouter from "../features/ApplicantExperience /application.router.js";

import authRouter from "../features/auth/auth.router.js";
import recruiterRouter from "../features/recruiter/recruiter.route.js";
import locationRouter from "../features/locations/location.route.js";
import jobCategoryRouter from "../features/job_category/job_category.router.js";
import socialMediaRouter from "../features/social/social.router.js";

const route = express.Router();

route.use("/auth", authRouter);
route.use("/me", applicantRouter);
route.use("/resumes", resumeRouter);
route.use("/recruiter", recruiterRouter);
route.use("/location", locationRouter);
route.use("/skill", skillRouter);
route.use("/job_category", jobCategoryRouter);
route.use("/jobs", jobRouter);
route.use("/jobs", applicationRouter);
route.use("/accounts", userRouter);
route.use("/applicant/skill", applicantSkillRouter);
route.use("/job/skill", jobSkillRouter);
route.use("/review", reviewRouter);
route.use("/application/experience", applicationExperienceRouter);
route.use("/social_media", socialMediaRouter);

export default route;
