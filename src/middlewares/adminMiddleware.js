import prisma from "../database/index.js";
import { StatusCode } from "../errors/StatusCode.js";

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: "Unauthorized: No user logged in" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { role: true },
    });

    if (!user || user.role.name !== "Admin") {
      return res
        .status(StatusCode.FORBIDDEN)
        .json({ message: "Forbidden: Admin access only" });
    }

    next();
  } catch (error) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error", error: error.message });
  }
};

export default adminMiddleware;
