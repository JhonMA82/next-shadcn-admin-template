# Better Auth

## Configuración del Servidor

### Archivo: `src/server/auth/index.ts`

```typescript
import { cache } from "react";
import { headers } from "next/headers";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});

// Helper cacheado para obtener sesión en Server Components
export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

// Tipos exportados
export type Session = typeof auth.$Infer.Session;
export type AuthUserType = Session["user"];
```

### Explicación

| Propiedad | Descripción |
|-----------|-------------|
| `drizzleAdapter` | Conecta better-auth con Drizzle ORM |
| `provider: "pg"` | Indica que usamos PostgreSQL |
| `usePlural: true` | Tablas en plural (users, sessions) |
| `emailAndPassword.enabled` | Habilita auth con email/password |
| `nextCookies()` | Plugin para manejo de cookies en Next.js |

## Cliente de React

### Archivo: `src/server/auth/auth-client.ts`

```typescript
"use client";

import { createAuthClient } from "better-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signOut, useSession } = authClient;
```

### Funciones Disponibles

| Función | Descripción |
|---------|-------------|
| `authClient.signIn.email()` | Iniciar sesión con email/password |
| `authClient.signUp.email()` | Registrar nuevo usuario |
| `authClient.signOut()` | Cerrar sesión |
| `authClient.useSession()` | Hook para obtener sesión en componentes |

## Route Handler

### Archivo: `src/app/api/auth/[...all]/route.ts`

```typescript
import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/server/auth";

export const { GET, POST } = toNextJsHandler(auth);
```

Este archivo maneja todos los endpoints de autenticación:
- `POST /api/auth/sign-in/email` - Login
- `POST /api/auth/sign-up/email` - Registro
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/get-session` - Obtener sesión

## Uso en Componentes

### Obtener Sesión (Client Component)

```tsx
"use client";
import { authClient } from "@/server/auth/auth-client";

function MyComponent() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <p>Cargando...</p>;
  if (!session) return <p>No autenticado</p>;

  return <p>Hola {session.user.name}</p>;
}
```

### Obtener Sesión (Server Component)

```tsx
import { getSession } from "@/server/auth";

async function MyServerComponent() {
  const session = await getSession();

  if (!session) return <p>No autenticado</p>;

  return <p>Hola {session.user.name}</p>;
}
```
