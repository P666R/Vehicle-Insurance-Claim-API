import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import { envConfig } from './config/env.config.js';
import { morganMiddleware } from './middlewares/morgan.middleware.js';
import vehicleClaimRouter from './routes/vehicleClaim.routes.js';

export const createApp = () => {
  const app = express();

  if (envConfig.isDevelopment) {
    app.use(morgan('dev'));
  }

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morganMiddleware);

  app.use('/api/v1/vehicle-claims', vehicleClaimRouter);

  return app;
};
