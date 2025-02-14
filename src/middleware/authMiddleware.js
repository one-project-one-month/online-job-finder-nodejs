import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/configs.js';
import HttpStatusCode from '../errors/StatusCode';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const isAuthHeaderValid = authHeader && authHeader.startsWith('Bearer ');

  if (!isAuthHeaderValid) {
    return sendInvalidTokenResponse(res);
  }

  const token = authHeader.split(' ')[1];
  return handleTokenValidation(token, req, res, next);
};

const sendInvalidTokenResponse = (res) => {
  return res.status(HttpStatusCode.UNAUTHORIZED).json({
    message: "Unauthorized Access",
    error: "Invalid Token",
    statusCode: HttpStatusCode.UNAUTHORIZED,
  });
};

const handleTokenValidation = (token, req, res, next) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return sendInvalidTokenResponse(res);
  }
};

export default authMiddleware;
