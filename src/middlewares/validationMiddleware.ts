import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import addKeywords from "ajv-keywords";
import { Request, Response, NextFunction, RequestHandler } from "express";

import { parseErrors } from "../services/errors/ajvErrorParcer";
import { ValidationError, CustomError } from "../services/errors/errorWrappers";
import logger from "../services/logger";

const ajv = new Ajv({
  allErrors : true,
  verbose   : true,
});
ajvErrors(ajv);
addFormats(ajv);
addKeywords(ajv);

export function validationMiddleware <T extends object> (
  ajvSchema: T,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      let data;
      const validateSchema = ajv.compile(ajvSchema);

      if (Array.isArray(req.body)) {
        data = req.body;
      } else if (typeof req.body === "object" || req.body === undefined) {
        data = { ...req.query, ...req.params, ...req.body };
      } else {
        throw new ValidationError("Request body must be either an object or an array.");
      }
      const isValid = validateSchema(data);

      if (!isValid && validateSchema.errors) {
        const errors = parseErrors(validateSchema.errors);
        throw new ValidationError("Validation Error", errors);
      }
      next();
    } catch (error) {
      if (!(error instanceof CustomError)) {
        logger.error(`[ID=${req.requestId}]: Unexpected error occured in the validation middleware`);
      }
      next(error);
    }
  };
}
