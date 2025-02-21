import prisma from "../../database/index.js";

export const createResume = async (data, req) => {
  const userId = req.user.id;
  console.log(userId);
  const { filePath, version } = data;

  try {
    // Check if resume already exists
    const existingResume = await prisma.resume.findUnique({
      where: { id: userId },
    });

    if (existingResume) {
      throw new Error("Resume already exist.");
    }

    const resume = await prisma.resume.create({
      data: {
        userId,
        filePath,
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

export const updateResume = async (resumeId, data) => {
  try {
    const resume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        ...data,
      },
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
    console.error("Error updating resume:", error);
    throw new Error("Failed to update resume");
  }
};

export const destroyResume = async (resumeId) => {
  try {
    const resume = await prisma.resume.delete({
      where: { id: resumeId },
    });
    return resume;
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw new Error("Failed to delete resume");
  }
};
