import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiService } from './api.service';
import { apiKeyInterceptor } from '../interceptors/api-key.interceptor';

/**
 * 🔧 Usa la MISMA ruta de import que usa ApiService.
 * Si ApiService importa 'src/environments/environment', mockea esa.
 * Si importa '../../../environments/environment', cambia aquí.
 */
jest.mock('src/environments/environment', () => ({
  environment: { apiBaseUrl: 'http://x/api', apiKey: 'dev-123' },
}));

describe('ApiService', () => {
  let api: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(withInterceptors([apiKeyInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    api = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('envía x-api-key en cada request', () => {
    const email = 'a@b.com';
    api.getUserByEmail(email).subscribe();

    // ✅ predicado: no depende del host ni del encoding exacto
    const req = http.expectOne(r => {
      const tail = r.url.split('/users/')[1] || '';
      return r.method === 'GET' && (
        tail === email || tail === encodeURIComponent(email)
      );
    });

    expect(req.request.headers.get('x-api-key')).toBe('dev-123');
    req.flush({ email, createdAt: new Date().toISOString() });
  });

  it('POST /tasks con payload correcto', () => {
    const body = {
      userEmail: 'a@b.com',
      title: 'T1',
      description: 'd',
      completed: false,
      createdAt: '2020-01-01T00:00:00Z',
    };
    api.addTask(body).subscribe();

    const req = http.expectOne(r => r.method === 'POST' && r.url.endsWith('/tasks'));
    expect(req.request.headers.get('x-api-key')).toBe('dev-123');
    expect(req.request.body.title).toBe('T1');
    req.flush({ id: '1', ...body });
  });
});
