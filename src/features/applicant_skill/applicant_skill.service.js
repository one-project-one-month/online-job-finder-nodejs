import prisma from "../../database/index.js";

export const createApplicantSkill = async (data) => {
  const { applicantId, skillId, version } = data;
  try {
    const newApplicantSkill = await prisma.applicantSkill.create({
      data: {
        applicantId,
        skillId,
        version: version || 1,
      },
    });
    return newApplicantSkill;
  } catch (error) {
    throw new Error("Fail to create applicant skill", error.message);
  }
};

export const getApplicantSkill = async () => {
  try {
    const applicantSkill = await prisma.applicantSkill.findMany({
      select: {
        id: true,
        applicantId: true,
        skillId: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        applicant: {
          select: {
            id: true,
            fullName: true,
          },
        },
        skill: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return applicantSkill;
  } catch (error) {
    throw new Error("Fail to get applicant skill", error.message);
  }
};
