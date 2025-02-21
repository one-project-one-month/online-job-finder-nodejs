import prisma from "../../database/index.js";

export const createJobSkill = async (data) => {
  const { jobId, skillId, version } = data;
  try {
    const jobSkill = await prisma.jobSkill.create({
      data: {
        jobId,
        skillId,
        version: version || 1,
      },
    });
    return jobSkill;
  } catch (error) {
    throw new Error("Fail to create job skill", error.message);
  }
};

export const getJobsSkill = async () => {
  try {
    const jobsSkill = await prisma.jobSkill.findMany({
      select: {
        id: true,
        jobId: true,
        skillId: true,
        version: true,
        job: {
          select: {
            id: true,
            title: true,
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
    return jobsSkill;
  } catch (error) {
    throw new Error("Fail to fetch job skill: " + error.message);
  }
};

export const getJobSkillById = async (jobSkillId) => {
  try {
    const jobSkill = await prisma.jobSkill.findUnique({
      where: {
        id: jobSkillId,
      },
      select: {
        id: true,
        jobId: true,
        skillId: true,
        version: true,
        job: {
          select: {
            id: true,
            title: true,
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
    return jobSkill;
  } catch (error) {
    throw new Error("Fail to fetch job skill ", error.message);
  }
};
