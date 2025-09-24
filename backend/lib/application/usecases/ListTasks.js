"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTasks = void 0;
class ListTasks {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(email) { return this.repo.listByUser(email.toLowerCase()); }
}
exports.ListTasks = ListTasks;
//# sourceMappingURL=ListTasks.js.map