import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { db } from '../config/firebase';
import { Timestamp } from 'firebase-admin/firestore';
const col = () => db.collection('users');

export class FirestoreUserRepo implements UserRepository {
  async getByEmail(email: string): Promise<User | null> {
    const snap = await col().where('email', '==', email.toLowerCase()).limit(1).get();
    if (snap.empty) return null;
    const doc = snap.docs[0]; const data = doc.data();
    return new User({ id: doc.id, email: data.email, displayName: data.displayName || '', createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date() });
  }
  async create(user: User): Promise<User> {
    const o = user.toObject();
    const ref = await col().add({ email: o.email, displayName: o.displayName || '', createdAt: Timestamp.fromDate(o.createdAt) });
    const d = await ref.get(); const data = d.data()!;
    return new User({ id: ref.id, email: data.email, displayName: data.displayName || '', createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date() });
  }
}
