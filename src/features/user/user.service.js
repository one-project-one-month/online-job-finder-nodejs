// for handling with database CRUD to apply in controller

import prisma from "../../database/index.js";

export const getAllUsersAccount = async () => {
  try {
    const accounts = await prisma.user.findMany({
      where: {
        role: {
          name: {
            not: "Admin",
          },
        },
      },
      select: {
        id: true,
        username: true,
        profilePhoto: true,
        email: true,
        isInformationCompleted: true,
        version: true,
        role: {
          select: {
            name: true,
          },
        },
        applicantProfile: {
          select: {
            id: true,
            fullName: true,
            SavedJob: true,
          },
        },
        companyProfile: {
          select: {
            id: true,
            companyName: true,
            phone: true,
            website: true,
            address: true,
          },
        },
        socialMedia: {
          select: {
            link: true,
          },
        },
        resumes: {
          select: {
            filePath: true,
          },
        },
      },
    });
    return accounts;
  } catch (error) {
    throw new Error("Failed to fetch users", error.message);
  }
};

export const getUserAccount = async (userId) => {
  try {
    const account = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        profilePhoto: true,
        email: true,
        isInformationCompleted: true,
        version: true,
        role: {
          select: {
            name: true,
          },
        },
        applicantProfile: {
          select: {
            id: true,
            fullName: true,
            experiences: {
              select: {
                companyName: true,
                location: true,
                title: true,
                jobType: true,
                startDate: true,
                currentlyWorking: true,
              },
            },
          },
        },
        companyProfile: {
          select: {
            id: true,
            companyName: true,
            phone: true,
            website: true,
            address: true,
          },
        },
        socialMedia: {
          select: {
            link: true,
          },
        },
        resumes: {
          select: {
            filePath: true,
          },
        },
      },
    });
    return account;
  } catch (error) {
    throw new Error("fail to fetch user data", error.message);
  }
};

export const getUserSavedJobs = async (req) => {
  const userId = req.user.id;

  try {
    const applicant = await prisma.applicantProfile.findUnique({
      where: { userId: userId },
      select: {
        id: true,
        fullName: true,
        SavedJob: {
          select: {
            id: true,
            jobId: true,
            version: true,
            createdAt: true,
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
        },
      },
    });

    if (!applicant) {
      throw new Error("Applicant profile not found");
    }

    return applicant.SavedJob;
  } catch (error) {
    console.error("Failed to get saved jobs:", error);
    throw new Error("Failed to get saved jobs.");
  }
};
