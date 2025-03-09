import { envConfig } from './config/env.config.js';
import { createApp } from './app.js';
import { systemLogs as logger } from './utils/logger.js';
import { createMongoConnector as mongoConnectorFactory } from './config/db.mongo.js';

const SERVER_SHUTDOWN_TIMEOUT = 5000;
const GLOBAL_SHUTDOWN_TIMEOUT = 10000;

const createServer = ({ app, port, env }) => ({
  start: () => {
    const server = app.listen(port, () => {
      logger.info(`Server running in ${env} mode on port ${port}`);
    });

    return server;
  },
});

const closeServer = async (server) => {
  return new Promise((resolve, reject) => {
    const timeoutTimer = setTimeout(
      () => reject(new Error('Server close timeout')),
      SERVER_SHUTDOWN_TIMEOUT,
    );
    server.close((error) => {
      clearTimeout(timeoutTimer);
      if (error) reject(new Error('Failed to close server'));
      else resolve();
    });
  });
};

const shutdownProcedure = async ({ mongoConnector, server }) => {
  await mongoConnector.disconnect();
  logger.info('MongoDB connection closed');

  await closeServer(server);
  logger.info('Server closed');

  process.removeAllListeners('SIGINT');
  process.removeAllListeners('SIGTERM');
  process.removeAllListeners('uncaughtException');
  process.removeAllListeners('unhandledRejection');
};

const handleShutdown = async ({ mongoConnector, server }) => {
  try {
    await Promise.race([
      shutdownProcedure({ mongoConnector, server }),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Shutdown timeout exceeded')),
          GLOBAL_SHUTDOWN_TIMEOUT,
        ),
      ),
    ]);
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown', { error });
    process.exit(1);
  }
};

const createShutdownHandler = ({ mongoConnector, server }) => {
  let shuttingDown = false;
  return {
    shutdown: (signal) => async () => {
      if (shuttingDown) {
        logger.warn(`Already shutting down. Ignoring ${signal} signal`);
        return;
      }
      shuttingDown = true;
      logger.info(`${signal} received, shutting down gracefully`);

      await handleShutdown({ mongoConnector, server });
    },
  };
};

const bootstrap = async ({ mongoConnector, serverFactory }) => {
  try {
    await mongoConnector.connect();
    const server = serverFactory.start();
    const shutdownHandler = createShutdownHandler({ mongoConnector, server });
    const shutdown = shutdownHandler.shutdown;

    process.on('SIGINT', shutdown('SIGINT'));
    process.on('SIGTERM', shutdown('SIGTERM'));
    process.on('uncaughtException', async (error) => {
      logger.error('Uncaught Exception:', { error });
      await shutdown('uncaughtException')();
    });
    process.on('unhandledRejection', async (reason) => {
      logger.error('Unhandled Rejection:', { reason });
      await shutdown('unhandledRejection')();
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
};

const initializeDependencies = () => {
  const app = createApp();

  const mongoConnector = mongoConnectorFactory({
    mongoUri: envConfig.MONGODB_URI,
  });

  const serverFactory = createServer({
    app,
    port: envConfig.PORT,
    env: envConfig.NODE_ENV,
  });

  return { mongoConnector, serverFactory };
};

(async () => {
  const dependencies = initializeDependencies();
  await bootstrap(dependencies);
})();
