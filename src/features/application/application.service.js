import prisma from "../../database/index.js";

//apply job
export const applyJob = async (data, req) => {
  const userId = req.user.id;
  const { applicantId, resumeId, jobId, status, version } = data;
  try {
    const applicantProfile = await prisma.applicantProfile.findMany({
      where: {
        userId,
      },
    });

    const application = await prisma.application.create({
      data: {
        jobId,
        applicantId: applicantProfile[0].id,
        resumeId: resumeId || null,
        status: status || "Pending",
        version: version || 1,
      },
    });
    return application;
  } catch (error) {
    throw new Error("Failed to apply job: " + error.message);
  }
};

export const getSaveJobs = async (req) => {
  const userId = req.user.id;
  console.log(userId);

  try {
    //const savedJobs = await prisma.savedJob.findFirst({
    //  select: {
    //    id: true,
    //    applicantId: true,
    //    jobId: true,
    //    version: true,
    //    job: {
    //      select: {
    //        id: true,
    //        title: true,
    //        description: true,
    //        requirements: true,
    //        salary: true,
    //        type: true,
    //        address: true,
    //      },
    //    },
    //  },
    //});
    const savedJob = await prisma.applicantProfile.findUnique({
      where: { userId },
      select: {
        userId: true,
        fullName: true,
        phone: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        SavedJob: {
          select: {
            id: true,
          },
        },
      },
    });
    return savedJob;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to get saved jobs: ", error.message);
  }
};

export const saveJob = async (data, req) => {
  const userId = req.user.id;
  const { jobId, applicantId, version } = data;
  try {
    const applicantProfile = await prisma.applicantProfile.findMany({
      where: {
        userId,
      },
    });

    const existingSabedJob = await prisma.savedJob.findFirst({
      where: {
        jobId,
        applicantId: applicantProfile[0].id,
      },
    });
    if (existingSabedJob) {
      throw new Error("Job already saved");
    }
    const savedJob = await prisma.savedJob.create({
      data: {
        jobId,
        applicantId: applicantProfile[0].id,
        version: version || 1,
      },
    });
    return savedJob;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to save job ", error.message);
  }
};

export const unsaveJob = async (savedJobId) => {
  try {
    const existingSavedJob = await prisma.savedJob.findUnique({
      where: { id: savedJobId },
    });

    if (!existingSavedJob) {
      // Optionally, you can return a message or throw a custom error here
      throw new Error("Saved job not found. Nothing to delete.");
    }

    const savedJob = await prisma.savedJob.delete({
      where: {
        id: savedJobId,
      },
    });
    return savedJob;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to unsave job", error.message);
  }
};

export const updateJobStatus = async (data) => {
  try {
    const { jobId, status } = data;
    const job = await prisma.application.update({
      where: {
        id: jobId,
      },
      data: {
        status,
      },
    });
    return job;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to update job status: ", error.message);
  }
};
