import prisma from "../../database/index.js";

export const createJob = async (data) => {
  const {
    companyId,
    title,
    jobCategoryId,
    locationId,
    type,
    description,
    requirements,
    numOfPosts,
    salary,
    address,
    status,
    version,
  } = data;

  try {
    const job = await prisma.job.create({
      data: {
        companyId,
        title,
        jobCategoryId,
        locationId,
        type,
        description,
        requirements,
        numOfPosts,
        salary,
        address,
        status,
        version: version || 1,
      },
    });
    return job;
  } catch (error) {
    throw new Error("Failed to create job", error.message);
  }
};

export const getAllJob = async (filters) => {
  try {
    const { q, location, category, type } = filters;
    const jobs = await prisma.job.findMany({
      where: {
        ...(q && {
          title: {
            contains: q.join(" "),
            mode: "insensitive",
          },
        }),
        ...(location && {
          location: {
            name: {
              in: location,
            },
          },
        }),
        orderBy: {
          createdAt: "desc",
        },
        ...(category && {
          category: {
            industry: {
              in: category,
            },
          },
        }),
        ...(type && {
          type: {
            in: type,
          },
        }),
      },
      select: {
        id: true,
        title: true,
        companyId: true,
        jobCategoryId: true,
        locationId: true,
        type: true,
        description: true,
        requirements: true,
        numOfPosts: true,
        salary: true,
        address: true,
        status: true,
        version: true,
        company: {
          select: {
            companyName: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            industry: true,
          },
        },
      },
    });
    return jobs;
  } catch (error) {
    console.log(error);

    throw new Error("fail to fetch job data", error.message);
  }
};

export const getJobById = async (jobId) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        title: true,
        companyId: true,
        jobCategoryId: true,
        locationId: true,
        type: true,
        description: true,
        requirements: true,
        numOfPosts: true,
        salary: true,
        address: true,
        status: true,
        version: true,
        company: {
          select: {
            companyName: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            industry: true,
          },
        },
      },
    });
    return job;
  } catch (error) {
    throw new Error("Fail to featch job", error.message);
  }
};

export const updateJob = async (data, jobId) => {
  try {
    const job = await prisma.job.update({
      where: { id: jobId },
      data: {
        ...data,
      },
      select: {
        id: true,
        title: true,
        companyId: true,
        jobCategoryId: true,
        locationId: true,
        type: true,
        description: true,
        requirements: true,
        numOfPosts: true,
        salary: true,
        address: true,
        status: true,
        version: true,
        company: {
          select: {
            companyName: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            industry: true,
          },
        },
      },
    });
    return job;
  } catch (error) {
    throw new Error("Fail to update job", error.message);
  }
};

export const destoryJob = async (jobId) => {
  try {
    const job = await prisma.job.delete({
      where: { id: jobId },
    });
    return job;
  } catch (error) {
    throw new Error("fail to delete job", error.message);
  }
};
