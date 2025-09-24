// tests/integration/tasks.spec.ts
/// <reference types="jest" />
import request from 'supertest';
import { app } from '../../src/infrastructure/http/api';

const KEY = { 'x-api-key': 'dev-123' };
const api = () => request(app); // <- sin anotar tipos

describe('Tasks integ (Firestore emulator)', () => {
  beforeAll(() => {
    process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
    process.env.TASKS_API_KEYS = KEY['x-api-key'];
  });

  it('CRUD', async () => {
    const email = `t${Date.now()}@mail.com`;

    let r = await api().post('/users').set(KEY).send({ email });
    expect(r.status).toBe(201);

    r = await api().post('/tasks').set(KEY).send({
      userEmail: email, title: 'T1', description: 'd', completed: false, createdAt: new Date().toISOString()
    });
    const id = r.body.id;

    r = await api().get('/tasks').set(KEY).query({ email });
    expect(r.status).toBe(200);

    r = await api().put(`/tasks/${id}`).set(KEY).send({ completed: true });
    expect(r.status).toBe(200);

    r = await api().delete(`/tasks/${id}`).set(KEY);
    expect([200,204]).toContain(r.status);
  });
});
