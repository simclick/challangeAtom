"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTask = void 0;
class UpdateTask {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, partial) { return this.repo.update(id, partial); }
}
exports.UpdateTask = UpdateTask;
//# sourceMappingURL=UpdateTask.js.map