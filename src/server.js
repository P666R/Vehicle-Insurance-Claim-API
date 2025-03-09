import { envConfig } from './config/env.config.js';
import createApp from './app.js';
import { systemLogs as logger } from './utils/logger.js';

const createServer = ({ app, port, env }) => ({
  start: () => {
    const server = app.listen(port, () => {
      logger.info(`Server running in ${env} mode on port ${port}`);
    });

    return server;
  },
});

const createShutdownHandler = ({ server }) => ({
  shutdown: (signal) => async () => {
    logger.info(`${signal} recieved, shutting down gracefully`);
    try {
      await server.close();
      logger.info('Server closed');
      process.exit(0);
    } catch (error) {
      logger.error('Error shutting down server', { error });
      process.exit(1);
    }
  },
});
const bootstrap = async ({ serverFactory }) => {
  try {
    const server = serverFactory.start();
    const shutdownHandler = createShutdownHandler({ server });
    const shutdown = shutdownHandler.shutdown;

    process.on('SIGINT', shutdown('SIGINT'));
    process.on('SIGTERM', shutdown('SIGTERM'));
    process.on('uncaughtException', async () => {
      await shutdown('uncaughtException')();
    });
    process.on('unhandledRejection', async () => {
      await shutdown('unhandledRejection')();
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
};

const initializeDependecies = () => {
  const app = createApp();

  const serverFactory = createServer({
    app,
    port: envConfig.PORT,
    env: envConfig.NODE_ENV,
  });

  return { serverFactory };
};

(async () => {
  const dependencies = initializeDependecies();
  await bootstrap(dependencies);
})();
