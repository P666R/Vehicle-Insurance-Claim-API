import mongoose from 'mongoose';
import { systemLogs as logger } from '../utils/logger.js';

export const createMongoConnector = ({ mongoUri }) => {
  const connect = async (options = {}) => {
    try {
      await mongoose.connect(mongoUri, { ...options });
      logger.info('Mongoose connected to MongoDB');
    } catch (error) {
      logger.error('Failed to connect to MongoDB', { error });
      throw error;
    }
  };

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose connection established');
  });
  mongoose.connection.on('error', (error) => {
    logger.error('Mongoose connection error', { error });
  });
  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose disconnected from MongoDB');
  });

  const disconnect = async () => {
    try {
      await mongoose.connection.close();
      logger.info('Mongoose connection closed');
    } catch (error) {
      logger.error('Failed to disconnect from MongoDB', { error });
      throw error;
    }
  };

  return { connect, disconnect };
};
