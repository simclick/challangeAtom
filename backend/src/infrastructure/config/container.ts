import { FirestoreUserRepo } from '../firestore/FirestoreUserRepo';
import { FirestoreTaskRepo } from '../firestore/FirestoreTaskRepo';
export const container = { userRepo: new FirestoreUserRepo(), taskRepo: new FirestoreTaskRepo() };
