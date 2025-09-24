export interface Task {
  id?: string;
  userEmail: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO
}
