import prisma from "../../database/index.js";

export const createApplicationExperience = async (data) => {
  const { applicantId, industryId, version } = data;
  try {
    const applicationExperience = await prisma.applicantExperience.create({
      data: {
        applicantId,
        industryId,
        version: version || 1,
      },
    });
    return applicationExperience;
  } catch (error) {
    throw new Error("Fail to crate", error.message);
  }
};
