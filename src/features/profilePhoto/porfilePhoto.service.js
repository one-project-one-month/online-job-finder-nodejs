import prisma from "../../database/index.js";
import uploadToCloudinary from "../../utilities/uploadToCloudinary.js";
import deleteImageByUrl from "../../utilities/deleteUrlFromCloudinary.js";
import { profilePhotoSchema } from "./profilePhoto.validation.js";

export const updateProfilePhoto = async (data, req) => {
  try {
    // data == req.body
    const userId = req.user.id;
    const file = req.file;

    if (!file) {
      throw new Error("No file uploaded.");
    }

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

    const uploadedUrl = await uploadToCloudinary(file.buffer);
    // need to pass this in for zod validation
    data.filePath = uploadedUrl;

    profilePhotoSchema.parse({
      profilePhoto: data.filePath,
    });

    const profilePhoto = await prisma.user.update({
      where: { id: userId },
      data: {
        profilePhoto: uploadedUrl,
      },
      select: {
        profilePhoto: true,
      },
    });

    return profilePhoto;
  } catch (error) {
    console.error("Error creating profilePhoto:", error);
    throw new Error("Failed to create profilePhoto.");
  }
};

export const getProfilePhotoByUserId = async (userId) => {
  try {
    const profilePhoto = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        profilePhoto: true,
      },
    });

    if (!profilePhoto) {
      throw new Error("Profile photo not found");
    }
    return profilePhoto;
  } catch (error) {
    console.error("Error fetching profilePhoto:", error);
    throw new Error("Failed to fetch profilePhoto");
  }
};

export const destroyProfilePhoto = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is missing.");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profilePhoto: true },
    });

    if (!user || !user.profilePhoto) {
      throw new Error("No profile photo found.");
    }

    // Delete image from storage (Cloudinary)
    await deleteImageByUrl(user.profilePhoto);

    // Update profilePhoto to NULL in the database
    return await prisma.user.update({
      where: { id: userId },
      data: { profilePhoto: null },
    });
  } catch (error) {
    console.error("Error deleting profile photo:", error);
    throw new Error(error.message || "Failed to delete profile photo.");
  }
};
