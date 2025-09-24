"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const User_1 = require("../../domain/entities/User");
class CreateUser {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) { const u = User_1.User.create(input.email, input.displayName); return this.repo.create(u); }
}
exports.CreateUser = CreateUser;
//# sourceMappingURL=CreateUser.js.map