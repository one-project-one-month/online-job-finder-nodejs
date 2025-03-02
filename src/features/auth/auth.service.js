import bcrypt from "bcryptjs";
import prisma from "../../database/index.js";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    username: user.username,
    email: user.email,
  };
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Now perform the password check and change logic
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  // Proceed with changing the password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return json("Password changed successfully");
};

export const authUser = async (userId) => {
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
<<<<<<< HEAD
=======
          skills: {
            select: {
              id: true,
              skillId: true,
            },
          },
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
>>>>>>> 7b0e60d2298a1a848d13933e8b51abaaf10c4758
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
};

export const authUserSkill = async (req) => {
  const userId = req.user.id;
  try {
    const applicantProfile = await prisma.applicantProfile.findMany({
      where: { userId },
      select: {
        skills: true,
      },
    });
    return applicantProfile;
  } catch (error) {
    throw new Error("fail to fetch user skill", error);
  }
};
