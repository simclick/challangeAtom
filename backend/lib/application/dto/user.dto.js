"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDTO = void 0;
const zod_1 = require("zod");
exports.CreateUserDTO = zod_1.z.object({ email: zod_1.z.string().email(), displayName: zod_1.z.string().optional() });
//# sourceMappingURL=user.dto.js.map