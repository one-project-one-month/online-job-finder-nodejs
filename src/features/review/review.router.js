import express from "express";
import {
  createReviewController,
  destoryReviewController,
  getReviewController,
  updateReviewController,
} from "./review.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import validate from "../../middleware/validate.js";
import { reviewSchema } from "./review.validation.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const reviewRouter = express.Router();

reviewRouter.post(
  "/:companyId",
  validate(reviewSchema),
  authenticateToken,
  createReviewController
);

reviewRouter.put(
  "/:id",
  validate(reviewSchema),
  authenticateToken,
  adminMiddleware,
  updateReviewController
);

reviewRouter.delete("/:reviewId", authenticateToken, destoryReviewController);
reviewRouter.get("/:companyId", authenticateToken, getReviewController);

export default reviewRouter;
