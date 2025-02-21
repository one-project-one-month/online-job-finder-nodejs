import { StatusCode } from "../../errors/StatusCode.js";
import {
  createJob,
  destoryJob,
  getAllJob,
  getJobById,
  updateJob,
} from "./job.service.js";

export const createJobController = async (req, res) => {
  try {
    const job = await createJob(req.body);
    res.status(StatusCode.SUCCESS).json({ data: job });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getAllJobController = async (req, res) => {
  try {
    const { q, location, category, type } = req.query;

    const filters = {
      q: q ? q.split(",") : undefined,
      location: location ? location.split(",") : undefined,
      category: category ? category.split(",") : undefined,
      type: type ? type.split(",") : undefined,
    };
    const jobs = await getAllJob(filters);
    res.json({ jobs });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getJobByIdController = async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: job });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateJobController = async (req, res) => {
  try {
    const job = await updateJob(req.body, req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: job });
  } catch (error) {
    console.log(error);

    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const destoryJobController = async (req, res) => {
  try {
    await destoryJob(req.params.id);
    res.status(StatusCode.SUCCESS).json({ message: "success" });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};
