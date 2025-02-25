import { StatusCode } from "../../errors/StatusCode.js";
import {
  createApplicantSkill,
  getApplicantSkill,
} from "./applicant_skill.service.js";

export const createApplicantSkillController = async (req, res) => {
  try {
    const newApplicantSkill = await createApplicantSkill(req.body);
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
