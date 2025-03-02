import { StatusCode } from "../../errors/StatusCode.js";
import {
  createJobSkill,
  destroyJobSkill,
  getJobSkillById,
  getJobsSkill,
  updateJobSkill,
} from "./job_skill.service.js";

export const createJobSkillController = async (req, res) => {
  try {
    const newJobSkill = await createJobSkill(req.body);
    res.status(StatusCode.SUCCESS).json({ data: newJobSkill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getJobsSkillController = async (req, res) => {
  try {
    const jobsSkill = await getJobsSkill();
    res.status(StatusCode.SUCCESS).json({ data: jobsSkill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getJobSkillByIdController = async (req, res) => {
  try {
    const jobSkill = await getJobSkillById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: jobSkill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateJobSkillController = async (req, res) => {
  try {
    const jobSkill = await updateJobSkill(req.params.id, req.body);
    res.status(StatusCode.SUCCESS).json({ data: jobSkill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const destroyJobSkillController = async (req, res) => {
  try {
    await destroyJobSkill(req.params.id);
    res.status(StatusCode.SUCCESS).json({ message: "success" });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};
