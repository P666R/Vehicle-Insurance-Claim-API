/**
 * Initializes and configures a Winston logger with daily rotating file transports
 * for general logs, error logs, exceptions, and rejections. The logger is set up
 * to log in JSON format and includes a console transport in development mode.
 *
 * Also sets up a Morgan middleware to log HTTP requests in JSON format, which
 * are then processed by the Winston logger. The logs directory is created if it
 * does not exist.
 *
 * The logger's behavior is influenced by the environment configuration, enabling
 * different logging levels and transports based on whether the application is in
 * development, testing, or production mode.
 */

import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import DailyRotateFile from 'winston-daily-rotate-file';
import { createLogger, format, transports } from 'winston';
import { envConfig } from '../config/env.config.js';

const { combine, timestamp, colorize, printf, json } = format;

// --- Setup Logs Directory ---
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const isDevelopment = envConfig.isDevelopment;
const isTest = envConfig.isTest;

// --- Custom JSON Formatter ---
const customJsonFormat = format((info) => {
  const { timestamp, level, message, ...metadata } = info;
  return { timestamp, level, message, ...metadata };
})();

// --- Define Transports ---
const fileRotateTransport = new DailyRotateFile({
  filename: path.join(logsDir, 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  maxSize: '20m',
});

const errorRotateTransport = new DailyRotateFile({
  filename: path.join(logsDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxFiles: '14d',
  maxSize: '20m',
});

const transportsList = [fileRotateTransport, errorRotateTransport];

// --- Console transport is only added in development (and not in tests) ---
if (isDevelopment && !isTest) {
  const consoleTransport = new transports.Console({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }),
      colorize(),
      printf(({ level, message, timestamp, ...metadata }) => {
        const metaString = Object.keys(metadata).length
          ? ` ${JSON.stringify(metadata)}`
          : '';
        return `${timestamp} [${level}]: ${message}${metaString}`;
      }),
    ),
  });
  transportsList.push(consoleTransport);
}

// --- Create Winston Logger ---
export const systemLogs = createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }),
    customJsonFormat,
    json(),
  ),
  transports: transportsList,
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      maxSize: '20m',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.join(logsDir, 'rejections-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      maxSize: '20m',
    }),
  ],
  exitOnError: false,
  silent: isTest,
});

systemLogs.info(`Logger initialized in ${envConfig.NODE_ENV} mode`);

// --- Morgan Middleware Setup ---
// - Here we define a JSON format that captures key details from each HTTP request.
// - Morgan writes to the provided stream which then forwards the parsed JSON to Winston.
export const morganMiddleware = morgan(
  (tokens, req, res) =>
    JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: tokens['response-time'](req, res),
    }),
  {
    stream: {
      write: (message) => {
        const logMessage = message.trim();
        if (logMessage) {
          try {
            const data = JSON.parse(logMessage);
            systemLogs.http('incoming-request', data);
          } catch (error) {
            systemLogs.error('Error parsing morgan log message', {
              error: error.message,
              original: logMessage,
            });
          }
        }
      },
    },
  },
);
