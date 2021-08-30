// Copyright (C) 2018 Berkadia Commercial Mortgage, LLC - All Rights Reserved
import Pino from 'express-pino-logger';

// Add Middlewares
export const LogMiddleware = Pino({
  name: 'Workers_usage'
  // , level: 'debug'
});

export const Log = LogMiddleware.logger;
