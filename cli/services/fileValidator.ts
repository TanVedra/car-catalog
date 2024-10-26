import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import addKeywords from "ajv-keywords";

import { parseErrors } from "../../src/services/errors/ajvErrorParcer";
import { ValidationError, CustomError } from "../../src/services/errors/errorWrappers";
import logger from "../../src/services/logger";

const ajv = new Ajv({
  allErrors : true,
  verbose   : true,
});
ajvErrors(ajv);
addFormats(ajv);
addKeywords(ajv);

export function fileValidator <T extends object, K> (
  ajvSchema: T,
  dataToValidate: K,
): void {

  try {
    const validateSchema = ajv.compile(ajvSchema);

    const isValid = validateSchema(dataToValidate);

    if (!isValid && validateSchema.errors) {
      const errors = parseErrors(validateSchema.errors);
      throw new ValidationError("Validation Error", errors);
    }
  } catch (error) {
    if (!(error instanceof CustomError)) {
      logger.error("Unexpected error occured while validating file data");
    }
    throw error;
  }
}
