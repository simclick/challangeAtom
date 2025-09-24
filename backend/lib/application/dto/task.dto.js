"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDTO = exports.CreateTaskDTO = void 0;
const zod_1 = require("zod");
exports.CreateTaskDTO = zod_1.z.object({ userEmail: zod_1.z.string().email(), title: zod_1.z.string().min(1), description: zod_1.z.string().optional(), completed: zod_1.z.boolean().optional(), createdAt: zod_1.z.string().datetime().optional() });
exports.UpdateTaskDTO = zod_1.z.object({ title: zod_1.z.string().min(1).optional(), description: zod_1.z.string().optional(), completed: zod_1.z.boolean().optional() });
//# sourceMappingURL=task.dto.js.map