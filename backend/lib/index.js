"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
// backend/src/index.ts
const api_1 = require("./infrastructure/http/api");
const https_1 = require("firebase-functions/v2/https");
const v2_1 = require("firebase-functions/v2");
const params_1 = require("firebase-functions/params");
const CORS_ORIGINS = (0, params_1.defineSecret)('CORS_ORIGINS');
const TASKS_API_KEYS = (0, params_1.defineSecret)('TASKS_API_KEYS');
(0, v2_1.setGlobalOptions)({
    region: 'us-central1'
});
exports.api = (0, https_1.onRequest)({
    secrets: [CORS_ORIGINS, TASKS_API_KEYS],
}, api_1.app);
//# sourceMappingURL=index.js.map