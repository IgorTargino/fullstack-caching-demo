import { createZodDto } from 'nestjs-zod';
import { ZodSchema } from 'src/app/shared/decorators/zod-schema.decorator';
import { z } from 'zod';

const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

@ZodSchema(updateUserSchema)
export class UpdateUserDto extends createZodDto(updateUserSchema) {
  name?: string;  
  email?: string;
  password?: string;
}