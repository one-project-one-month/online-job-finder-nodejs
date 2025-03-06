import { StatusCode } from "../../errors/StatusCode.js";
import {
  updateProfilePhoto,
  getProfilePhotoByUserId,
  destroyProfilePhoto,
} from "./porfilePhoto.service.js";

export const updateProfilePhotoController = async (req, res) => {
  try {
    const profilePhoto = await updateProfilePhoto(req.body, req);
    res.status(StatusCode.SUCCESS).json({ data: profilePhoto });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const getProfilePhotoByUserIdController = async (req, res) => {
  try {
    const profilePhoto = await getProfilePhotoByUserId(req.params.id);

    res.status(StatusCode.SUCCESS).json({ data: profilePhoto });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const destroyProfilePhotoController = async (req, res) => {
  try {
    const userId = req.user?.id; // Ensure user is authenticated

    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is missing from request." });
    }

    await destroyProfilePhoto(userId);

    return res.status(200).json({
      message: "Profile photo deleted successfully.",
    });
  } catch (error) {
    console.error("Error in controller:", error);
    return res.status(500).json({ error: error.message });
  }
};
