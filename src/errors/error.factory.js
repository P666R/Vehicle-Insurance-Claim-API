import { systemLogs as logger } from '../utils/logger.js';

class ErrorHandler {
  constructor({ env } = {}) {
    this.env = env || { isProduction: false };
  }

  // Handle HTTP errors
  // eslint-disable-next-line no-unused-vars
  handleHttpError(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const isProduction = this.env.isProduction;

    // Log error details
    logger.error(err.name || 'Error', {
      message: err.message,
      stack: isProduction ? undefined : err.stack,
      statusCode,
      method: req.method,
      path: req.path,
      details: err.details || {},
    });

    // Send response
    res.status(statusCode).json({
      error: err.name || 'Internal Server Error',
      message: err.message || 'Something went wrong',
      ...(isProduction ? {} : { stack: err.stack, details: err.details }),
    });
  }

  // Handle uncaught exceptions
  async handleUncaughtException(error) {
    logger.error('Uncaught exception', {
      message: error.message,
      stack: error.stack,
    });
    return error; // Return for shutdown handler
  }

  // Handle unhandled promise rejections
  async handleUnhandledRejection(reason) {
    logger.error('Unhandled promise rejection', {
      message: reason.message || 'Unknown reason',
      stack: reason.stack,
    });
    return reason; // Return for shutdown handler
  }
}

export default ErrorHandler;
