import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
export class CreateUser { constructor(private repo: UserRepository) {} async execute(input: {email: string; displayName?: string}) { const u = User.create(input.email, input.displayName); return this.repo.create(u);} }
