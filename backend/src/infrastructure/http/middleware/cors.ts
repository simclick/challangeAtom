 
import cors from 'cors';

 
const raw = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
 
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

 
const toRe = (pattern: string) => {
  // elimina / final y normaliza
  const p = pattern.replace(/\/$/, '');
  // convierte comodín * a .*
  const re = '^' + p.split('*').map(esc).join('.*') + '$';
  return new RegExp(re, 'i');
};

const allowList: RegExp[] = raw.map(toRe);

 
const common = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
 
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Api-Key',
    'X-Firebase-AppCheck',
    'X-Requested-With',
  ],
  credentials: true,
  optionsSuccessStatus: 204,
};

export const corsMw =
  allowList.length === 0
    // Dev: refleja el origen y los headers que pida el navegador
    ? cors({ origin: true, ...common })
    // Prod/QA: solo orígenes permitidos (con soporte a comodines)
    : cors({
        origin: (origin, cb) => {
          // En same-origin o llamadas server-to-server, 'origin' puede venir vacío -> permitir
          if (!origin) return cb(null, true);
          const o = origin.replace(/\/$/, '');
          const ok = allowList.some(re => re.test(o));
          return ok ? cb(null, true) : cb(new Error('CORS blocked'));
        },
        ...common,
      });
