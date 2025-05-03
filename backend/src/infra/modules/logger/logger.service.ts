import { winstonLoggerConfig } from './config/winston-logger.config';
import { Injectable } from '@nestjs/common';
import { LoggerService as NestLoggerService } from '@nestjs/common';
import { createLogger, Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
    private readonly logger: Logger;
    private context?: string;

    constructor() {
        this.logger = createLogger(winstonLoggerConfig)
    }

    public setContext(context: string) {
        this.context = context;
    }

    log(message: string, context?: string): void {
        this.logger.info(message, { context });
    }

    error(message: string, trace?: string, context?: string): void {
        this.logger.error(message, { trace, context });
    }

    warn(message: string, context?: string): void {
        this.logger.warn(message, { context });
    }

    debug(message: string, context?: string): void {
        this.logger.debug(message, { context });
    }

    info(message: string, context?: string): void {
        this.logger.info(message, { context });
    }
}