 
# Backend – Express + TypeScript (Firebase Functions)

## Arquitectura

- **Domain**: `Task`, `User`
- **Use cases**: Add/Update/Delete/List (Tasks), Get/Create (Users)
- **Infra**:
  - Repos Firestore (`FirestoreTaskRepo`, `FirestoreUserRepo`)
  - HTTP (Express) con middlewares:
    - `corsMw` (CORS por lista blanca)
    - `apiKeyAuth` (cabecera `x-api-key`)
    - `errorHandler` (uniforma errores `{ error }`)

**Punto de entrada**: `src/infrastructure/http/api.ts` exporta `buildApp()` y `app`.

## Endpoints

Base (emulador): `http://localhost:5001/<PROJECT_ID>/us-central1/api`  
Base (prod): URL de Cloud Run de la función `api` (ej. `https://api-xxxxx-uc.a.run.app`)

- `GET /health` → `{ ok: true }`
- `GET /tasks/:userEmail` → lista por usuario (orden `createdAt desc`)
- `POST /tasks` → `{ title, description, userEmail }`
- `PATCH /tasks/:id` → `{ title?, description?, completed? }`
- `DELETE /tasks/:id`
- `GET /users/:email`
- `POST /users` → `{ email }`

### Headers
- `x-api-key: <clave>`
 

## Variables / Secrets

En local (ejemplo):
```bash
export TASKS_API_KEYS=dev-123
export CORS_ORIGINS=http://localhost:4200

## Desarrollo local

### Backend
```bash
cd backend
npm ci
# Variables (modo dev)
export TASKS_API_KEYS=dev-123
export APPCHECK_REQUIRED=false
export AUTH_REQUIRED=false
export CORS_ORIGINS=http://localhost:4200
npm run build
firebase emulators:start --only functions,firestore
 