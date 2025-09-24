"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTask = void 0;
const Task_1 = require("../../domain/entities/Task");
class CreateTask {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) { const t = Task_1.Task.create(input); return this.repo.create(t); }
}
exports.CreateTask = CreateTask;
//# sourceMappingURL=CreateTask.js.map