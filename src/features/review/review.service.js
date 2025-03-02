import prisma from "../../database/index.js";

export const createReview = async (data, req) => {
  const userId = req.user.id;

  const { companyId, applicantId, rating, comment, version } = data;
  try {
    const applicantProfile = await prisma.applicantProfile.findMany({
      where: {
        userId,
      },
    });

    const review = await prisma.review.create({
      data: {
        companyId,
        applicantId: applicantProfile[0].id,
        rating,
        comment,
        version: version || 1,
      },
    });
    return review;
  } catch (error) {
    console.log(error);

    throw new Error("Error while creating review", error.message);
  }
};

export const updateReview = async (reviewId, data) => {
  try {
    const review = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        ...data,
      },
    });
    return review;
  } catch (error) {
    throw new Error("Failed to update review", error.message);
  }
};

export const destoryReview = async (reviewId) => {
  try {
    const review = await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
    return review;
  } catch (error) {
    throw new Error("Failed to delete review", error.message);
  }
};
