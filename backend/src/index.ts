// backend/src/index.ts
import { app } from './infrastructure/http/api';
import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
 
 
const CORS_ORIGINS = defineSecret('CORS_ORIGINS');
const TASKS_API_KEYS = defineSecret('TASKS_API_KEYS');
 

 
setGlobalOptions({
  region: 'us-central1'
});

 
export const api = onRequest(
  {
    secrets: [CORS_ORIGINS, TASKS_API_KEYS ],
 
  },
  app
);