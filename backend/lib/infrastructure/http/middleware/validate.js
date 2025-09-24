"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
function validateBody(schema) {
    return (req, res, next) => { const p = schema.safeParse(req.body); if (!p.success)
        return res.status(400).json({ error: p.error.flatten() }); req.body = p.data; next(); };
}
//# sourceMappingURL=validate.js.map