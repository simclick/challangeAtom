"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.buildApp = buildApp;
// backend/src/infrastructure/http/api.ts
const express_1 = __importStar(require("express"));
const cors_1 = require("./middleware/cors");
const error_handler_1 = require("./middleware/error-handler");
const tasks_controller_1 = require("./controllers/tasks.controller");
const users_controller_1 = require("./controllers/users.controller");
function buildApp(overrides = {}) {
    const app = (0, express_1.default)();
    app.set('trust proxy', 1);
    app.use(cors_1.corsMw);
    app.options('*', cors_1.corsMw);
    app.use((0, express_1.urlencoded)({ extended: false }));
    app.use((0, express_1.json)({ limit: '1mb' }));
    // Salud sin guards
    app.get('/health', (_req, res) => res.status(200).json({ ok: true }));
    // Permitir reemplazos en tests
    app.use('/tasks', overrides.tasksRouter ?? tasks_controller_1.tasksRouter);
    app.use('/users', overrides.usersRouter ?? users_controller_1.usersRouter);
    app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));
    app.use(error_handler_1.errorHandler);
    return app;
}
exports.app = buildApp();
//# sourceMappingURL=api.js.map