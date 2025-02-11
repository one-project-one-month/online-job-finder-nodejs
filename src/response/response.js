import { HOST, PORT, V1 } from "../configs.js";
import httpStautsCode from "../errors/httpStautsCode.js";

const apiRes = () => {
  return {
    // format success response json 
    success: (data, message = "Request successful", statusCode = httpStautsCode.success) => {
      return {
        statusCode,
        message,
        data, 
      };
    },
      // format error response json
    error: (message = "Something went wrong", statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR, errorDetails = null) => {
      return {
        statusCode,
        message,
        error: errorDetails, 
      };
    }
  };
};

export { apiRes };
