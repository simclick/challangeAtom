"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    console.error('[ERROR]', err);
    res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' });
}
//# sourceMappingURL=error-handler.js.map