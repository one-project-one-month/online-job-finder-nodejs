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

export const getApplicantSkillById = async (applicantSkillId) => {
  try {
    const applicantSkill = await prisma.applicantSkill.findUnique({
      where: {
        id: applicantSkillId,
      },
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
    throw new Error();
  }
};

export const updateApplicantSkill = async (data, applicantSkillId) => {
  try {
    const updatedApplicantSkill = await prisma.applicantSkill.update({
      where: {
        id: applicantSkillId,
      },
      data: {
        ...data,
      },
    });
    return updatedApplicantSkill;
  } catch (error) {
    console.log(error);

    throw new Error("Fail to update applicant skill", error.message);
  }
};

export const destroyApplicantSkill = async (applicantSkillId) => {
  try {
    const deletedApplicantSkill = await prisma.applicantSkill.delete({
      where: {
        id: applicantSkillId,
      },
    });
    return deletedApplicantSkill;
  } catch (error) {
    throw new Error("Fail to delete applicant skill", error.message);
  }
};
