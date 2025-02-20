import { newError } from "../errors/StatusCode.js";

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
