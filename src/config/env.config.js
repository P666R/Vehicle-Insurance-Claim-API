import 'dotenv/config';
import process from 'process';
import { cleanEnv, port, str } from 'envalid';

export const envConfig = cleanEnv(process.env, {
  NODE_ENV: str({
    default: 'development',
    choices: ['development', 'production', 'test'],
    desc: 'The environment the application is running in',
  }),
  PORT: port({
    default: 3000,
    desc: 'The port the application is running on',
  }),
  MONGODB_URI: str({
    desc: 'MongoDB connection URI (e.g., mongodb://localhost:27017/db)',
  }),
  JWT_SECRET: str({
    desc: 'Secret key used for signing JWT tokens',
  }),
  JWT_EXPIRES_IN: str({
    default: '1d',
    desc: 'JWT token expiration time (e.g., "1h", "1d")',
  }),
});
