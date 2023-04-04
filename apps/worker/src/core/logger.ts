import winston from 'winston';

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.label({ label: 'server' }),
    winston.format.simple(),
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: () => new Date().toISOString() }),
    winston.format.printf(({ level, message, label, timestamp }) => {
      return `[${label}:${level}] ${message} (${timestamp})`;
    })
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      silent: false,
      debugStdout: true,
      handleExceptions: true,
    }),
    new winston.transports.File({ filename: './error.log', level: 'error' }),
  ],
});

export default logger;
