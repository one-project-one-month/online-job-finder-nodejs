import { StatusCode } from "../../errors/StatusCode.js";
import {
  createApplicant,
  getApplicants,
  getApplicantById,
  updateApplicant,
  destroyApplicant,
} from "./applicant.service.js";

export const createApplicantController = async (req, res) => {
  try {
    const applicant = await createApplicant(req.body, req);
    res.status(StatusCode.SUCCESS).json({ data: applicant });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const getApplicantsController = async (req, res) => {
  try {
    const applicants = await getApplicants();
    res.status(StatusCode.SUCCESS).json({ data: applicants });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const getApplicantByIdController = async (req, res) => {
  try {
    const applicant = await getApplicantById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: applicant });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const updateApplicantController = async (req, res) => {
  try {
    const applicant = await updateApplicant(req.params.id, req.body);
    res.status(StatusCode.SUCCESS).json({ data: applicant });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const destroyApplicantController = async (req, res) => {
  try {
    await destroyApplicant(req.params.id);
    res.status(StatusCode.SUCCESS).json({ status: "success" });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};
