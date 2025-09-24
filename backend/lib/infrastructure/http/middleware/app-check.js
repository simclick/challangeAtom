"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appCheckGuard = appCheckGuard;
const firebase_admin_1 = require("firebase-admin");
async function appCheckGuard(req, res, next) {
    if (req.method === 'OPTIONS')
        return next();
    const token = req.header('X-Firebase-AppCheck');
    if (!token)
        return res.status(401).json({ error: 'Missing App Check token' });
    try {
        await (0, firebase_admin_1.appCheck)().verifyToken(token);
        next();
    }
    catch {
        return res.status(401).json({ error: 'Invalid App Check token' });
    }
}
//# sourceMappingURL=app-check.js.map