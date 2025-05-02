import { createZodDto } from 'nestjs-zod';
import { ZodSchema } from 'src/app/shared/decorators/zod-schema.decorator';
import { z } from 'zod';

const createUserRepositorySchema = z.object({
  email: z.string().email(),
  passwordHash: z
    .string()
    .min(60, 'Hash password must be at least 60 characters long') 
    .max(60, 'Hash password must be at most 60 characters long')
    .regex(/^\$2[aby]\$.{56}$/, 'Invalid bcrypt hash format'), 
  name: z.string().optional(),
});

@ZodSchema(createUserRepositorySchema)
export class CreateUserRepositoryDto extends createZodDto(createUserRepositorySchema) {
  email: string;
  passwordHash: string;
  name: string;
}
