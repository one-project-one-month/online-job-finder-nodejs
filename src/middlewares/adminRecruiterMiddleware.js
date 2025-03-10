import prisma from "../database/index.js";
import { StatusCode } from "../errors/StatusCode.js";

const roleMiddleware = (allowedRoles) => async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized: No user logged in" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { role: true },
    });

    if (!user || !allowedRoles.includes(user.role.name)) {
      return res
        .status(StatusCode.FORBIDDEN)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error", error: error.message });
  }
};

export const adminMiddleware = roleMiddleware(["Admin"]);

export const adminRecruiterMiddleware = roleMiddleware(["Admin", "Recruiter"]);
