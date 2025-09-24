import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TasksPageComponent } from './tasks-page.component';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';

// Mock laxo: permite cualquier método por nombre
type LooseApiMock = Record<string, jest.Mock>;

describe('TasksPageComponent', () => {
  let fixture: ComponentFixture<TasksPageComponent>;
  let c: TasksPageComponent;

  let api: LooseApiMock;

  beforeEach(async () => {
    // métodos que seguro usa el componente
    api = {
      addTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
      listTasks: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [
        TasksPageComponent,
        // CORRECCIÓN: Agregar NoopAnimationsModule para manejar animaciones en pruebas
        NoopAnimationsModule,
      ],
      providers: [
        // forzamos el tipo al provider
        { provide: ApiService, useValue: api as unknown as ApiService },
        // mock de sesión
        {
          provide: AuthService,
          useValue: {
            email: 'spec@mail.com',
            isLoggedIn: () => true,
            logout: () => {},
            getEmail: () => 'spec@mail.com',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    c = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('agrega tarea y aparece en el FormArray', () => {
    const serverTask = {
      id: 't1',
      title: 'Nueva',
      description: '',
      completed: false,
      createdAt: new Date().toISOString(),
      userEmail: 'spec@mail.com',
    };
    (api['addTask'] as jest.Mock).mockReturnValue(of(serverTask));

    c.addForm.setValue({ title: 'Nueva', description: '' });
    c.addTask();
    fixture.detectChanges();

    expect(c.tasksFA.length).toBe(1);
    expect(c.tasksFA.at(0).get('title')?.value).toBe('Nueva');
  });

  it('toggle completado llama updateTask con el id de la fila', () => {
    // Creamos la fila como lo haría la UI (addTask) para que exista id
    const serverTask = {
      id: 't1',
      title: 'X',
      description: '',
      completed: false,
      createdAt: new Date().toISOString(),
      userEmail: 'spec@mail.com',
    };
    (api['addTask'] as jest.Mock).mockReturnValue(of(serverTask));
    c.addForm.setValue({ title: 'X', description: '' });
    c.addTask();
    fixture.detectChanges();

    (api['updateTask'] as jest.Mock).mockReturnValue(of(void 0));

    c.toggle(0, true);

    expect(api['updateTask']).toHaveBeenCalledWith('t1', { completed: true });
  });
});