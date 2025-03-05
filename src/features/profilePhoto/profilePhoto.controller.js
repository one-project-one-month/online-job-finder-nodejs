import { StatusCode } from "../../errors/StatusCode.js";
import {
  createProfilePhoto,
  getProfilePhotoByUserId,
  destroyProfilePhoto,
} from "./porfilePhoto.service.js";

export const createProfilePhotoController = async (req, res) => {
  try {
    const profilePhoto = await createProfilePhoto(req.body, req);
    res.status(StatusCode.SUCCESS).json({ data: profilePhoto });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const getProfilePhotoByUserIdController = async (req, res) => {
  try {
    const profilePhoto = getProfilePhotoByUserId(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: profilePhoto });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const destroyProfilePhotoController = async (req, res) => {
  try {
    await destroyProfilePhoto(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: profilePhoto });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};
