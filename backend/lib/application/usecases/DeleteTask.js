"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTask = void 0;
class DeleteTask {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id) { await this.repo.delete(id); }
}
exports.DeleteTask = DeleteTask;
//# sourceMappingURL=DeleteTask.js.map