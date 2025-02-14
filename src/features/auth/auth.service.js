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
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    username: user.username,
    email: user.email,
  };
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  // Ensure userId is passed correctly
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Find user by ID
  const user = await prisma.user.findUnique({
    where: {
      id: userId, // Ensure userId is passed here, which is typically from the JWT or session
    },
    select: {
      id: true,
      email: true,
      password: true, // Don't select password unless you need to verify the old one
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

  return updatedUser;
};

export const authUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      profilePhoto: true,
      email: true,
      roleId: true,
      isInformationCompleted: true,
      version: true,
      createdAt: true,
      updatedAt: true,
      role: {
        select: { name: true },
      },
    },
  });
  return user;
};
