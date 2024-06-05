const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
}

class AppError extends Error {
  statusCode: number
  isOperational: boolean
  errorStack: unknown
  logError: unknown

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: boolean,
    errorStack: boolean,
    logingErrorResponse: unknown
  ) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.errorStack = errorStack
    this.logError = logingErrorResponse
    Error.captureStackTrace(this)
  }
}

//api Specific Errors
class APIError extends AppError {
  constructor(
    name: string,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = 'Internal Server Error',
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational, false, null)
  }
}

//400
class BadRequestError extends AppError {
  constructor(description = 'Bad request', logingErrorResponse: unknown) {
    super(
      'NOT FOUND',
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      false,
      logingErrorResponse
    )
  }
}

//400
class ValidationError extends AppError {
  constructor(description = 'Validation Error', errorStack: unknown) {
    super(
      'BAD REQUEST',
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      false,
      errorStack
    )
  }
}

export { AppError, APIError, BadRequestError, ValidationError, STATUS_CODES }
