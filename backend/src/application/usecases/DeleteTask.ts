import { TaskRepository } from '../../domain/repositories/TaskRepository';
export class DeleteTask { constructor(private repo: TaskRepository) {} async execute(id: string){ await this.repo.delete(id);} }
