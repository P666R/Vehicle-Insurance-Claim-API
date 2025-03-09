import ErrorHandler from './error.factory.js';

const errorMiddleware = (dependencies) => {
  const errorHandler = new ErrorHandler(dependencies);
  return errorHandler.handleHttpError.bind(errorHandler);
};

export default errorMiddleware;
