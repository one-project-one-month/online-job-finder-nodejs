import express from "express";
import {
  destorySkillController,
  getSkillByIdControler,
  getSkillsControllr,
  skillCreateController,
  updateSkillController,
} from "./skill.controller.js";
import validate from "../../middleware/validate.js";
import { skillSchema } from "./skill.validation.js";

const skillRouter = express.Router();

skillRouter.post("/", validate(skillSchema), skillCreateController);
skillRouter.get("/", getSkillsControllr);
skillRouter.get("/:id", getSkillByIdControler);
skillRouter.put("/:id", validate(skillSchema), updateSkillController);
skillRouter.delete("/:id", destorySkillController);
export default skillRouter;
