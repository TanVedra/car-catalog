class CustomError extends Error {
  public readonly code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class NotFoundError extends CustomError {
  constructor (message: string) {
    super(message, 404);
  }
}

class ValidationError extends CustomError {
  public errors: any[];
  constructor (message: string, errors: any[] = []) {
    super(message, 412);
    this.errors = errors;
  }
}

export {
  CustomError,
  NotFoundError,
  ValidationError,
};
