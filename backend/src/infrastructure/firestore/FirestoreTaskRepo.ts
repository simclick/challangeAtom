import { TaskRepository } from '../../domain/repositories/TaskRepository'; import { Task } from '../../domain/entities/Task';
import { db } from '../config/firebase'; import { FieldValue, Timestamp } from 'firebase-admin/firestore';
const col = () => db.collection('tasks');
const toDomain = (id: string, data: any): Task => new Task({ id, userEmail: data.userEmail, title: data.title, description: data.description || '', completed: !!data.completed, createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date() });

export class FirestoreTaskRepo implements TaskRepository {
  async listByUser(email: string): Promise<Task[]> {
    const snap = await col().where('userEmail', '==', email.toLowerCase()).orderBy('createdAt','desc').get();
    return snap.docs.map(d => toDomain(d.id, d.data()));
  }
  async create(task: Task): Promise<Task> {
    const o = task.toObject();
    const ref = await col().add({ userEmail: o.userEmail, title: o.title, description: o.description || '', completed: o.completed, createdAt:  FieldValue.serverTimestamp()});
    const data = (await ref.get()).data()!; return toDomain(ref.id, data);
  }
  async update(id: string, partial: { title?: string; description?: string; completed?: boolean; }): Promise<Task> {
    const updates: any = {}; if (partial.title !== undefined) updates.title = partial.title; if (partial.description !== undefined) updates.description = partial.description; if (partial.completed !== undefined) updates.completed = partial.completed;
    await col().doc(id).set(updates, { merge: true }); const doc = await col().doc(id).get(); return toDomain(doc.id, doc.data()!);
  }
  async delete(id: string): Promise<void> { await col().doc(id).delete(); }
}
