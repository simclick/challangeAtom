import { UserRepository } from '../../domain/repositories/UserRepository';
export class GetUserByEmail { constructor(private repo: UserRepository) {} async execute(email: string){ return this.repo.getByEmail(email.toLowerCase()); } }
