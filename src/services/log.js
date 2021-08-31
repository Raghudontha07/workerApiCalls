import Pino from 'express-pino-logger';

// Add Middlewares
export const LogMiddleware = Pino({
  name: 'workersAPI'
});

export const Log = LogMiddleware.logger;
