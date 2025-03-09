import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import { envConfig } from './config/env.config.js';
import { systemLogs as logger, morganMiddleware } from './utils/logger.js';

const createApp = () => {
  const app = express();

  if (envConfig.isDevelopment) {
    app.use(morgan('dev'));
  }

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morganMiddleware);

  app.get('/', (req, res) => {
    logger.info('Welcome to Vehicle Insurance Claim API');
    res.status(200).json({
      message: 'Welcome to Vehicle Insurance Claim API',
    });
  });

  return app;
};

export default createApp;
