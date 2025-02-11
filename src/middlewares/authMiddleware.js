import { statusCode } from "../errors/statusCode";

const auth = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json({ status: "fail", message: "unauthorized" });
  }

  req.user = user;
  next();
};

export default auth;
