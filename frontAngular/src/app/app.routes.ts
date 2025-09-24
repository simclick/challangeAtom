import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./modules/login-page/login-page.component').then(m => m.LoginPageComponent) },
  { path: 'tasks',canActivate: [authGuard], loadComponent: () => import('./modules/tasks-page/tasks-page.component').then(m => m.TasksPageComponent) },
  { path: '**', redirectTo: '' }
];
