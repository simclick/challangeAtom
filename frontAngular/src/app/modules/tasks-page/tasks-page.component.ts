import { Component, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { Task } from '../../shared/models/task.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-tasks-page',
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule,MatIconModule,CdkTableModule, MatTableModule,MatToolbarModule],
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
  @ViewChild(MatTable) table!: MatTable<Task>;
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth  = inject(AuthService)
  email = this.auth.getEmail();
  loading = signal(false);
  tasksMeta = signal<{id?: string, createdAt: string}[]>([]);

  addForm = this.fb.group({ title: ['', Validators.required], description: [''] });
  listForm = this.fb.group({ tasks: this.fb.array<FormGroup<any>>([]) });
  displayedColumns = ['completed','title','description','createdAt','actions'];
 
  trackById = (_: number, row: FormGroup) => row?.get('id')?.value ?? _;
  liveMessage: string='';
  get tasksFA() { return this.listForm.get('tasks') as FormArray<FormGroup<any>>; }

  constructor() {
    if (!this.email) this.router.navigateByUrl('/');
    this.load();
  }

  private toGroup(t: Task) {
    return this.fb.group({
      id: [t.id],
      title: [t.title, Validators.required],
      description: [t.description || ''],
      completed: [t.completed],
      userEmail: [t.userEmail],
      createdAt:[t.createdAt]
    });
  }
  get dataSource() { return this.tasksFA.controls; }
  load() {
    if (!this.email) return;
    this.loading.set(true);
    this.api.listTasks(this.email).subscribe({
      next: (list) => {
        this.tasksFA.clear();
        list.forEach(t => this.tasksFA.push(this.toGroup(t)));
        this.tasksMeta.set(list.map(t => ({ id: t.id, createdAt: t.createdAt })));
        this.loading.set(false);
      },
      error: _ => this.loading.set(false)
    });
  }

  addTask() {
    if (this.addForm.invalid || !this.email) return;
    const now = new Date().toISOString();
    this.api.addTask({ userEmail: this.email, title: this.addForm.value.title!, description: this.addForm.value.description || '', completed: false, createdAt: now })
      .subscribe(t => {
        this.addForm.reset();
        this.tasksFA.insert(0, this.toGroup(t));
        this.refreshTable();
        this.tasksMeta.update(arr => [{ id: t.id, createdAt: t.createdAt }, ...arr]); });
        this.liveMessage = 'Cambios guardados en la tarea';
  }
  private refreshTable() {
    // Fuerza a la tabla a recalcular filas cuando cambia el FormArray
    this.table?.renderRows();
  }
  save(i: number) {
    const g = this.tasksFA.at(i);
    const val = g.value;
    if (!val.id) return;
    this.api.updateTask(val.id, { title: val.title, description: val.description, completed: val.completed }).subscribe();
  }

  toggle(i: number, checked: boolean) {
    const g = this.tasksFA.at(i);
    const id = g.value.id as string | undefined;
    if (!id) return;
 
    g.patchValue({ completed: checked }, { emitEvent: false });
    this.api.updateTask(id, { completed: checked }).subscribe({
      next: (upd) => g.patchValue({ completed: upd.completed }, { emitEvent: false }),
      error: () => g.patchValue({ completed: !checked }, { emitEvent: false })
    });
  }

  remove(i: number) {
    const g = this.tasksFA.at(i);
    const id = g.value.id as string | undefined;
    if (!id) return;
    this.api.deleteTask(id).subscribe(() => {this.tasksFA.removeAt(i);  this.load();this.refreshTable(); } );
    this.liveMessage = 'Tarea eliminada';
  }

  logout() { this.auth.logout(); this.router.navigateByUrl('/'); }
}
