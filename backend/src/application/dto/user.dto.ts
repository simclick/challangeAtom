import { z } from 'zod';
export const CreateUserDTO = z.object({ email: z.string().email(), displayName: z.string().optional() });
export type CreateUserInput = z.infer<typeof CreateUserDTO>;
