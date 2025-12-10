# Sistema de Autenticación Básico

Esta documentación describe la implementación del sistema de autenticación **Nivel 1: Básico** usando better-auth, Drizzle ORM y PostgreSQL.

## Índice

1. [Resumen](./01-resumen.md) - Visión general del sistema
2. [Dependencias](./02-dependencias.md) - Paquetes instalados
3. [Configuración](./03-configuracion.md) - Variables de entorno y setup
4. [Base de Datos](./04-base-datos.md) - Esquemas Drizzle
5. [Better Auth](./05-better-auth.md) - Servidor y cliente
6. [Middleware](./06-middleware.md) - Protección de rutas
7. [Páginas Auth](./07-paginas-auth.md) - Login y registro
8. [Gestión Usuarios](./08-gestion-usuarios.md) - CRUD de usuarios

## Características Implementadas

- ✅ Autenticación email/password
- ✅ Protección de rutas `/dashboard/*`
- ✅ Redirección automática (login ↔ dashboard)
- ✅ Formularios con validación Zod
- ✅ Gestión de usuarios (crear, listar, editar, eliminar)
- ✅ Sesiones persistentes con cookies

## Características NO incluidas (Nivel 1)

- ❌ Verificación de email
- ❌ Roles y permisos (CASL)
- ❌ Recuperación de contraseña
- ❌ Multi-tenant / Organizaciones
