import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { ZodError } from 'zod';
import { ZOD_SCHEMA } from '../decorators/zod-schema.decorator';
import { ZodValidationException } from 'nestjs-zod';
import { LoggerService } from 'src/infra/modules/logger/logger.service';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const schema = this.getSchema(metadata);
      
      if (schema) {
        return schema.parse(value);
      }
      return value;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ZodValidationException(error);
      }
      throw error;
    }
  }

  private getSchema(metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    
    if (!metatype) return null;
    
    return Reflect.getMetadata(ZOD_SCHEMA, metatype) || null;
  }
}