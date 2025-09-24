"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByEmail = void 0;
class GetUserByEmail {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(email) { return this.repo.getByEmail(email.toLowerCase()); }
}
exports.GetUserByEmail = GetUserByEmail;
//# sourceMappingURL=GetUserByEmail.js.map