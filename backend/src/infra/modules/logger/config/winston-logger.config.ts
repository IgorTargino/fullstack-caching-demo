import { format, transports } from 'winston';

export const winstonLoggerConfig = {
    level: process.env.LOG_LEVEL || 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize({ all: true }),
            format.printf(({ timestamp, level, message, context, trace }) => {
          return `${timestamp} [${level}] [${context || 'Application'}]: ${
            message
          } ${trace ? `\nTrace: ${trace}` : ''}`;
        }),
    ),
    transports: [
        new transports.Console(),
    ],
};