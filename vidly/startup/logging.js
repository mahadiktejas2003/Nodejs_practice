const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
  // Define custom format
  const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `[${timestamp}] ${level}: ${stack || message}`;
    })
  );

  // Handle uncaught exceptions
  winston.exceptions.handle(
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  // File transport for normal logs
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));

  // MongoDB transport for storing logs
  winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/vidly',
    level: 'info',
    options: { useUnifiedTopology: true },
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }));
};
