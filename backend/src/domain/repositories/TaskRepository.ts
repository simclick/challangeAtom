import { Task } from '../entities/Task';
export interface TaskRepository {
  listByUser(email: string): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(id: string, partial: { title?: string; description?: string; completed?: boolean; }): Promise<Task>;
  delete(id: string): Promise<void>;
}
