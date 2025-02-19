import { StatusCode } from "../../errors/StatusCode.js";
import {
  createJobCategory,
  destoryJobCategory,
  getJobCategory,
  getJobCategoryById,
  updateJobCategory,
} from "./job_category.service.js";

export const createJobCategoryController = async (req, res) => {
  try {
    const jobCategory = await createJobCategory(req.body);
    res.status(StatusCode.SUCCESS).json({ data: jobCategory });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getJobCategoryController = async (req, res) => {
  try {
    const jobCategories = await getJobCategory();
    res.status(StatusCode.SUCCESS).json({ data: jobCategories });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getJobCategoryByIdController = async (req, res) => {
  try {
    const jobCategory = await getJobCategoryById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: jobCategory });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateJobCategoryController = async (req, res) => {
  try {
    const jobCategory = await updateJobCategory(req.params.id, req.body);
    res.status(StatusCode.SUCCESS).json({ data: jobCategory });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const destoryJobCategoryController = async (req, res) => {
  try {
    await destoryJobCategory(req.params.id);
    res.status(StatusCode.SUCCESS).json({ messag: "success" });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};
