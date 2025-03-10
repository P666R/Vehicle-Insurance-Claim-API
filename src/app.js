import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import { envConfig } from './config/env.config.js';
import { morganMiddleware } from './utils/logger.js';
import { setupSwagger } from './config/swagger.config.js';
import vehicleClaimRouter from './routes/vehicleClaim.routes.js';
import { errorMiddleware, NotFoundError } from './errors/index.js';

export const createApp = () => {
  const app = express();

  if (envConfig.isDevelopment) {
    app.use(morgan('dev'));
  }

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morganMiddleware);

  setupSwagger(app);

  app.use('/api/v1/vehicle-claims', vehicleClaimRouter);

  app.all('*', (req, res, next) => {
    next(
      new NotFoundError('Route not found', {
        method: req.method,
        path: req.path,
      }),
    );
  });

  app.use(errorMiddleware({ env: { isProduction: envConfig.isProduction } }));

  return app;
};
