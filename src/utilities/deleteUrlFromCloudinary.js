import { cloudinary, configureCloudinary } from "../config/cloudinary.js";

configureCloudinary();

const getPublicIdFromUrl = (imageUrl) => {
  const parts = imageUrl.split("/");
  return parts[parts.length - 1].split(".")[0]; // Extracts the public ID
  // Example url:
  // https://res.cloudinary.com/dy3ovuxx9/image/upload/v1740389552/rd3zng7wdzth1gnxrn6h.png
};

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Delete response:", result);
    return result;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

const deleteImageByUrl = async (imageUrl) => {
  const publicId = getPublicIdFromUrl(imageUrl);
  return await deleteImage(publicId);
};

export default deleteImageByUrl;
