import prisma from "../../database/index.js";

export const createApplicant = async (data, req) => {
  const userId = req.user.id;
  console.log(userId);
  const { fullName, phone, address, locationId, description, version } = data;

  try {
    // Check if applicant already exists
    const existingApplicant = await prisma.applicantProfile.findUnique({
      where: { id: userId },
    });

    if (existingApplicant) {
      throw new Error("applicant already exist.");
    }

    const applicant = await prisma.applicantProfile.create({
      data: {
        userId,
        fullName,
        phone,
        address: address || "",
        locationId: locationId || "",
        description: description || "",
        version: version || 1,
      },
    });

    return applicant;
  } catch (error) {
    throw new Error("Failed to create applicant.");
  }
};

export const getApplicants = async () => {
  try {
    const applicants = await prisma.applicantProfile.findMany({
      select: {
        id: true,
        userId: true,
        fullName: true,
        phone: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        Review: {
          select: {
            id: true,
            rating: true,
            comment: true,
          },
        },
      },
    });

    return applicants;
  } catch (error) {
    throw new Error("Failed to fetch applicants");
  }
};

export const getApplicantById = async (applicantId) => {
  try {
    const applicant = await prisma.applicantProfile.findUnique({
      where: { id: applicantId },
      select: {
        id: true,
        userId: true,
        fullName: true,
        phone: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return applicant;
  } catch (error) {
    throw new Error("Failed to fetch applicant");
  }
};

export const updateApplicant = async (applicantId, data) => {
  try {
    const updatedApplicant = await prisma.applicantProfile.update({
      where: { id: applicantId },
      data: {
        ...data,
      },
      select: {
        id: true,
        userId: true,
        fullName: true,
        phone: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return updatedApplicant;
  } catch (error) {
    throw new Error("Failed to update applicant");
  }
};

export const destroyApplicant = async (applicantId) => {
  try {
    const applicant = await prisma.applicantProfile.delete({
      where: { id: applicantId },
    });
    return applicant;
  } catch (error) {
    throw new Error("Failed to delete applicant.");
  }
};
