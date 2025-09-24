"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreUserRepo = void 0;
const User_1 = require("../../domain/entities/User");
const firebase_1 = require("../config/firebase");
const firestore_1 = require("firebase-admin/firestore");
const col = () => firebase_1.db.collection('users');
class FirestoreUserRepo {
    async getByEmail(email) {
        const snap = await col().where('email', '==', email.toLowerCase()).limit(1).get();
        if (snap.empty)
            return null;
        const doc = snap.docs[0];
        const data = doc.data();
        return new User_1.User({ id: doc.id, email: data.email, displayName: data.displayName || '', createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date() });
    }
    async create(user) {
        const o = user.toObject();
        const ref = await col().add({ email: o.email, displayName: o.displayName || '', createdAt: firestore_1.Timestamp.fromDate(o.createdAt) });
        const d = await ref.get();
        const data = d.data();
        return new User_1.User({ id: ref.id, email: data.email, displayName: data.displayName || '', createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date() });
    }
}
exports.FirestoreUserRepo = FirestoreUserRepo;
//# sourceMappingURL=FirestoreUserRepo.js.map