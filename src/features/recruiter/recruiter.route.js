import express from "express";
import { destroyRecruiterController, getRecruiterByIdController, getRecruiterController, recruiterCreateController, updateRecruiterController } from "./recruiter.controller.js";
import { companyProfileSchema } from "./recruiter.validation.js";
import validate from "../../middleware/validate.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const recruiterRouter = express.Router();

recruiterRouter.get("/", getRecruiterController);
recruiterRouter.post(
  "/",
  validate(companyProfileSchema),
  authenticateToken,
  adminMiddleware,
  recruiterCreateController
);
recruiterRouter.get('/:id', getRecruiterByIdController);
recruiterRouter.put('/:id',
  validate(companyProfileSchema),
  authenticateToken,
  adminMiddleware,
  updateRecruiterController
)
recruiterRouter.delete('/:id', authenticateToken, destroyRecruiterController);

export default recruiterRouter;