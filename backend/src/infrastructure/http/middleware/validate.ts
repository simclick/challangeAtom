import { ZodSchema } from 'zod'; import { NextFunction, Request, Response } from 'express';
export function validateBody(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => { const p = schema.safeParse(req.body); if (!p.success) return res.status(400).json({ error: p.error.flatten() }); req.body = p.data; next(); };
}
