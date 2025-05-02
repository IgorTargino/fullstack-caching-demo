import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { ZodSchema } from 'src/app/shared/decorators/zod-schema.decorator';
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string()
});

@ZodSchema(CreateUserSchema)
export class CreateUserDto extends createZodDto(CreateUserSchema) {
  email: string;
  password: string;
  name: string;
}
