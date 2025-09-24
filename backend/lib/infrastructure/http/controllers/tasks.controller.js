"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const async_handler_1 = require("../middleware/async-handler");
const container_1 = require("../../config/container");
const ListTasks_1 = require("../../../application/usecases/ListTasks");
const CreateTask_1 = require("../../../application/usecases/CreateTask");
const UpdateTask_1 = require("../../../application/usecases/UpdateTask");
const DeleteTask_1 = require("../../../application/usecases/DeleteTask");
const task_dto_1 = require("../../../application/dto/task.dto");
const validate_1 = require("../middleware/validate");
exports.tasksRouter = (0, express_1.Router)();
exports.tasksRouter.get('/', (0, async_handler_1.asyncHandler)(async (req, res) => {
    const email = String(req.query.email || '').toLowerCase();
    if (!email)
        return res.status(400).json({ error: 'email query is required' });
    const list = new ListTasks_1.ListTasks(container_1.container.taskRepo);
    const tasks = await list.execute(email);
    res.json(tasks.map(t => ({ ...t.toObject(), createdAt: t.createdAt.toISOString() })));
}));
exports.tasksRouter.post('/', (0, validate_1.validateBody)(task_dto_1.CreateTaskDTO), (0, async_handler_1.asyncHandler)(async (req, res) => {
    const create = new CreateTask_1.CreateTask(container_1.container.taskRepo);
    const created = await create.execute({ userEmail: req.body.userEmail, title: req.body.title, description: req.body.description });
    res.status(201).json({ ...created.toObject(), createdAt: created.createdAt.toISOString() });
}));
exports.tasksRouter.put('/:id', (0, validate_1.validateBody)(task_dto_1.UpdateTaskDTO), (0, async_handler_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    const update = new UpdateTask_1.UpdateTask(container_1.container.taskRepo);
    const updated = await update.execute(id, req.body);
    res.json({ ...updated.toObject(), createdAt: updated.createdAt.toISOString() });
}));
exports.tasksRouter.delete('/:id', (0, async_handler_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    const del = new DeleteTask_1.DeleteTask(container_1.container.taskRepo);
    await del.execute(id);
    res.status(204).end();
}));
//# sourceMappingURL=tasks.controller.js.map