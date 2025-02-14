
import jwt from "jsonwebtoken";
import { StatusCode } from "../errors/statusCode";

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(403).json({ error: "Unauthorized" });
  if (!user) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ status: "fail", message: "unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

export default authenticateToken;
