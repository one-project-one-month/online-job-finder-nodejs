import prisma from "../../database/index.js";

export const createJobCategory = async (data) => {
  try {
    const { industry, description, version } = data;
    const jobCategory = await prisma.jobCategory.create({
      data: {
        industry,
        description: description || null,
        version: version || 1,
      },
    });
    return jobCategory;
  } catch (error) {
    throw new Error("Fail to create job category", error.message);
  }
};

export const getJobCategory = async () => {
  try {
    const jobCategories = await prisma.jobCategory.findMany({
      select: {
        id: true,
        industry: true,
      },
    });
    return jobCategories;
  } catch (error) {
    throw new Error("Fail to fetch job categories", error.message);
  }
};

export const getJobCategoryById = async (jobCategoryId) => {
  try {
    const jobCategory = await prisma.jobCategory.findUnique({
      where: { id: jobCategoryId },
      select: {
        id: true,
        industry: true,
      },
    });
    return jobCategory;
  } catch (error) {
    throw new Error("Fail to fetch job category", error.message);
  }
};

export const updateJobCategory = async (jobCategoryId, data) => {
  try {
    const jobCategory = await prisma.jobCategory.update({
      where: { id: jobCategoryId },
      data: {
        ...data,
      },
      select: {
        id: true,
        industry: true,
      },
    });
    return jobCategory;
  } catch (error) {
    console.log(error);

    throw new Error("Fail to update job category", error.message);
  }
};

export const destoryJobCategory = async (jobCategoryId) => {
  try {
    const jobCategory = await prisma.jobCategory.delete({
      where: { id: jobCategoryId },
    });
    return jobCategory;
  } catch (error) {
    console.log(error);

    throw new Error("Fail to delete job category");
  }
};
