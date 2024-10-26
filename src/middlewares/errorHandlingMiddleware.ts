import { Request, Response, NextFunction } from "express";

import { CustomError, ValidationError } from "../services/errors/errorWrappers";
import logger from "../services/logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorHandlingMiddlware(error: Error | CustomError, req: Request, res: Response, next: NextFunction): void {
  if (error instanceof ValidationError) {
    logger.error(`[ID=${req.requestId}]: ${error.name}:\n`, error);
    res.render(
      "errorBubble",
      {
        layout          : "error",
        title           : "Error",
        code            : error.code,
        errors          : error.errors,
        message         : error.message,
        isErrorMessages : !!error?.errors.length,
      });
  } else if (error instanceof CustomError) {
    logger.error(`[ID=${req.requestId}]: ${error.name}:\n`, error);
    res.render(
      "errorBubble",
      {
        layout  : "error",
        title   : "Error",
        code    : error.code,
        message : error.message,
      });
  } else {
    logger.error(`[ID=${req.requestId}]: Internal server error:\n`, error);
    res.render(
      "errorBubble",
      {
        layout  : "error",
        title   : "Error",
        code    : 500,
        message : "Internal server error.",
      });
  }
}
