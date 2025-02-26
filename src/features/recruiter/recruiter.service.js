import prisma from "../../database/index.js";

export const getRecruiters = async () => {
  try {
    const recruiters = await prisma.companyProfile.findMany({
      select: {
        id: true,
        companyName: true,
        locationId: true,
        phone: true,
        website: true,
        address: true,
        description: true,
        version: true,
      }
    });
    return recruiters;
  } catch (error) {
    console.log('Not any data available', error);
    throw new Error('Failed to get recruiter data');
  }
}

export const createRecruiter = async (data, req) => {
  // console.log(req.user.id);
  const userId = req.user.id;
  const { companyName, phone, website, address, locationId, description, version } = data;
  try {
    const recruiter = await prisma.companyProfile.create({
      data: {
        companyName,
        phone,
        website: website || 'www.example.com',
        address,
        locationId,
        description: description || null,
        version: version || 1,
        userId
      },
    });
  } catch (error) {
    console.log('Failed to create recruiter', error);
    throw new Error('Failed to create recruiter');
  }
}

export const getRecruiterById = async (recruiterid) => {
  try {
    const recruiter = await prisma.companyProfile.findUnique({
      where: { id: recruiterid },
      select: {
        id: true,
        companyName: true,
        phone: true,
        website: true,
        address: true,
        description: true,
        version: true,
      }
    });
    return recruiter;
  } catch (err) {
    console.error("Error fetching recruiter", err);
    throw new Error('Failed to fetch recruiter', err);
  }
}

export const updateRecruiter = async (recruiterId, data) => {
  console.log(recruiterId)
  try {
    const updateRecruiter = await prisma.companyProfile.update({
      where: { id: recruiterId },
      data: {
        ...data,
      },
      select: {
        id: true,
        companyName: true,
        phone: true,
        website: true,
        locationId: true,
        address: true,
        description: true,
        version: true,
      }
    });
    return updateRecruiter;
  } catch (err) {
    console.error("Error updating recruiter", err);
    throw new Error('Failed to update recruiter', err);
  }
}

export const destroyRecruiter = async (recruiterId) => {
  try {
    console.log(recruiterId);
    const recruiter = await prisma.companyProfile.delete({
      where: { id: recruiterId },
    });
    return recruiter;
  } catch (err) {
    console.error("Error deleting recruiter", err);
    throw new Error('Failed to delete recruiter', err);
  }
};