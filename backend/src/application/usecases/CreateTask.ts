import { TaskRepository } from '../../domain/repositories/TaskRepository'; import { Task } from '../../domain/entities/Task';
export class CreateTask { constructor(private repo: TaskRepository) {} async execute(input: {userEmail: string; title: string; description?: string}){ const t = Task.create(input); return this.repo.create(t);} }
