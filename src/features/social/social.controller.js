import { StatusCode } from "../../errors/StatusCode.js";
import { createSocialMedia, destorySocialMedia, getSocialMedia, getSocialMediaById, updateSocialMedia } from "./social.service.js";

export const createSocialMediaController = async (req, res) => {
  try {
    const social = await createSocialMedia(req.body, req);
    res.status(StatusCode.SUCCESS).json({ data: social });
  } catch (err) {
    res.status(StatusCode.BAD_REQUEST).json({ message: err.message });
  }
}

export const getSocialMediaController = async (req, res) => {
  try {
    const socialMedia = await getSocialMedia();
    res.status(StatusCode.SUCCESS).json({ data: socialMedia });
  } catch (err) {
    res.status(StatusCode.BAD_REQUEST).json({ message: err.message });
  }
}

export const getSocialMediaByIdController = async (req, res) => {
  try {
    const social = await getSocialMediaById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: social });
  } catch (err) {
    res.status(StatusCode.BAD_REQUEST).json({ status: "error", message: err.message });
  }
}

export const updateSocialMediaController = async (req, res) => {
  try {
    const social = await updateSocialMedia(req.params.id, req.body);
    res.status(StatusCode.SUCCESS).json({ data: social });
  } catch (err) {
    res.status(StatusCode.BAD_REQUEST).json({ status: "error", message: err.message });
  }
}

export const destroySocialMediaController = async (req, res) => {
  try {
    await destorySocialMedia(req.params.id);
    res.status(StatusCode.SUCCESS).json({ status: "success" });
  } catch (err) {
    res.status(StatusCode.BAD_REQUEST).json({ status: "error", message: err.message });
  }
}