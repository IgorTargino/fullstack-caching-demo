import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  INestApplication,
  Logger,
  LoggerService,
} from '@nestjs/common';
import * as fs from 'fs';
import { ZodValidationPipe } from './app/shared/pipes/zod-validation.pipe';
import { patchNestJsSwagger } from 'nestjs-zod';

class App {
  app: INestApplication;
  swaggerConfig: Omit<OpenAPIObject, 'paths'>;

  private logger: LoggerService;

  constructor() {
    this.logger = new Logger('App');
    void this.startSetup();
  }

  async startSetup() {
    try {
      await this.bootstrap();
      this.swaggerSetup();
      await this.serverSetup();
    } catch (err) {
      this.logger.error('Error during application bootstrap', err);
    }
  }

  swaggerSetup() {
    this.swaggerConfig = new DocumentBuilder()
      .setTitle('Crud Caching API')
      .setDescription('API documentation for the application')
      .build();

    const document = SwaggerModule.createDocument(this.app, this.swaggerConfig);
    fs.writeFileSync('./swagger.json', JSON.stringify(document));
    SwaggerModule.setup('api', this.app, document);
  }

  async bootstrap() {
    this.app = await NestFactory.create(AppModule, { logger: this.logger});

    patchNestJsSwagger();
    this.app.useGlobalPipes(new ZodValidationPipe());
  }

  async serverSetup() {
    const port = process.env.NODE_PORT || 3000;

    await this.app.listen(port, () => {
      this.logger.log(
        `Server is running on: http://${process.env.BASE_URL}:${port}`,
      );
    });
  }
}

export default new App();
