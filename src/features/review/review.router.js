import express from "express";
import {
  createReviewController,
  destoryReviewController,
  updateReviewController,
} from "./review.controller.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import validate from "../../middleware/validate.js";
import { reviewSchema } from "./review.validation.js";
import { updateReview } from "./review.service.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const reviewRouter = express.Router();

reviewRouter.post(
  "/",
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

reviewRouter.delete("/:id", authenticateToken, destoryReviewController);

export default reviewRouter;
