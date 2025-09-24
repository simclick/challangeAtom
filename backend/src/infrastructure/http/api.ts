// backend/src/infrastructure/http/api.ts
import express, { json, urlencoded, Router } from 'express';
import { corsMw } from './middleware/cors';
import { errorHandler } from './middleware/error-handler';
import { tasksRouter } from './controllers/tasks.controller';
import { usersRouter } from './controllers/users.controller';
import { apiKeyAuth } from './middleware/api-key';
 

export type AppOverrides = {
  usersRouter?: Router;
  tasksRouter?: Router;
};

export function buildApp(overrides: AppOverrides = {}) {
  const app = express();
  app.set('trust proxy', 1);

  app.use(corsMw);
  app.options('*', corsMw);
  app.use(urlencoded({ extended: false }));
  app.use(json({ limit: '1mb' }));

  // Salud sin guards
  app.get('/health', (_req, res) => res.status(200).json({ ok: true }));
 
 
  app.use(apiKeyAuth);
 

  // Permitir reemplazos en tests
  app.use('/tasks', overrides.tasksRouter ?? tasksRouter);
  app.use('/users', overrides.usersRouter ?? usersRouter);

  app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));
  app.use(errorHandler);
  return app;
}

export const app = buildApp();
