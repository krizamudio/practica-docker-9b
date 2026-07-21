# TaskContainer

Aplicación web para la gestión de actividades académicas, desarrollada como caso práctico de despliegue de servicios con Docker.

## Objetivo

Demostrar la construcción, comunicación y despliegue de una aplicación web compuesta por frontend, backend y base de datos mediante contenedores.

## Tecnologías

- React
- Vite
- Bootstrap
- Axios
- Node.js
- Express
- PostgreSQL
- Vitest
- Supertest
- Nginx
- Docker
- Docker Compose
- pnpm

## Arquitectura

```text
Navegador
    |
    v
Frontend React + Nginx
    |
    | /api
    v
Backend Node.js + Express
    |
    v
PostgreSQL
    |
    v
Volumen persistente
```

## Funcionalidades

- Consultar actividades.
- Registrar actividades.
- Editar actividades.
- Cambiar el estado de una actividad.
- Eliminar actividades.
- Consultar el estado de la API y la base de datos.
- Persistir información mediante un volumen.
- Ejecutar pruebas automatizadas.

## Requisitos

- Docker Desktop.
- Docker Compose.
- pnpm, únicamente para ejecución local.
- Node.js, únicamente para ejecución local.

## Variables de entorno

Copia el archivo de ejemplo:

```powershell
Copy-Item .env.example .env
```

En Linux o macOS:

```bash
cp .env.example .env
```

Variables principales:

```env
POSTGRES_DB=taskcontainer
POSTGRES_USER=task_user
POSTGRES_PASSWORD=task_password
POSTGRES_PORT=5432

BACKEND_PORT=3000
FRONTEND_PORT=8080
APP_VERSION=1.0.0
```

## Ejecución con Docker

Construir y levantar los servicios:

```bash
docker compose up --build -d
```

Consultar su estado:

```bash
docker compose ps
```

Abrir la aplicación:

```text
http://localhost:8080
```

Consultar directamente la API:

```text
http://localhost:3000/api/health
```

## Registros de los contenedores

```bash
docker compose logs
```

Backend:

```bash
docker compose logs -f backend
```

Frontend:

```bash
docker compose logs -f frontend
```

Base de datos:

```bash
docker compose logs -f database
```

## Detener la aplicación

```bash
docker compose down
```

Este comando conserva el volumen de PostgreSQL.

Para eliminar también los datos:

```bash
docker compose down -v
```

## Prueba de persistencia

1. Levantar los servicios.
2. Registrar una actividad.
3. Ejecutar `docker compose down`.
4. Ejecutar `docker compose up -d`.
5. Recargar la aplicación.
6. Confirmar que la actividad continúa almacenada.

## Pruebas locales

Levantar PostgreSQL:

```bash
docker compose up -d database
```

Entrar al backend:

```bash
cd backend
```

Instalar dependencias:

```bash
pnpm install --frozen-lockfile
```

Ejecutar pruebas:

```bash
pnpm test
```

Modo observación:

```bash
pnpm test:watch
```

## Pruebas en Docker

```bash
docker compose --profile testing run --rm tests
```

## Endpoints


| Método | Endpoint                     | Descripción             |
| ------- | ---------------------------- | ------------------------ |
| GET     | `/api/health`                | Estado del sistema       |
| GET     | `/api/activities`            | Listar actividades       |
| GET     | `/api/activities/:id`        | Consultar una actividad  |
| POST    | `/api/activities`            | Registrar una actividad  |
| PUT     | `/api/activities/:id`        | Actualizar una actividad |
| PATCH   | `/api/activities/:id/status` | Cambiar el estado        |
| DELETE  | `/api/activities/:id`        | Eliminar una actividad   |

## Estructura principal

```text
taskcontainer/
├── backend/
├── frontend/
├── database/
├── docker-compose.yml
├── .env.example
└── README.md
```

## Equipo

Proyecto académico para la asignatura Desarrollo Web Integral.

## Versión

1.0.0
