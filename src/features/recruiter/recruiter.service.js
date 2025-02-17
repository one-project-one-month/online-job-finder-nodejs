import prisma from "../../database/index.js";

export const getRecruiters = async () => {
  try {
    const recruiters = await prisma.companyProfile.findMany({
      select: {
        id: true,
        companyName: true,
      }
    });
    return recruiters;
  } catch (error) {
    console.log('Not any data available', error);
    throw new Error('Failed to get recruiter data');
  }
}