import { Request, Response, NextFunction } from 'express';
export function errorHandler(err: any, _req: any, res: any, _next: any) {
  if (err?.code === 5 || /NOT_FOUND/.test(String(err?.message))) {
    return res.status(404).json({ error: 'Not found' });
  }
  console.error('[ERROR]', err);
  res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' });
}
