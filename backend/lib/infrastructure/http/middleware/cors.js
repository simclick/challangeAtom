"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMw = void 0;
const cors_1 = __importDefault(require("cors"));
const raw = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const toRe = (pattern) => {
    // elimina / final y normaliza
    const p = pattern.replace(/\/$/, '');
    // convierte comodín * a .*
    const re = '^' + p.split('*').map(esc).join('.*') + '$';
    return new RegExp(re, 'i');
};
const allowList = raw.map(toRe);
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
exports.corsMw = allowList.length === 0
    // Dev: refleja el origen y los headers que pida el navegador
    ? (0, cors_1.default)({ origin: true, ...common })
    // Prod/QA: solo orígenes permitidos (con soporte a comodines)
    : (0, cors_1.default)({
        origin: (origin, cb) => {
            // En same-origin o llamadas server-to-server, 'origin' puede venir vacío -> permitir
            if (!origin)
                return cb(null, true);
            const o = origin.replace(/\/$/, '');
            const ok = allowList.some(re => re.test(o));
            return ok ? cb(null, true) : cb(new Error('CORS blocked'));
        },
        ...common,
    });
//# sourceMappingURL=cors.js.map