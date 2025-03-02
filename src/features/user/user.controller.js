import { StatusCode } from "../../errors/StatusCode.js";
import {
  createUser,
  getAllUsers,
  getUserById,
  destroyUser,
  getUserSavedJobs,
} from "./user.service.js";

export const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body, req);
    res.status(StatusCode.SUCCESS).json({ data: user });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(StatusCode.SUCCESS).json({ data: users });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: user });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const destroyUserController = async (req, res) => {
  try {
    await destroyUser(req.params.id);
    res.status(StatusCode.SUCCESS).json({ status: "success" });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};

export const getUserSavedJobsController = async (req, res) => {
  try {
    const savedJobs = await getUserSavedJobs(req);
    res.status(StatusCode.SUCCESS).json({ data: savedJobs });
  } catch (error) {
    res
      .status(StatusCode.BAD_REQUEST)
      .json({ status: "error", message: error.message });
  }
};
