"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASKS_API_KEYS = void 0;
exports.getApiKeys = getApiKeys;
const params_1 = require("firebase-functions/params");
exports.TASKS_API_KEYS = (0, params_1.defineSecret)('TASKS_API_KEYS');
function getApiKeys() {
    const env = process.env.TASKS_API_KEYS;
    let raw = env && env.trim().length ? env : '';
    try {
        if (!raw)
            raw = exports.TASKS_API_KEYS.value();
    }
    catch { }
    return (raw || '').split(',').map(s => s.trim()).filter(Boolean);
}
//# sourceMappingURL=params.js.map