import { StatusCode } from "../../errors/StatusCode.js";
import {
  createJob,
  destoryJob,
  getAllJob,
  getJobById,
  updateJob,
} from "./job.service.js";

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
