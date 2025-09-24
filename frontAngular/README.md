# ATOM FE CHALLENGE TEMPLATE - ANGULAR
 

## Comentarios sobre el desarrollo
Standalone components; Angular Material para UI.

Reactive Forms: formulario de login y form array para filas de tareas.

Servicios:

ApiService (HTTP central; añade x-api-key, gestiona baseUrl desde environment).

AuthService (gestión simple de sesión por email en localStorage).

Patrones: Observables + async pipe, trackBy en *ngFor, one-way data flow.

Ruteo:

LoginPageComponent

TasksPageComponent

Guard AuthGuard → bloquea /tasks si no hay sesión.


Responsive:

Layout fluido, tabla mat-table con ajustes CSS; en móviles mantiene una visual limpia.
 

## Stack

- Angular 17 standalone + Angular Material
- Reactive Forms (login + `FormArray` para tareas)
- `AuthGuard` para proteger `/tasks`

## Configuración

`src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5001/<PROJECT_ID>/us-central1/api',
  apiKey: 'dev-123'
};

npm start      # http://localhost:4200
npm test
npm run build -- --configuration=production
