import prisma from "../../database/index.js";
import { resumeSchema } from "./resumes.validation.js";
import uploadToCloudinary from "../../utilities/uploadToCloudinary.js";
import deleteImageByUrl from "../../utilities/deleteUrlFromCloudinary.js";

export const createResume = async (data, req) => {
  // data == req.body
  const userId = req.user.id;
  const file = req.file;
  const { version } = data;

  if (!file) {
    throw new Error("No file uploaded");
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

  try {
    const uploadedUrl = await uploadToCloudinary(file.buffer);
    // need to pass this in for zod validation
    data.filePath = uploadedUrl;

    resumeSchema.parse({
      filePath: data.filePath,
      version: data.version,
    });

    const resume = await prisma.resume.create({
      data: {
        userId,
        filePath: uploadedUrl,
        version: version || 1,
      },
    });

    return resume;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw new Error("Failed to create resume.");
  }
};

export const getResumes = async () => {
  try {
    const resumes = await prisma.resume.findMany({
      select: {
        id: true,
        userId: true,
        filePath: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return resumes;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw new Error("Failed to fetch resumes");
  }
};

export const getResumeById = async (resumeId) => {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: {
        id: true,
        userId: true,
        filePath: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return resume;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw new Error("Failed to fetch resume");
  }
};

export const destroyResume = async (resumeId) => {
  try {
    const resume = await prisma.resume.delete({
      where: { id: resumeId },
    });

    await deleteImageByUrl(resume.filePath);

    return resume;
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw new Error("Failed to delete resume");
  }
};
