import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/async-handler';
import { container } from '../../config/container';
import { ListTasks } from '../../../application/usecases/ListTasks';
import { CreateTask } from '../../../application/usecases/CreateTask';
import { UpdateTask } from '../../../application/usecases/UpdateTask';
import { DeleteTask } from '../../../application/usecases/DeleteTask';
import { CreateTaskDTO, UpdateTaskDTO } from '../../../application/dto/task.dto';
import { validateBody } from '../middleware/validate';

export const tasksRouter = Router();

tasksRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
  const email = String(req.query.email || '').toLowerCase();
  if (!email) return res.status(400).json({ error: 'email query is required' });
  const list = new ListTasks(container.taskRepo);
  const tasks = await list.execute(email);
  res.json(tasks.map(t => ({ ...t.toObject(), createdAt: t.createdAt.toISOString() })));
}));

tasksRouter.post('/', validateBody(CreateTaskDTO), asyncHandler(async (req: Request, res: Response) => {
  const create = new CreateTask(container.taskRepo);
  const created = await create.execute({ userEmail: req.body.userEmail, title: req.body.title, description: req.body.description });
  res.status(201).json({ ...created.toObject(), createdAt: created.createdAt.toISOString() });
}));

tasksRouter.put('/:id', validateBody(UpdateTaskDTO), asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = new UpdateTask(container.taskRepo);
  const updated = await update.execute(id, req.body);
  res.json({ ...updated.toObject(), createdAt: updated.createdAt.toISOString() });
}));

tasksRouter.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const del = new DeleteTask(container.taskRepo);
  await del.execute(id);
  res.status(204).end();
}));
