"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const FirestoreUserRepo_1 = require("../firestore/FirestoreUserRepo");
const FirestoreTaskRepo_1 = require("../firestore/FirestoreTaskRepo");
exports.container = { userRepo: new FirestoreUserRepo_1.FirestoreUserRepo(), taskRepo: new FirestoreTaskRepo_1.FirestoreTaskRepo() };
//# sourceMappingURL=container.js.map