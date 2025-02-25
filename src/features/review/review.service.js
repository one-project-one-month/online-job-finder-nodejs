import prisma from "../../database/index.js";

export const createReview = async (data, req) => {
  const userId = req.user.id;
  const { companyId } = req.params;

  const { applicantId, rating, comment, version } = data;
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
    throw new Error("Error while creating review", error.message);
  }
};

export const updateReview = async (reviewId, data, req) => {
  const userId = req.user.id;
  const { companyId } = req.params;
  const { applicantId, rating, comment, version } = data;

  try {
    const applicantProfile = await prisma.applicantProfile.findMany({
      where: {
        userId,
      },
    });

    const review = await prisma.review.update({
      where: {
        id: reviewId,
      },
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
    throw new Error("Failed to update review", error.message);
  }
};

export const destoryReview = async (reviewId, req) => {
  const userId = req.user.id;
  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    const applicantProfile = await prisma.applicantProfile.findUnique({
      where: { userId },
    });

    if (!applicantProfile || review.applicantId !== applicantProfile.id) {
      throw new Error("Not authorized to delete this review");
    }
    const deletedReview = await prisma.review.delete({
      where: { id: reviewId },
    });

    return deletedReview;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to delete review", error.message);
  }
};

export const getReview = async (companyId) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        companyId,
      },
      include: {
        applicant: {
          select: {
            userId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return reviews;
  } catch (error) {
    throw new Error("Fail to fetch review", error);
  }
};
