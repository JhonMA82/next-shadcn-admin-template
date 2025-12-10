# Resumen del Sistema

## ¿Qué es?

Un sistema de autenticación básico que permite:
- Registro de usuarios con email y contraseña
- Inicio de sesión
- Cierre de sesión
- Protección de rutas privadas
- Gestión de usuarios desde panel de administración

## Stack Tecnológico

| Tecnología | Propósito |
|------------|-----------|
| **better-auth** | Librería de autenticación para Next.js |
| **Drizzle ORM** | ORM TypeScript para PostgreSQL |
| **PostgreSQL** | Base de datos relacional |
| **Zod** | Validación de esquemas |
| **@t3-oss/env-nextjs** | Variables de entorno typesafe |

## Flujo de Autenticación

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Usuario   │────▶│  /sign-in   │────▶│  /dashboard │
│ No Autent.  │     │  (login)    │     │ (protegido) │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  /sign-up   │
                    │ (registro)  │
                    └─────────────┘
```

## Estructura de Archivos Creados

```
src/
├── app/
│   ├── (auth)/                    # Páginas públicas de auth
│   │   ├── layout.tsx
│   │   ├── sign-in/page.tsx
│   │   ├── sign-up/page.tsx
│   │   └── _components/
│   │       ├── sign-in-form.tsx
│   │       └── sign-up-form.tsx
│   ├── api/
│   │   ├── auth/[...all]/route.ts # Endpoints de better-auth
│   │   └── users/                 # CRUD de usuarios
│   │       ├── route.ts           
│   │       └── [id]/route.ts      
│   └── (main)/dashboard/users/    # Gestión de usuarios
│       ├── page.tsx
│       └── _components/
│           ├── schema.ts
│           ├── columns.users.tsx
│           ├── users-table.tsx
│           ├── create-user-dialog.tsx
│           └── edit-user-dialog.tsx
├── server/
│   ├── auth/
│   │   ├── index.ts               # Configuración better-auth
│   │   └── auth-client.ts         # Cliente React
│   └── db/
│       ├── index.ts               # Conexión PostgreSQL
│       ├── schema.ts              # Exportación de esquemas
│       └── users.ts               # Tablas de auth
├── middleware.ts                   # Protección de rutas
└── env.js                          # Variables de entorno
```

## Tablas de Base de Datos

| Tabla | Propósito |
|-------|-----------|
| `users` | Datos del usuario (nombre, email, imagen) |
| `sessions` | Sesiones activas |
| `accounts` | Proveedores de auth (credential, OAuth) |
| `verifications` | Tokens de verificación (no usado en Nivel 1) |
