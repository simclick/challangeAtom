# challangeAtom
 

Mini-app Full Stack: Frontend Angular 17 (standalone + Material) y Backend Express + TypeScript en Firebase Functions (Gen 2) con Firestore.
Incluye CI/CD con GitHub Actions.

──────────────────────────────────────────────────────────────────────
Estructura
──────────────────────────────────────────────────────────────────────
/frontAngular           -> Angular 17 (standalone) + Angular Material
/backend                -> Node 20, Express, Arquitectura Hexagonal
/.github/workflows      -> Workflows de GitHub Actions
firebase.json           -> Hosting, Functions y Emuladores
firestore.rules         -> Reglas de seguridad
firestore.indexes.json  -> Índices (userEmail + createdAt desc)

──────────────────────────────────────────────────────────────────────
Quick Start (Local)
──────────────────────────────────────────────────────────────────────
Backend
  cd backend
  npm ci
  # Vars de desarrollo  
  export TASKS_API_KEYS=dev-123
  export CORS_ORIGINS=http://localhost:4200
  npm run build
  firebase emulators:start --only functions,firestore
  # => http://localhost:5001/<PROJECT_ID>/us-central1/api

Frontend
  cd frontAngular
  npm ci
  # src/environments/environment.ts
  # export const environment = {
  #   production: false,
  #   apiBaseUrl: 'http://localhost:5001/<PROJECT_ID>/us-central1/api',
  #   apiKey: 'dev-123'
  # };
  npm start
  # => http://localhost:4200

──────────────────────────────────────────────────────────────────────
API (resumen)
──────────────────────────────────────────────────────────────────────
Base URL (local emulador): http://localhost:5001/<PROJECT_ID>/us-central1/api

GET    /health
GET    /tasks/:userEmail
POST   /tasks               { title, description, userEmail }
PATCH  /tasks/:id           { title?, description?, completed? }
DELETE /tasks/:id
GET    /users/:email
POST   /users               { email }

Headers (según config):
  x-api-key: <clave>                # si TASKS_API_KEYS está definido

 

──────────────────────────────────────────────────────────────────────
Tests
──────────────────────────────────────────────────────────────────────
Backend
  cd backend
  npm run test      # unit
  npm run test:int  # integración (emulador Firestore)

Frontend
  cd frontAngular
  npm test

──────────────────────────────────────────────────────────────────────
CI/CD (GitHub Actions)
──────────────────────────────────────────────────────────────────────
Workflow: .github/workflows/firebase.ci.yml

Flujo:
  1) Front: npm ci -> npm test -> ng build -> sube dist como artifact.
  2) Back (unit): npm ci -> npm run test:unit (si existe).
  3) Deploy: Autentica con Service Account, actualiza opcionalmente
     Functions Secrets y ejecuta:
       firebase deploy --only hosting,<site>,functions,firestore:rules[,firestore:indexes]

Secrets requeridos (GitHub):
  PROJECT_ID      -> id de Firebase (p. ej. mi-proyecto)
  GCP_SA_KEY      -> JSON del Service Account con permisos de deploy

Opcionales (guards en runtime):
  TASKS_API_KEYS        (p. ej. dev-123,prod-456)
  CORS_ORIGINS          (https://midominio.com,https://otro.web.app,http://localhost:4200)
  HOSTING_SITE          (si no quieres usar el mismo nombre que PROJECT_ID)

──────────────────────────────────────────────────────────────────────
Deploy manual
──────────────────────────────────────────────────────────────────────
firebase deploy --only hosting,functions,firestore:rules --project <PROJECT_ID>

──────────────────────────────────────────────────────────────────────
Firestore (nota de índice)
──────────────────────────────────────────────────────────────────────
Si consultas where('userEmail','==', ...) + orderBy('createdAt','desc') necesitas índice compuesto.
Inclúyelo en firestore.indexes.json y referencia en firebase.json, o créalo desde el enlace que da el error.

 
──────────────────────────────────────────────────────────────────────
Troubleshooting rápido
──────────────────────────────────────────────────────────────────────
- FAILED_PRECONDITION: requires an index  -> crear índice compuesto.
- NOT_FOUND (code 5)                       -> habilitar Firestore/proyecto correcto.
- CORS bloqueado                           -> ajustar CORS_ORIGINS.
