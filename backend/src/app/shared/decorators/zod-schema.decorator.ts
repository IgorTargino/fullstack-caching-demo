import { SetMetadata } from '@nestjs/common';
import { ZodObject } from 'zod';

export const ZOD_SCHEMA = 'ZOD_SCHEMA';

export function ZodSchema(schema: ZodObject<any>) {
  return SetMetadata(ZOD_SCHEMA, schema);
}