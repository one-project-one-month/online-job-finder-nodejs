import { StatusCode } from "../../errors/StatusCode.js";
import { createApplicationExperience } from "./application.service.js";

export const createApplicationExperienceController = async (req, res) => {
  try {
    const applicationExperience = await createApplicationExperience(req.body);
    res.status(StatusCode.SUCCESS).json({ data: applicationExperience });
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
