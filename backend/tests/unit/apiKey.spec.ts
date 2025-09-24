// tests/unit/apiKey.spec.ts
import request from 'supertest';
import { buildApp } from '../../src/infrastructure/http/api';
import { Router } from 'express';

const KEY = { 'x-api-key': 'dev-123' };

describe('API Key middleware', () => {
  // Router fake que simula /users y no toca BD
  const fakeUsers = Router();
  fakeUsers.get('/:email', (req, res) => res.status(200).json({ ok: true, email: req.params.email }));

  // App con override de usersRouter
  const app = buildApp({ usersRouter: fakeUsers });

  beforeAll(() => {
    process.env.TASKS_API_KEYS = 'dev-123';
  });

  it('401 sin x-api-key', async () => {
    const r = await request(app).get('/users/a@mail.com');
    expect(r.status).toBe(401);
  });

  it('200 /health (no requiere key por diseño)', async () => {
    const r = await request(app).get('/health');
    expect(r.status).toBe(200);
  });

  it('200 /users con key válida', async () => {
    const r = await request(app).get('/users/test@mail.com').set(KEY as any);
    expect(r.status).toBe(200);        // pasó el guard
    expect(r.body.ok).toBe(true);
  });
});
