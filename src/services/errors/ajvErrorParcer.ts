import { ErrorObject } from "ajv";

export function parseErrors(validationErrors: ErrorObject[]): unknown[] {
  const errors: unknown[] = [];
  validationErrors.forEach((error) => {
    errors.push({ message: error.message });
  });
  return errors;
}
