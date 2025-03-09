/**
 * Configures and validates environment variables using the `envalid` library.
 *
 * This configuration ensures that the necessary environment variables are set
 * and provides default values for development. It includes:
 * `NODE_ENV`: Specifies the environment ('development', 'production', 'test'),
 *  with 'development' as the default.
 * `PORT`: The port number for the server, defaulting to 3000 in development.
 * `MONGODB_URI`: The MongoDB connection URI, defaulting to a local database in development.
 * `JWT_SECRET`: The secret key for JWT, with a default value for development.
 * `JWT_EXPIRES_IN`: The expiration time for JWT, defaulting to '1d' in development.
 */

import 'dotenv/config';
import process from 'process';
import { cleanEnv, port, str } from 'envalid';

export const envConfig = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    devDefault: 'development',
  }),
  PORT: port({ devDefault: 3000 }),
  MONGODB_URI: str({
    devDefault: 'mongodb://localhost:27017/vehicle-insurance-claim',
  }),
  JWT_SECRET: str({ devDefault: 'secret' }),
  JWT_EXPIRES_IN: str({ devDefault: '1d' }),
});
