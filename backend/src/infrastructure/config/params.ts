import { defineSecret } from 'firebase-functions/params';
export const TASKS_API_KEYS = defineSecret('TASKS_API_KEYS');
export function getApiKeys(): string[] {
  const env = process.env.TASKS_API_KEYS;
  let raw = env && env.trim().length ? env : '';
  try { if (!raw) raw = TASKS_API_KEYS.value(); } catch {}
  return (raw || '').split(',').map(s => s.trim()).filter(Boolean);
}
