import { TaskRepository } from '../../domain/repositories/TaskRepository';
export class ListTasks { constructor(private repo: TaskRepository) {} async execute(email: string){ return this.repo.listByUser(email.toLowerCase()); } }
