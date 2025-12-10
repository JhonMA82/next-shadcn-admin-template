# Dependencias

## Paquetes Instalados

### Dependencias de Producción

```bash
pnpm add better-auth @better-fetch/fetch drizzle-orm postgres @t3-oss/env-nextjs @node-rs/argon2
```

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `better-auth` | ^1.x | Sistema de autenticación principal |
| `@better-fetch/fetch` | ^1.x | Cliente HTTP para llamadas a API |
| `drizzle-orm` | ^0.x | ORM TypeScript para PostgreSQL |
| `postgres` | ^3.x | Driver de PostgreSQL para Node.js |
| `@t3-oss/env-nextjs` | ^0.x | Validación typesafe de variables de entorno |
| `@node-rs/argon2` | ^2.x | Hash de contraseñas (Argon2) |

### Dependencias de Desarrollo

```bash
pnpm add -D drizzle-kit
```

| Paquete | Propósito |
|---------|-----------|
| `drizzle-kit` | CLI para migraciones y push de esquemas |

## Dependencias Existentes Utilizadas

Estas ya estaban en el proyecto y fueron reutilizadas:

| Paquete | Propósito |
|---------|-----------|
| `zod` | Validación de formularios |
| `react-hook-form` | Manejo de formularios |
| `@hookform/resolvers` | Integración Zod + React Hook Form |
| `sonner` | Notificaciones toast |
| `date-fns` | Formateo de fechas |
| `lucide-react` | Iconos |

## Instalación Completa

Si empiezas desde cero:

```bash
# Dependencias de auth
pnpm add better-auth @better-fetch/fetch drizzle-orm postgres @t3-oss/env-nextjs @node-rs/argon2

# Dev dependencies
pnpm add -D drizzle-kit
```
