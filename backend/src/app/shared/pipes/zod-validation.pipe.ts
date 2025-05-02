import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { ZodError } from 'zod';
import { ZOD_SCHEMA } from '../decorators/zod-schema.decorator';

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
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.errors,
          statusCode: 400,
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }

  private getSchema(metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    
    if (!metatype) return null;
    
    return Reflect.getMetadata(ZOD_SCHEMA, metatype) || null;
  }
}