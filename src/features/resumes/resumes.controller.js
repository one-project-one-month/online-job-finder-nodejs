import { StatusCode } from "../../errors/StatusCode.js";
import {
  createResume,
  getResumesByUserId,
  getResumeById,
  destroyResume,
} from "./resumes.service.js";

export const createResumeController = async (req, res) => {
  try {
    const resume = await createResume(req.body, req);
    res.status(StatusCode.SUCCESS).json({ data: resume });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const getResumesByUserIdController = async (req, res) => {
  try {
    const resumes = await getResumesByUserId(req);
    res.status(StatusCode.SUCCESS).json({ data: resumes });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const getResumeByIdController = async (req, res) => {
  try {
    const resume = await getResumeById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: resume });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const destroyResumeController = async (req, res) => {
  try {
    await destroyResume(req.params.id);
    res.status(StatusCode.SUCCESS).json({ status: "success" });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};
