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
import authenticateToken from "../../middlewares/authMiddleware.js";
import adminMiddleware from "../../middlewares/adminMiddleware.js";

const skillRouter = express.Router();

skillRouter.post(
  "/",
  validate(skillSchema),
  authenticateToken,
  adminMiddleware,
  skillCreateController
);
skillRouter.get("/", authenticateToken, getSkillsControllr);
skillRouter.get("/:id", authenticateToken, getSkillByIdControler);
skillRouter.put(
  "/:id",
  validate(skillSchema),
  authenticateToken,
  adminMiddleware,
  updateSkillController
);
skillRouter.delete(
  "/:id",
  authenticateToken,
  adminMiddleware,
  destorySkillController
);
export default skillRouter;
