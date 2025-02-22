import prisma from "../../database/index.js";

//apply job
export const applyJob = async (data) => {
  const { applicantId, resumeId, jobId, status, version } = data;
  try {
    const application = await prisma.application.create({
      data: {
        jobId,
        applicantId,
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

export const getSaveJobs = async () => {
  try {
    const savedJobs = await prisma.savedJob.findFirst({
      select: {
        id: true,
        applicantId: true,
        jobId: true,
        version: true,
        job: {
          select: {
            id: true,
            title: true,
            description: true,
            requirements: true,
            salary: true,
            type: true,
            address: true,
          },
        },
      },
    });
    return savedJobs;
  } catch (error) {
    throw new Error("Failed to get saved jobs: ", error.message);
  }
};

export const saveJob = async (data) => {
  const { jobId, applicantId, version } = data;
  try {
    const existingSabedJob = await prisma.savedJob.findFirst({
      where: {
        jobId,
        applicantId,
      },
    });
    if (existingSabedJob) {
      throw new Error("Job already saved");
    }
    const savedJob = await prisma.savedJob.create({
      data: {
        jobId,
        applicantId,
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
