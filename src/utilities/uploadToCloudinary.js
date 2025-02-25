import { cloudinary, configureCloudinary } from "../config/cloudinary.js";

configureCloudinary();

const uploadToCloudinary = async (fileBuffer) => {
  const uploadFile = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            reject(new Error("Cloudinary upload failed: " + error.message));
          } else {
            resolve(result.secure_url);
          }
        }
      );
      stream.end(fileBuffer);
    });
  };

  const uploadedUrl = await uploadFile(fileBuffer);

  return uploadedUrl;
};

export default uploadToCloudinary;
