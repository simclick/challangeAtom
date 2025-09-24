"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const async_handler_1 = require("../middleware/async-handler");
const container_1 = require("../../config/container");
const CreateUser_1 = require("../../../application/usecases/CreateUser");
const GetUserByEmail_1 = require("../../../application/usecases/GetUserByEmail");
const user_dto_1 = require("../../../application/dto/user.dto");
const validate_1 = require("../middleware/validate");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/:email', (0, async_handler_1.asyncHandler)(async (req, res) => {
    const email = decodeURIComponent(req.params.email).toLowerCase();
    const uc = new GetUserByEmail_1.GetUserByEmail(container_1.container.userRepo);
    const user = await uc.execute(email);
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, email: user.email, displayName: user.displayName, createdAt: user.createdAt.toISOString() });
}));
exports.usersRouter.post('/', (0, validate_1.validateBody)(user_dto_1.CreateUserDTO), (0, async_handler_1.asyncHandler)(async (req, res) => {
    const exists = new GetUserByEmail_1.GetUserByEmail(container_1.container.userRepo);
    const prev = await exists.execute(req.body.email);
    if (prev)
        return res.status(409).json({ error: 'User already exists' });
    const create = new CreateUser_1.CreateUser(container_1.container.userRepo);
    const user = await create.execute(req.body);
    res.status(201).json({ id: user.id, email: user.email, displayName: user.displayName, createdAt: user.createdAt.toISOString() });
}));
//# sourceMappingURL=users.controller.js.map