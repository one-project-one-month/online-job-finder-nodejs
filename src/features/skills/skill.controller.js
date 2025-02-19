import { StatusCode } from "../../errors/StatusCode.js";
import {
  destorySkill,
  getSkillById,
  getSkills,
  skillCreate,
  updateSkill,
} from "./skill.service.js";

export const skillCreateController = async (req, res) => {
  try {
    const skill = await skillCreate(req.body);
    res.status(StatusCode.SUCCESS).json({ data: skill });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const getSkillsControllr = async (req, res) => {
  try {
    const skills = await getSkills();
    res.status(StatusCode.SUCCESS).json({ data: skills });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getSkillByIdControler = async (req, res) => {
  try {
    const skill = await getSkillById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: skill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateSkillController = async (req, res) => {
  try {
    const skill = await updateSkill(req.params.id, req.body);
    res.status(StatusCode.SUCCESS).json({ data: skill });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const destorySkillController = async (req, res) => {
  try {
    await destorySkill(req.params.id);
    res.status(StatusCode.SUCCESS).json({ status: "success" });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};
