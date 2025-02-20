import { StatusCode } from "../../errors/StatusCode.js";
import { createRecruiter, destroyRecruiter, getRecruiterById, getRecruiters, updateRecruiter } from "./recruiter.service.js";

export const getRecruiterController = async (req, res) => {
  try {
    const recruiters = await getRecruiters();
    res.status(StatusCode.SUCCESS).json({ status: "success", data: recruiters });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ status: "error", error: error.message });
  }
}

export const recruiterCreateController = async (req, res) => {
  try {
    const recruiter = await createRecruiter(req.body);
    res.status(StatusCode.SUCCESS).json({ status: "success", data: recruiter });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ status: "error", error: error.message });
  }
};

export const getRecruiterByIdController = async (req, res) => {
  try {
    const recruiter = await getRecruiterById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ status: "success", data: recruiter });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ status: "error", error: error.message });
  }
}

export const updateRecruiterController = async (req, res) => {
  try {
    const recruiter = await updateRecruiter(req.params.id, req.body);
    res.status(StatusCode.SUCCESS).json({ status: "success", data: recruiter });
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ status: "error", error: err.message });
  }
}

export const destroyRecruiterController = async (req, res) => {
  try {
    await destroyRecruiter(req.params.id);
    res.status(StatusCode.SUCCESS).json({ status: "success" });
  } catch (err) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ status: "error", error: err.message });
  }
};