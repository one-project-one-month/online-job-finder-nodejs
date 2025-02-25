/// for hanlding logic

import { StatusCode } from "../../errors/StatusCode.js";
import {
  getAllUsersAccount,
  getUserAccount,
  getUserSavedJobs,
} from "./user.service.js";

export const getAllUsersAccountController = async (req, res) => {
  try {
    const users = await getAllUsersAccount();
    res.status(StatusCode.SUCCESS).json({ data: users });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const getUserAccountByIdController = async (req, res) => {
  try {
    const user = await getUserAccount(req.params.id);
    res.status(StatusCode.SUCCESS).json({ data: user });
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
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
