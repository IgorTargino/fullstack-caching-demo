import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
});

export type CreateUserInterface = z.infer<typeof createUserSchema>;
