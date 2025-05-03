import { z } from 'zod';

export const updateUserSchema = z.object({
    name: z.string().min(1).max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).max(50).optional(),
});

export type UpdateUserInterface = z.infer<typeof updateUserSchema>;
