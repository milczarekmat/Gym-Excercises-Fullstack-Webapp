const { createLogger, transports } = require('winston')
import { AppError, BadRequestError, CredentialsError } from './appErrors'

const LogErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app_error.log' }),
  ],
})

class ErrorLogger {
  constructor() {}
  async logError(err) {
    console.log('==================== Start Error Logger ===============')
    LogErrors.log({
      private: true,
      level: 'error',
      message: `${new Date()}-${JSON.stringify(err)}`,
    })
    console.log('==================== End Error Logger ===============')
    // log error with Logger plugins

    return false
  }

  isTrustError(error) {
    if (error instanceof AppError) {
      return error.isOperational
    } else {
      return false
    }
  }
}

const ErrorHandler = async (err, req, res, next) => {
  const errorLogger = new ErrorLogger()

  if (err) {
    console.log(err, '-------> ERROR')
    await errorLogger.logError(err)

    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).json({ message: err.message })
    }

    if (err instanceof CredentialsError) {
      return res.status(err.statusCode).json({ message: err.message })
    }

    if (errorLogger.isTrustError(err)) {
      const statusCode = err.statusCode || 500
      const message =
        err.errorStack || err.message || 'An unexpected error occurred'
      return res.status(statusCode).json({ message })
    } else {
      // Log the error and respond with a generic error message
      console.error(err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  next()
}
export { ErrorHandler }
