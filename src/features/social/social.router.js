import express from "express";
import validate from "../../middleware/validate.js";
import authenticateToken from "../../middlewares/authMiddleware.js";
import { socialMediaSchema } from "./social.validation.js";
import { createSocialMediaController, destroySocialMediaController, getSocialMediaByIdController, getSocialMediaController, updateSocialMediaController } from "./social.controller.js";

const socialMediaRouter = express.Router();

socialMediaRouter.post(
  "/",
  validate(socialMediaSchema),
  authenticateToken,
  createSocialMediaController
);
socialMediaRouter.get("/", getSocialMediaController);
socialMediaRouter.get("/:id", getSocialMediaByIdController);
socialMediaRouter.put("/:id",
  validate(socialMediaSchema),
  authenticateToken,
  updateSocialMediaController
);
socialMediaRouter.delete("/:id", authenticateToken, destroySocialMediaController);
export default socialMediaRouter;