import { StatusCode } from "../../errors/StatusCode.js";
import {
  createApplicationExperience,
  destoryApplicationExperience,
  getApplicationExperience,
  getApplicationExperienceById,
  updateApplicationExperience,
} from "./application.service.js";

export const createApplicationExperienceController = async (req, res) => {
  try {
    const applicationExperience = await createApplicationExperience(
      req.body,
      req
    );
    res.status(StatusCode.SUCCESS).json({ data: applicationExperience });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getApplicationExperienceController = async (req, res) => {
  try {
    const applicantExperience = await getApplicationExperience(req);
    res.status(StatusCode.SUCCESS).json({ data: applicantExperience });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getApplicationExperienceByIdController = async (req, res) => {
  try {
    const applicantExperience = await getApplicationExperienceById(
      req.params.id
    );
    res.status(StatusCode.SUCCESS).json({ data: applicantExperience });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const updateApplicationExperienceController = async (req, res) => {
  try {
    const applicantExperience = await updateApplicationExperience(
      req.params.id,
      req.body
    );
    res.status(StatusCode.SUCCESS).json({ data: applicantExperience });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const destoryApplicationExperienceController = async (req, res) => {
  try {
    await destoryApplicationExperience(req.params.id);
    res.status(StatusCode.SUCCESS).json({ message: "success" });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
