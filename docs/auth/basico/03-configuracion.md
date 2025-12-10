# Configuración

## Variables de Entorno

### Archivo `.env`

```env
# Base de datos PostgreSQL
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_db

# better-auth
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=un-string-aleatorio-muy-largo-minimo-32-caracteres
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### Descripción de Variables

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `DATABASE_URL` | Server | URL de conexión a PostgreSQL |
| `BETTER_AUTH_URL` | Server | URL base para API de auth |
| `BETTER_AUTH_SECRET` | Server | Secreto para firmar tokens JWT (mínimo 32 caracteres) |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Client | URL pública para el cliente de auth |

### Generar BETTER_AUTH_SECRET

```bash
# Linux/Mac
openssl rand -base64 32

# O usar Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Archivo de Validación: `src/env.js`

```javascript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
```

## Archivo Drizzle: `drizzle.config.ts`

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

## Comandos de Base de Datos

```bash
# Crear/actualizar tablas en la BD
pnpm drizzle-kit push

# Generar migraciones (opcional)
pnpm drizzle-kit generate

# Ver estudio visual de la BD
pnpm drizzle-kit studio
```
