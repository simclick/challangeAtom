import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/async-handler';
import { container } from '../../config/container';
import { CreateUser } from '../../../application/usecases/CreateUser';
import { GetUserByEmail } from '../../../application/usecases/GetUserByEmail';
import { CreateUserDTO } from '../../../application/dto/user.dto';
import { validateBody } from '../middleware/validate';

export const usersRouter = Router();

usersRouter.get('/:email', asyncHandler(async (req: Request, res: Response) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  const uc = new GetUserByEmail(container.userRepo);
  const user = await uc.execute(email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ 
    id: user.id, 
    email: user.email, 
    displayName: user.displayName, 
    createdAt: user.createdAt.toISOString() });
}));

usersRouter.post('/', validateBody(CreateUserDTO), asyncHandler(async (req: Request, res: Response) => {
  const exists = new GetUserByEmail(container.userRepo);
  const prev = await exists.execute(req.body.email);
  if (prev) return res.status(409).json({ error: 'User already exists' });
  const create = new CreateUser(container.userRepo);
  const user = await create.execute(req.body);
  res.status(201).json({ 
    id: user.id, 
    email: user.email, 
    displayName: user.displayName, 
    createdAt: user.createdAt.toISOString() });
}));
