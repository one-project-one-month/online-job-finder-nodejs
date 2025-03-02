import { StatusCode } from "../../errors/StatusCode.js";
import { createReview, destoryReview, updateReview } from "./review.service.js";

export const createReviewController = async (req, res) => {
  try {
    const review = await createReview(req.body, req);
    res.status(StatusCode.SUCCESS).json({
      data: review,
    });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

export const updateReviewController = async (req, res) => {
  try {
    const review = await updateReview(req.params.id, req.body);
    res.status(StatusCode.SUCCESS).json({
      data: review,
    });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

export const destoryReviewController = async (req, res) => {
  try {
    await destoryReview(req.params.id, req);
    res.status(StatusCode.SUCCESS).json({ message: "success" });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};
