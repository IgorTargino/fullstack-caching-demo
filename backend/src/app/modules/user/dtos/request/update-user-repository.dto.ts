import { createZodDto } from 'nestjs-zod';
import { ZodSchema } from 'src/app/shared/decorators/zod-schema.decorator';
import { z } from 'zod';

const updateUserRepositorySchema = z.object({
  email: z.string().email().optional(),
  passwordHash: z
    .string()
    .min(60, 'Hash password must be at least 60 characters long') 
    .max(60, 'Hash password must be at most 60 characters long')
    .regex(/^\$2[aby]\$.{56}$/, 'Invalid bcrypt hash format')
    .optional(), 
  name: z.string().optional(),
});

@ZodSchema(updateUserRepositorySchema)
export class UpdateUserRepositoryDto extends createZodDto(updateUserRepositorySchema){
  email?: string;
  passwordHash?: string;
  name?: string;
}
