import { systemLogs as logger } from '../utils/logger.js';

class ErrorHandler {
  constructor({ env } = {}) {
    this.env = env || { isProduction: false };
  }

  // eslint-disable-next-line no-unused-vars
  handleHttpError(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const isProduction = this.env.isProduction;

    logger.error(err.name || 'Error', {
      message: err.message,
      stack: isProduction ? undefined : err.stack,
      statusCode,
      method: req.method,
      path: req.path,
      details: err.details || {},
    });

    res.status(statusCode).json({
      error: err.name || 'Internal Server Error',
      message: err.message || 'Something went wrong',
      ...(isProduction ? {} : { stack: err.stack, details: err.details }),
    });
  }

  async handleUncaughtException(error) {
    logger.error('Uncaught exception', {
      message: error.message,
      stack: error.stack,
    });
    return error;
  }

  async handleUnhandledRejection(reason) {
    logger.error('Unhandled promise rejection', {
      message: reason.message || 'Unknown reason',
      stack: reason.stack,
    });
    return reason;
  }
}

export default ErrorHandler;
