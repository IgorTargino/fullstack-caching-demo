import { createZodDto } from 'nestjs-zod';
import { ZodSchema } from 'src/app/shared/decorators/zod-schema.decorator';
import { z } from 'zod';

const userResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

@ZodSchema(userResponseSchema)
export class UserResponseDto extends createZodDto(userResponseSchema){
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date
}

