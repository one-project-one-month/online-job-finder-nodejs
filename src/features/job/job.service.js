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
    console.log("Error creating job:", error.message);
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
