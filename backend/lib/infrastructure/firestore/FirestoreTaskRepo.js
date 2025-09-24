"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreTaskRepo = void 0;
const Task_1 = require("../../domain/entities/Task");
const firebase_1 = require("../config/firebase");
const firestore_1 = require("firebase-admin/firestore");
const col = () => firebase_1.db.collection('tasks');
const toDomain = (id, data) => new Task_1.Task({ id, userEmail: data.userEmail, title: data.title, description: data.description || '', completed: !!data.completed, createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date() });
class FirestoreTaskRepo {
    async listByUser(email) {
        const snap = await col().where('userEmail', '==', email.toLowerCase()).orderBy('createdAt', 'desc').get();
        return snap.docs.map(d => toDomain(d.id, d.data()));
    }
    async create(task) {
        const o = task.toObject();
        const ref = await col().add({ userEmail: o.userEmail, title: o.title, description: o.description || '', completed: o.completed, createdAt: firestore_1.FieldValue.serverTimestamp() });
        const data = (await ref.get()).data();
        return toDomain(ref.id, data);
    }
    async update(id, partial) {
        const updates = {};
        if (partial.title !== undefined)
            updates.title = partial.title;
        if (partial.description !== undefined)
            updates.description = partial.description;
        if (partial.completed !== undefined)
            updates.completed = partial.completed;
        await col().doc(id).set(updates, { merge: true });
        const doc = await col().doc(id).get();
        return toDomain(doc.id, doc.data());
    }
    async delete(id) { await col().doc(id).delete(); }
}
exports.FirestoreTaskRepo = FirestoreTaskRepo;
//# sourceMappingURL=FirestoreTaskRepo.js.map