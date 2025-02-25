import { StatusCode } from "../../errors/StatusCode.js";
import {
  createApplicantSkill,
  destroyApplicantSkill,
  getApplicantSkill,
  getApplicantSkillById,
  updateApplicantSkill,
} from "./applicant_skill.service.js";

export const createApplicantSkillController = async (req, res) => {
  try {
    const newApplicantSkill = await createApplicantSkill(req.body, req);
    res.status(StatusCode.SUCCESS).json({ data: newApplicantSkill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getApplicantSkillController = async (req, res) => {
  try {
    const applicantSkill = await getApplicantSkill(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: applicantSkill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getApplicantSkillByIdController = async (req, res) => {
  try {
    const applicantSkill = await getApplicantSkillById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: applicantSkill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateApplicantSkillController = async (req, res) => {
  try {
    const updatedApplicantSkill = await updateApplicantSkill(
      req.body,
      req.params.id
    );
    res.status(StatusCode.SUCCESS).json({ data: updatedApplicantSkill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const deleteApplicantSkillController = async (req, res) => {
  try {
    await destroyApplicantSkill(req.params.id);
    res.status(StatusCode.SUCCESS).json({ message: "success" });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};
