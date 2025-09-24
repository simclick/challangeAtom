import { NextFunction, Request, Response } from 'express'; import { getApiKeys } from '../../config/params';
export function apiKeyAuth(req: Request, res: Response, next: NextFunction){
  if (req.method==='OPTIONS') return next();
  const provided = (req.header('x-api-key') || req.header('X-API-Key') || (req.query.api_key as string) || (req.query.key as string) || '').trim();
  const allow = getApiKeys();
  if (!provided || !allow.includes(provided)) return res.status(401).json({ error: 'Unauthorized: invalid or missing API key' });
  next();
}
