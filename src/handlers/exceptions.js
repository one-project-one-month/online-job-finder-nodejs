import { newError } from "../errors/httpStautsCode.js";

export function exceptionHandler(handlerFn) {
  return async (...params) => {
    try {
      const data = await handlerFn(...params);
      return data;
    } catch (error) {
      return newError(error.name, error.message);
    }
  };
}
