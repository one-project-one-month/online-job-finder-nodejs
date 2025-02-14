import { StatusCode } from "../../errors/StatusCode.js";
import {
  authUser,
  changePassword,
  loginUser,
  registerUser,
} from "./auth.service.js";

export const registerController = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(StatusCode.OK).json(user);
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    if (result.token) {
      res.json(result);
    } else {
      res
        .status(statusCode.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const changePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const response = await changePassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    res.json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(statusCode.BAD_REQUEST).json({ message: error.message });
  }
};

export const authUserController = async (req, res) => {
  try {
    console.log("Authenticated User ID: ", req.user.id);

    const userId = req.user.id;

    const user = await authUser(userId);

    if (!user) {
      return res
        .status(statusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user: ", error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch user" });
  }
};
