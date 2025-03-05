import prisma from "../../database/index.js";
import uploadToCloudinary from "../../utilities/uploadToCloudinary.js";
import deleteImageByUrl from "../../utilities/deleteUrlFromCloudinary.js";
import { profilePhotoSchema } from "./profilePhoto.validation.js";

export const createProfilePhoto = async (data, req) => {
  // data == req.body
  //   const userId = req.user.id;
  const file = req.file;
  // const { username, id, version } = data;

  if (file) {
    const validMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];

    if (!validMimeTypes.includes(file.mimetype)) {
      throw new Error(
        "Invalid file type. Only PNG, JPEG, JPG, or PDF files are allowed."
      );
    }
  }

  try {
    const uploadedUrl = await uploadToCloudinary(file.buffer);
    // need to pass this in for zod validation
    data.filePath = uploadedUrl;

    profilePhotoSchema.parse({
      profilePhoto: data.filePath,
    });

    const profilePhoto = await prisma.user.create({
      data: {
        profilePhoto: uploadedUrl,
      },
    });

    return profilePhoto;
  } catch (error) {
    console.error("Error creating profilePhoto:", error.message);
    throw new Error("Failed to create profilePhoto.");
  }
};

export const getProfilePhotoByUserId = async (userId) => {
  try {
    const profilePhoto = prisma.user.findFirst({
      where: { id: userId },
      select: {
        profilePhoto: true,
      },
    });
    return profilePhoto;
  } catch (error) {
    console.error("Error fetching profilePhoto:", error);
    throw new Error("Failed to fetch profilePhoto");
  }
};

export const destroyProfilePhoto = async (userId) => {
  try {
    const profilePhoto = await prisma.user.delete({
      where: { id: userId },
    });

    await deleteImageByUrl(user.profilePhoto);

    return profilePhoto;
  } catch (error) {
    console.error("Error deleting profilePhoto:", error);
    throw new Error("Failed to delete profilePhoto");
  }
};
