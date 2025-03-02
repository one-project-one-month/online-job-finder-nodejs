import { any } from "zod";
import prisma from "../../database/index.js";

export const createSocialMedia = async (data, req) => {
  const userId = req.user.id;
  const { link, version } = data;
  try {
    const newSocialMedia = await prisma.socialMedia.create({
      data: {
        userId,
        link,
        version: version || 1,
      }
    });
    return newSocialMedia;
  } catch (err) {
    throw new Error("Fail to create job category", error.message);
  }
};

export const getSocialMedia = async () => {
  try {
    const socialMedia = await prisma.socialMedia.findMany({
      select: {
        id: true,
        userId: true,
        link: true
      }
    });
    return socialMedia;
  } catch (err) {
    throw new Error("Failed to fetch SocialMedia");
  }
}

export const getSocialMediaById = async (socialId) => {
  console.log(socialId)
  try {
    const social = await prisma.socialMedia.findUnique({
      where: { id: socialId },
      select: {
        id: true,
        userId: true,
        link: true,
        user: {
          select: {
            username: true,
          }
        }
      }
    });
    return social;
  } catch (err) {
    throw new Error("Failed to fetch socialMedia");
  }
}

export const updateSocialMedia = async (socialId, data) => {
  try {
    const social = await prisma.socialMedia.update({
      where: { id: socialId },
      data: {
        ...data,
      },
      select: {
        id: true,
        userId: true,
        link: true,
        user: {
          select: {
            username: true
          }
        }
      }
    });
    return social;
  } catch (err) {
    throw new Error("Failed to update socialMedia");
  }
}

export const destorySocialMedia = async (socialId) => {
  try {
    const social = await prisma.socialMedia.delete({
      where: { id: socialId },
    });
    return social;
  } catch (err) {
    throw new Error("Failed to delete socialMedia");
  }
}