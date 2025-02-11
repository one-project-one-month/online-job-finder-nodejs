import { HOST, PORT, V1 } from "../configs.js";
import HttpStautsCode from "../errors/HttpStautsCode.js";

const apiRes = () => {
  return {
    // format success response json 
    success: (data, message = "Request successful", statusCode = HttpStautsCode.success) => {
      return {
        statusCode,
        message,
        data, 
      };
    },
      // format error response json
    error: (message = "Something went wrong", statusCode = HttpStautsCode.INTERNAL_SERVER_ERROR, errorDetails = null) => {
      return {
        statusCode,
        message,
        error: errorDetails, 
      };
    }
  };
};

export { apiRes };
