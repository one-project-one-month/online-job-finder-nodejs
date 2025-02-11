import { HttpStatusCode } from "../errors/statusCode";

const auth = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ status: "fail", message: "unauthorized" });
  }

  req.user = user;
  next();
};

export default auth;
