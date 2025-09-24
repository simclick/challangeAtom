import { TaskRepository } from '../../domain/repositories/TaskRepository'; import { UpdateTaskInput } from '../dto/task.dto';
export class UpdateTask { constructor(private repo: TaskRepository) {} async execute(id: string, partial: UpdateTaskInput){ return this.repo.update(id, partial);} }
