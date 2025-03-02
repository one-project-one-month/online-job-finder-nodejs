import prisma from "../../database/index.js";
import uploadToCloudinary from "../../utilities/uploadToCloudinary.js";
import deleteImageByUrl from "../../utilities/deleteUrlFromCloudinary.js";
import { userSchema } from "./user.validation.js";

export const createUser = async (data, req) => {
  // data == req.body
  const file = req.file;
  let uploadedUrl = "";

  const { username, email, password, roleId, isInformationCompleted, version } =
    data;

  if (file) {
    const validMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    if (!validMimeTypes.includes(file.mimetype)) {
      throw new Error(
        "Invalid file type. Only PNG, JPEG, JPG, or PDF files are allowed."
      );
    }
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    if (file) {
      uploadedUrl = await uploadToCloudinary(file.buffer);
      data.filePath = uploadedUrl; // Add filePath for validation
      console.log(uploadedUrl);
    }

    // Validate input with Zod
    userSchema.parse({
      body: {
        ...data,
        version: data.version || 1,
        filePath: uploadedUrl || "",
      },
    });

    // Create user in database
    const user = await prisma.user.create({
      data: {
        username,
        profilePhoto: uploadedUrl,
        email,
        password,
        roleId,
        isInformationCompleted,
        version: version || 1,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message || "Failed to create user");
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

    deleteImageByUrl(user.profilePhoto);
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
