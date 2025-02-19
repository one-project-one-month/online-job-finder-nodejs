import { HOST, PORT, V1 } from "../configs.js";
import StatusCode from "../errors/StatusCode.js";

const successResponse = (data, message = "Request successful", statusCode = StatusCode.SUCCESS) => {
  return {
    statusCode,
    message,
    data,
  };
};

const errorResponse = (errorDetails = null,message = "Something went wrong", statusCode = StatusCode.INTERNAL_SERVER_ERROR) => {
  return {
    statusCode,
    message,
    error: errorDetails,
  };
};

export { successResponse, errorResponse };
