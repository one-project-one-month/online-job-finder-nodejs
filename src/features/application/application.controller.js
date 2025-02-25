import { StatusCode } from "../../errors/StatusCode.js";
import {
  applyJob,
  getSaveJobs,
  saveJob,
  unsaveJob,
  updateJobStatus,
} from "./application.service.js";

export const applyJobController = async (req, res) => {
  try {
    const data = { ...req.body, jobId: req.params.id };
    if (!data.applicantId) {
      data.applicantId = "default-applicant-id";
    }
    const job = await applyJob(data, req);
    res.status(StatusCode.SUCCESS).json({ data: job });
  } catch (error) {
    console.log(error);

    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getSaveJobsController = async (req, res) => {
  try {
    const jobs = await getSaveJobs(req);
    res.status(StatusCode.SUCCESS).json({ data: jobs });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const saveJobController = async (req, res) => {
  try {
    const data = { ...req.body, jobId: req.params.id };

    if (!data.applicantId) {
      data.applicantId = "default-applicant-id";
    }
    const job = await saveJob(data, req);
    res.status(StatusCode.SUCCESS).json({ data: job });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const unsaveJobController = async (req, res) => {
  try {
    await unsaveJob(req.params.id);
    res.status(StatusCode.SUCCESS).json({ message: "unsave" });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateJobStatusController = async (req, res) => {
  try {
    const data = { ...req.body, jobId: req.params.id };
    const job = await updateJobStatus(data);
    res.status(StatusCode.SUCCESS).json({ data: job });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};
