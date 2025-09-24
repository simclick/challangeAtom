"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyAuth = apiKeyAuth;
const params_1 = require("../../config/params");
function apiKeyAuth(req, res, next) {
    if (req.method === 'OPTIONS')
        return next();
    const provided = (req.header('x-api-key') || req.header('X-API-Key') || req.query.api_key || req.query.key || '').trim();
    const allow = (0, params_1.getApiKeys)();
    if (!provided || !allow.includes(provided))
        return res.status(401).json({ error: 'Unauthorized: invalid or missing API key' });
    next();
}
//# sourceMappingURL=api-key.js.map