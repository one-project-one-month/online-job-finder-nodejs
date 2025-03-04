import prisma from "../../database/index.js";

export const updateUser = async (userId, data) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        isInformationCompleted: true,
        roleId: true,
        role: {
          select: {
            name: true,
          },
        },
        applicantProfile: {
          select: {
            fullName: true,
          },
        },
        companyProfile: {
          select: {
            companyName: true,
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
    return user;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
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
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users", error.message);
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
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
    return user;
  } catch (error) {
    throw new Error("fail to fetch user data", error.message);
  }
};

export const destroyUser = async (userId) => {
  try {
    const user = await prisma.user.delete({ where: { id: userId } });

    return user;
  } catch (error) {
    throw new Error("Failed to delete user", error.message);
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
