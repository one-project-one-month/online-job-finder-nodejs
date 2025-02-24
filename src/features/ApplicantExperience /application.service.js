import prisma from "../../database/index.js";

export const createApplicationExperience = async (data, req) => {
  const userId = req.user.id;
  console.log(userId);

  const {
    applicantId,
    companyName,
    location,
    title,
    description,
    jobType,
    startDate,
    currentlyWorking,
    version,
  } = data;
  try {
    const applicantProfile = await prisma.applicantProfile.findMany({
      where: { userId },
    });

    const applicationExperience = await prisma.applicantExperience.create({
      data: {
        applicantId: applicantProfile[0].id,
        companyName,
        location,
        title,
        jobType,
        startDate,
        currentlyWorking,
        version: version || 1,
      },
    });
    return applicationExperience;
  } catch (error) {
    console.log(error);

    throw new Error("Fail to crate", error.message);
  }
};

export const getApplicationExperience = async () => {
  try {
    const applicantExperience = await prisma.applicantExperience.findMany({});
    return applicantExperience;
  } catch (error) {
    throw new Error("fial to fetch application experience", error.message);
  }
};

export const getApplicationExperienceById = async (id) => {
  try {
    const applicantExperience = await prisma.applicantExperience.findUnique({
      where: { id },
    });
    return applicantExperience;
  } catch (error) {
    console.log(error);
    throw new Error("Fail to fetch application experience", error.message);
  }
};

export const updateApplicationExperience = async (id, data) => {
  try {
    const applicantExperience = await prisma.applicantExperience.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return applicantExperience;
  } catch (error) {
    throw new Error("fail to update ", error.message);
  }
};

export const destoryApplicationExperience = async (id) => {
  try {
    const applicantExperience = await prisma.applicantExperience.delete({
      where: { id },
    });
    return applicantExperience;
  } catch (error) {
    throw new Error("fail to delete", error.message);
  }
};
