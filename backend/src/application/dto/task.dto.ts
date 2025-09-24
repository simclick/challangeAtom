import { z } from 'zod';
export const CreateTaskDTO = z.object({ userEmail: z.string().email(), title: z.string().min(1), description: z.string().optional(), completed: z.boolean().optional(), createdAt: z.string().datetime().optional() });
export const UpdateTaskDTO = z.object({ title: z.string().min(1).optional(), description: z.string().optional(), completed: z.boolean().optional() });
export type CreateTaskInput = z.infer<typeof CreateTaskDTO>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskDTO>;
