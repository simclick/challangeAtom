import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.base}/users/${encodeURIComponent(email)}`);
  }
  createUser(email: string, displayName?: string): Observable<User> {
    return this.http.post<User>(`${this.base}/users`, { email, displayName });
  }
  listTasks(email: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.base}/tasks`, { params: { email } });
  }
  addTask(payload: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.base}/tasks`, payload);
  }
  updateTask(id: string, payload: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.base}/tasks/${id}`, payload);
  }
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/tasks/${id}`);
  }
}
