# Arquitectura del Proyecto: Studio Admin

**Versión:** 2.0.0  
**Framework:** Next.js 16 (App Router)  
**Fecha de documentación:** Diciembre 2025

---

## Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Arquitectura de Colocalización](#arquitectura-de-colocalización)
5. [Capas de la Aplicación](#capas-de-la-aplicación)
6. [Sistema de Diseño y Temas](#sistema-de-diseño-y-temas)
7. [Gestión del Estado](#gestión-del-estado)
8. [Autenticación y Autorización](#autenticación-y-autorización)
9. [Base de Datos](#base-de-datos)
10. [API y Comunicación](#api-y-comunicación)
11. [Configuración y Variables de Entorno](#configuración-y-variables-de-entorno)
12. [Flujos de Navegación](#flujos-de-navegación)
13. [Componentes Principales](#componentes-principales)
14. [Dashboards Implementados](#dashboards-implementados)
15. [Calidad de Código](#calidad-de-código)
16. [Optimizaciones](#optimizaciones)
17. [Diagramas de Arquitectura](#diagramas-de-arquitectura)

---

## Resumen Ejecutivo

**Studio Admin** es una plantilla administrativa moderna construida con Next.js 16, que implementa una **arquitectura de colocalización** donde cada característica mantiene sus páginas, componentes y lógica dentro de su propia carpeta de ruta. Esta arquitectura mejora la modularidad, escalabilidad y mantenibilidad del código.

### Características Principales

- 🎨 **Sistema de temas personalizables**: 4 presets de tema (Default, Brutalist, Soft Pop, Tangerine) con soporte para modo claro/oscuro
- 🔐 **Autenticación completa**: Integración con Better Auth, soporte para email/password y OAuth (GitHub)
- 📊 **Múltiples dashboards**: Default, CRM, Finance (con más en desarrollo)
- 🧩 **53 componentes UI**: Biblioteca completa basada en shadcn/ui
- 📱 **Responsive**: Diseño adaptable a móviles, tablets y escritorio
- 🎯 **TypeScript completo**: Type-safety en toda la aplicación
- ⚡ **React Compiler**: Optimizaciones automáticas en producción

---

## Stack Tecnológico

### Core Framework
```json
{
  "framework": "Next.js 16",
  "runtime": "React 19.2.0",
  "language": "TypeScript 5.9.3",
  "styling": "Tailwind CSS v4.1.5"
}
```

### UI y Componentes
- **shadcn/ui**: Sistema de componentes base (estilo New York)
- **Radix UI**: Componentes primitivos accesibles
- **Lucide React**: Biblioteca de iconos
- **Simple Icons**: Iconos de marcas
- **Recharts**: Gráficos y visualizaciones
- **Class Variance Authority**: Gestión de variantes de componentes

### Estado y Datos
- **Zustand**: Gestión de estado global (preferencias)
- **TanStack Query**: Manejo de estado del servidor y caché
- **TanStack Table**: Tablas avanzadas con sorting, filtering, pagination
- **React Hook Form**: Gestión de formularios
- **Zod**: Validación de esquemas

### Backend y Base de Datos
- **tRPC**: API type-safe (configurado pero sin routers activos)
- **Drizzle ORM**: ORM para PostgreSQL
- **PostgreSQL**: Base de datos principal
- **Better Auth**: Sistema de autenticación moderno

### Desarrollo y Calidad
- **ESLint**: Linting con configuración extendida
  - eslint-plugin-import
  - eslint-plugin-security
  - eslint-plugin-sonarjs
  - eslint-plugin-unicorn
  - @typescript-eslint
- **Prettier**: Formateo de código
- **Husky**: Git hooks para pre-commit
- **lint-staged**: Linting en archivos staged

---

## Estructura del Proyecto

```
next-shadcn-admin-template/
│
├── .docs/                          # Documentación del proyecto
│
├── .husky/                         # Git hooks
│
├── src/
│   ├── app/                        # App Router de Next.js
│   │   ├── (external)/             # Rutas externas (sin sidebar)
│   │   │   └── auth/               # Páginas de autenticación
│   │   │       ├── v1/             # Versión 1 de auth (login/register)
│   │   │       └── v2/             # Versión 2 de auth (diseños alternativos)
│   │   │
│   │   ├── (main)/                 # Rutas principales (con layout)
│   │   │   ├── dashboard/          # Dashboards principales
│   │   │   │   ├── _components/    # Componentes compartidos del dashboard
│   │   │   │   │   └── sidebar/    # Componentes del sidebar
│   │   │   │   ├── default/        # Dashboard por defecto
│   │   │   │   ├── crm/            # Dashboard CRM
│   │   │   │   ├── finance/        # Dashboard de finanzas
│   │   │   │   ├── coming-soon/    # Página placeholder
│   │   │   │   └── layout.tsx      # Layout del dashboard con sidebar
│   │   │   │
│   │   │   ├── auth/               # Componentes de auth en contexto main
│   │   │   │   └── _components/    # Componentes compartidos de auth
│   │   │   │
│   │   │   └── unauthorized/       # Página de acceso denegado
│   │   │
│   │   ├── api/                    # API Routes
│   │   │   ├── auth/               # Endpoints de autenticación
│   │   │   │   └── [...all]/       # Better Auth catch-all route
│   │   │   └── trpc/               # tRPC API routes (preparado)
│   │   │
│   │   ├── favicon.ico
│   │   ├── globals.css             # Estilos globales y variables CSS
│   │   ├── layout.tsx              # Root layout
│   │   └── not-found.tsx           # Página 404
│   │
│   ├── components/                 # Componentes compartidos
│   │   ├── data-table/             # Componentes de data table
│   │   │   ├── data-table.tsx      # Componente principal de tabla
│   │   │   ├── data-table-toolbar.tsx
│   │   │   ├── data-table-pagination.tsx
│   │   │   └── ... (7 archivos)
│   │   │
│   │   ├── ui/                     # Componentes UI de shadcn
│   │   │   └── ... (53 componentes)
│   │   │
│   │   └── simple-icon.tsx         # Wrapper para simple-icons
│   │
│   ├── config/                     # Configuraciones
│   │   ├── app-config.ts           # Configuración de la aplicación
│   │   └── env.js                  # Validación de variables de entorno
│   │
│   ├── data/                       # Datos estáticos/mock
│   │   └── users.ts                # Usuarios de ejemplo
│   │
│   ├── hooks/                      # Custom React Hooks
│   │   ├── use-data-table-instance.ts
│   │   └── use-mobile.ts
│   │
│   ├── lib/                        # Utilidades
│   │   ├── utils.ts                # Utilidades generales (cn, etc.)
│   │   ├── theme-utils.ts          # Utilidades de tema
│   │   └── layout-utils.ts         # Utilidades de layout
│   │
│   ├── navigation/                 # Configuración de navegación
│   │   └── sidebar/
│   │       └── sidebar-items.ts    # Definición de items del sidebar
│   │
│   ├── scripts/                    # Scripts utilitarios
│   │   └── generate-theme-presets.ts
│   │
│   ├── server/                     # Código del servidor
│   │   ├── api/                    # API del servidor
│   │   │   └── routers/            # tRPC routers (vacío por ahora)
│   │   │
│   │   ├── better-auth/            # Configuración de autenticación
│   │   │   ├── config.ts           # Configuración de Better Auth
│   │   │   ├── index.ts            # Exportaciones
│   │   │   └── client.ts           # Cliente de autenticación
│   │   │
│   │   ├── db/                     # Base de datos
│   │   │   ├── index.ts            # Instancia de Drizzle
│   │   │   └── schema.ts           # Esquemas de DB
│   │   │
│   │   └── server-actions.ts       # Server Actions de Next.js
│   │
│   ├── stores/                     # Estado global (Zustand)
│   │   └── preferences/
│   │       ├── preferences-store.ts
│   │       └── preferences-provider.tsx
│   │
│   ├── styles/                     # Estilos adicionales
│   │   └── presets/                # Presets de tema
│   │       ├── brutalist.css
│   │       ├── soft-pop.css
│   │       └── tangerine.css
│   │
│   ├── trpc/                       # Configuración de tRPC (preparado)
│   │
│   └── types/                      # Tipos TypeScript
│       └── preferences/
│           ├── theme.ts            # Tipos de tema
│           └── layout.ts           # Tipos de layout
│
├── .env                            # Variables de entorno (no commitear)
├── .env.example                    # Ejemplo de variables de entorno
├── components.json                 # Configuración de shadcn/ui
├── eslint.config.mjs               # Configuración de ESLint
├── next.config.mjs                 # Configuración de Next.js
├── package.json                    # Dependencias
├── prettier.config.js              # Configuración de Prettier
├── tsconfig.json                   # Configuración de TypeScript
└── README.md                       # Documentación principal
```

---

## Arquitectura de Colocalización

### Principios de Colocalización

Este proyecto sigue una **arquitectura de colocalización** (colocation-based architecture) donde:

1. **Cada feature mantiene su código junto**: Las páginas, componentes específicos y lógica relacionada viven en la misma carpeta de ruta
2. **Separación clara**: Los componentes compartidos viven en `/src/components`, mientras los específicos viven en `_components` dentro de cada ruta
3. **Escalabilidad**: Facilita agregar nuevas features sin afectar el código existente
4. **Mantenibilidad**: Es fácil encontrar y modificar código relacionado

### Ejemplo: Dashboard CRM

```
dashboard/crm/
├── _components/              # Componentes SOLO usados en CRM
│   ├── columns.crm.tsx       # Definición de columnas de tabla
│   ├── insight-cards.tsx     # Cards de insights
│   ├── operational-cards.tsx # Cards operacionales
│   ├── overview-cards.tsx    # Cards de overview
│   └── table-cards.tsx       # Cards con tablas
└── page.tsx                  # Página principal del CRM
```

### Grupos de Rutas

Next.js App Router permite organizar rutas con **route groups** (carpetas entre paréntesis):

- `(external)`: Rutas sin layout principal (autenticación)
- `(main)`: Rutas con layout principal (dashboard con sidebar)

---

## Capas de la Aplicación

### 1. Capa de Presentación (UI)

**Ubicación**: `src/app`, `src/components`

- **Componentes UI**: 53 componentes de shadcn/ui reutilizables
- **Componentes de Página**: Componentes específicos de cada dashboard
- **Layouts**: Root layout y dashboard layout

**Características**:
- Server Components por defecto (optimización de rendimiento)
- Client Components marcados con `'use client'` cuando necesitan interactividad
- Responsive design con Tailwind CSS
- Accesibilidad siguiendo WAI-ARIA

### 2. Capa de Lógica de Negocio

**Ubicación**: `src/server`, `src/hooks`

- **Server Actions**: Operaciones del servidor ejecutadas desde el cliente
- **Custom Hooks**: Lógica reutilizable del lado del cliente
- **tRPC Routers**: (Preparado) API type-safe para operaciones complejas

**Ejemplo de Server Action**:
```typescript
// src/server/server-actions.ts
'use server';

import { cookies } from 'next/headers';

export async function getPreference<T>(
  key: string,
  allowedValues: readonly string[],
  defaultValue: T
): Promise<T> {
  const cookieStore = await cookies();
  const value = cookieStore.get(key)?.value;
  // ...
}
```

### 3. Capa de Datos

**Ubicación**: `src/server/db`

- **Drizzle ORM**: Abstracción type-safe de la base de datos
- **Schemas**: Definición de tablas y relaciones
- **Connection pooling**: Gestión eficiente de conexiones

**Esquemas principales**:
- `user`: Usuarios del sistema
- `session`: Sesiones de autenticación
- `account`: Cuentas de proveedores OAuth
- `verification`: Tokens de verificación
- `posts`: Ejemplo de contenido (puede extenderse)

### 4. Capa de Autenticación

**Ubicación**: `src/server/better-auth`

- **Better Auth**: Sistema de autenticación moderno
- **Proveedores**: Email/Password, GitHub OAuth
- **Adaptador**: Integración con Drizzle ORM

---

## Sistema de Diseño y Temas

### Variables CSS Personalizadas

El sistema usa CSS Custom Properties para temas dinámicos:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... más variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... modo oscuro */
}
```

### Presets de Tema

**Ubicación**: `src/styles/presets/`

Cuatro presets disponibles:

1. **Default**: Tema neutral clásico
2. **Brutalist**: Naranja vibrante con sombras pronunciadas
3. **Soft Pop**: Púrpura suave con gradientes
4. **Tangerine**: Naranja cálido con toques modernos

Cada preset puede sobreescribir:
- Colores (variables CSS)
- Sombras personalizadas
- Border radius
- Otros tokens de diseño

### Sistema de Tokens

**Colores**:
- `background`, `foreground`
- `card`, `card-foreground`
- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `muted`, `muted-foreground`
- `accent`, `accent-foreground`
- `destructive`
- `border`, `input`, `ring`
- `chart-1` a `chart-5`
- `sidebar-*` (colores específicos del sidebar)

**Radios**:
- `--radius-sm`: `calc(var(--radius) - 4px)`
- `--radius-md`: `calc(var(--radius) - 2px)`
- `--radius-lg`: `var(--radius)`
- `--radius-xl`: `calc(var(--radius) + 4px)`

### Aplicación de Temas

```tsx
// src/app/layout.tsx
<html 
  lang="en" 
  className={themeMode}           // "light" | "dark"
  data-theme-preset={themePreset} // "default" | "brutalist" | ...
>
```

---

## Gestión del Estado

### Estado del Servidor (TanStack Query)

**Ubicación**: Implícito en componentes que usan tRPC

- **Cache automático**: Reducción de llamadas innecesarias
- **Revalidación**: Actualización inteligente de datos
- **Optimistic updates**: (Preparado para implementar)

### Estado del Cliente (Zustand)

**Ubicación**: `src/stores/preferences/`

**Store de Preferencias**:
```typescript
export type PreferencesState = {
  themeMode: ThemeMode;           // "light" | "dark"
  themePreset: ThemePreset;       // "default" | "brutalist" | ...
  setThemeMode: (mode: ThemeMode) => void;
  setThemePreset: (preset: ThemePreset) => void;
};
```

**Provider Pattern**:
- Se usa `PreferencesStoreProvider` en el root layout
- Inicializa el estado con valores del servidor (cookies)
- Permite acceso type-safe desde componentes cliente

### Estado de Cookies (Server-side)

**Ubicación**: Next.js cookies API

Preferencias persistidas en cookies:
- `theme_mode`: Modo claro/oscuro
- `theme_preset`: Preset de tema activo
- `sidebar_state`: Estado del sidebar (abierto/cerrado)
- `sidebar_variant`: Variante del sidebar (inset/sidebar/floating)
- `sidebar_collapsible`: Comportamiento de colapsado (icon/offcanvas)
- `content_layout`: Layout del contenido (centered/full-width)
- `navbar_style`: Estilo de navbar (sticky/scroll)

---

## Autenticación y Autorización

### Better Auth

**Configuración**: `src/server/better-auth/config.ts`

```typescript
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: "http://localhost:3000/api/auth/callback/github"
    }
  }
});
```

### Flujos de Autenticación

1. **Email/Password**:
   - Registro: `POST /api/auth/register`
   - Login: `POST /api/auth/login`
   - Verificación de email (configurado)

2. **OAuth (GitHub)**:
   - Inicio: `GET /api/auth/signin/github`
   - Callback: `GET /api/auth/callback/github`
   - Creación automática de cuenta si no existe

3. **Sesiones**:
   - Almacenadas en PostgreSQL (tabla `session`)
   - Token JWT en cookie segura
   - Expiración configurable

### Pantallas de Autenticación

**Ubicación**: `src/app/(external)/auth/`

- `v1/login` y `v1/register`: Diseño minimalista
- `v2/login` y `v2/register`: Diseño alternativo con imagen

Todas las pantallas incluyen:
- Validación con Zod + React Hook Form
- Links entre login/register
- Soporte para OAuth
- Responsive design

---

## Base de Datos

### Drizzle ORM

**Conexión**: `src/server/db/index.ts`

```typescript
const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
```

**Estrategia**: 
- Connection pooling en desarrollo (evita múltiples conexiones en HMR)
- Nueva conexión por request en producción

### Schema de Base de Datos

**Archivo**: `src/server/db/schema.ts`

#### Tabla: `user`
```typescript
{
  id: text PRIMARY KEY,
  name: text NOT NULL,
  email: text UNIQUE NOT NULL,
  emailVerified: boolean DEFAULT false,
  image: text,
  createdAt: timestamp NOT NULL,
  updatedAt: timestamp NOT NULL
}
```

#### Tabla: `session`
```typescript
{
  id: text PRIMARY KEY,
  expiresAt: timestamp NOT NULL,
  token: text UNIQUE NOT NULL,
  createdAt: timestamp NOT NULL,
  updatedAt: timestamp NOT NULL,
  ipAddress: text,
  userAgent: text,
  userId: text REFERENCES user(id) ON DELETE CASCADE
}
```

#### Tabla: `account`
```typescript
{
  id: text PRIMARY KEY,
  accountId: text NOT NULL,
  providerId: text NOT NULL,
  userId: text REFERENCES user(id) ON DELETE CASCADE,
  accessToken: text,
  refreshToken: text,
  idToken: text,
  accessTokenExpiresAt: timestamp,
  refreshTokenExpiresAt: timestamp,
  scope: text,
  password: text,
  createdAt: timestamp NOT NULL,
  updatedAt: timestamp NOT NULL
}
```

#### Tabla: `verification`
```typescript
{
  id: text PRIMARY KEY,
  identifier: text NOT NULL,
  value: text NOT NULL,
  expiresAt: timestamp NOT NULL,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Tabla: `posts` (Ejemplo)
```typescript
{
  id: integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name: varchar(256),
  createdById: varchar(255) REFERENCES user(id),
  createdAt: timestamp NOT NULL,
  updatedAt: timestamp
}
```

### Relaciones

```typescript
user → (1:N) → account
user → (1:N) → session
user → (1:N) → posts
```

---

## API y Comunicación

### tRPC (Preparado)

**Estado**: Configurado pero sin routers activos

**Estructura prevista**:
```
src/server/api/
├── routers/          # Definición de routers
│   ├── post.ts       # Ejemplo: operaciones de posts
│   └── user.ts       # Ejemplo: operaciones de usuarios
└── root.ts           # Root router (combina todos)
```

**Cliente tRPC**: Listo para usar con TanStack Query

### API Routes de Next.js

**Auth API**: `src/app/api/auth/[...all]/route.ts`

```typescript
export const { GET, POST } = toNextJsHandler(auth.handler);
```

Maneja todas las rutas de autenticación:
- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/callback/*`
- etc.

### Server Actions

**Archivo**: `src/server/server-actions.ts`

```typescript
'use server';

export async function getPreference<T>(...) { ... }
export async function setPreference(...) { ... }
```

Usados para:
- Leer/escribir preferencias en cookies
- Operaciones simples del servidor
- Evitar crear endpoints REST innecesarios

---

## Configuración y Variables de Entorno

### Validación con @t3-oss/env-nextjs

**Archivo**: `src/config/env.js`

```javascript
export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_GITHUB_CLIENT_ID: z.string(),
    BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"])
  },
  client: {
    // Variables públicas (prefijo NEXT_PUBLIC_)
  },
  runtimeEnv: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    // ...
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
});
```

### Variables Requeridas

```env
# Base de datos
DATABASE_URL="postgresql://..."

# Autenticación
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_GITHUB_CLIENT_ID="github-client-id"
BETTER_AUTH_GITHUB_CLIENT_SECRET="github-client-secret"

# Entorno
NODE_ENV="development"
```

### App Config

**Archivo**: `src/config/app-config.ts`

```typescript
export const APP_CONFIG = {
  name: "Studio Admin",
  version: "2.0.0",
  copyright: "© 2025, Studio Admin.",
  meta: {
    title: "Studio Admin - Modern Next.js Dashboard...",
    description: "Studio Admin is a modern, open-source..."
  }
};
```

---

## Flujos de Navegación

### Estructura de Navegación

**Archivo**: `src/navigation/sidebar/sidebar-items.ts`

```typescript
export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      { title: "Default", url: "/dashboard/default", icon: LayoutDashboard },
      { title: "CRM", url: "/dashboard/crm", icon: ChartBar },
      { title: "Finance", url: "/dashboard/finance", icon: Banknote },
      // ...
    ]
  },
  // ...
];
```

### Sidebar Dinámico

**Características**:
- Colapsible (icon/offcanvas modes)
- Variantes (inset/sidebar/floating)
- Responsive (drawer en móvil)
- Indicadores de "Coming Soon"
- Sub-items expandibles
- Badges "New"

### Redirects

**next.config.mjs**:
```javascript
async redirects() {
  return [
    {
      source: "/dashboard",
      destination: "/dashboard/default",
      permanent: false
    }
  ];
}
```

---

## Componentes Principales

### Sistema de Componentes

**Ubicación**: `src/components/ui/`

**53 componentes** organizados en categorías:

#### Formularios y Entrada
- `input`, `textarea`, `select`, `checkbox`, `radio-group`
- `switch`, `slider`, `input-otp`
- `calendar`, `date-picker`
- `form`, `field`, `label`

#### Contenedores
- `card`, `dialog`, `sheet`, `drawer`
- `popover`, `hover-card`, `tooltip`
- `accordion`, `collapsible`, `tabs`

#### Navegación
- `navigation-menu`, `menubar`, `breadcrumb`
- `sidebar`, `command`, `pagination`

#### Feedback
- `alert`, `alert-dialog`, `sonner` (toasts)
- `progress`, `spinner`, `skeleton`

#### Display
- `table`, `avatar`, `badge`, `kbd`
- `chart` (Recharts wrapper)
- `empty` (estado vacío)

#### Layout
- `separator`, `scroll-area`, `resizable`
- `aspect-ratio`, `carousel`

### Data Table

**Ubicación**: `src/components/data-table/`

Sistema completo de tablas con:
- Sorting
- Filtering
- Pagination
- Column visibility
- Row selection
- Export (preparado)

**Componentes**:
```
data-table/
├── data-table.tsx              # Componente principal
├── data-table-toolbar.tsx      # Barra de herramientas
├── data-table-pagination.tsx   # Controles de paginación
├── data-table-view-options.tsx # Visibilidad de columnas
├── data-table-faceted-filter.tsx # Filtros por facetas
└── ...
```

### Sidebar Personalizado

**Ubicación**: `src/app/(main)/dashboard/_components/sidebar/`

**Componentes**:
- `app-sidebar.tsx`: Sidebar principal
- `nav-main.tsx`: Navegación principal
- `nav-secondary.tsx`: Navegación secundaria
- `nav-user.tsx`: Información del usuario
- `account-switcher.tsx`: Cambio de cuenta
- `theme-switcher.tsx`: Cambio de tema
- `layout-controls.tsx`: Controles de layout
- `search-dialog.tsx`: Búsqueda global

---

## Dashboards Implementados

Esta sección describe la implementación exacta de los dashboards existentes. **Sigue estos patrones al crear nuevos dashboards.**

### 1. Dashboard Default

**Ruta**: `/dashboard/default`  
**Archivo**: `src/app/(main)/dashboard/default/page.tsx`

#### Estructura de la Página

```tsx
import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";
import { SectionCards } from "./_components/section-cards";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </div>
  );
}
```

#### Componentes Implementados

**1. `section-cards.tsx` - Cards de métricas**:
- Usa un grid responsive: `grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4`
- Aplica estilos con container queries: `@container/card`
- Cada card incluye:
  - `CardHeader`: con `CardDescription` y `CardTitle`
  - `CardTitle`: con clases `text-2xl font-semibold tabular-nums @[250px]/card:text-3xl`
  - `CardAction`: con Badge de tendencia (outline variant)
  - `CardFooter`: con información adicional y clase `text-muted-foreground`
- Usa gradientes: `*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card`
- Iconos de tendencia: `TrendingUp`, `TrendingDown` de lucide-react

**2. `data-table.tsx` - Tabla con tabs**:
- Usa `useDataTableInstance` hook con columnas y datos
- Implementa `Tabs` para diferentes vistas
- Incluye `Select` para móviles y `TabsList` para desktop
- Usa container queries: `@4xl/main`
- Barra de herramientas: `DataTableViewOptions` + botones de acción
- Tabla con: `DataTable`, `DataTablePagination`
- Border redondeado: `rounded-lg border`

**3. `columns.tsx` - Definición de columnas**:
- Usa tipo: `ColumnDef<z.infer<typeof schema>>[]`
- Columna de selección con `Checkbox` centrado
- `DataTableColumnHeader` para headers ordenables
- Celdas personalizadas según tipo de dato
- Columna de acciones con botón de menú (`EllipsisVertical`)

#### Archivos necesarios
```
default/
├── _components/
│   ├── section-cards.tsx
│   ├── chart-area-interactive.tsx
│   ├── data-table.tsx
│   ├── columns.tsx
│   ├── table-cell-viewer.tsx
│   ├── schema.ts
│   └── data.json
└── page.tsx
```

---

### 2. Dashboard CRM

**Ruta**: `/dashboard/crm`  
**Archivo**: `src/app/(main)/dashboard/crm/page.tsx`

#### Estructura de la Página

```tsx
import { InsightCards } from "./_components/insight-cards";
import { OperationalCards } from "./_components/operational-cards";
import { OverviewCards } from "./_components/overview-cards";
import { TableCards } from "./_components/table-cards";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <OverviewCards />
      <InsightCards />
      <OperationalCards />
      <TableCards />
    </div>
  );
}
```

#### Componentes Implementados

**1. `overview-cards.tsx` - Cards con gráficos pequeños**:
- Grid responsive: `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6`
- Shadow aplicado: `*:data-[slot=card]:shadow-xs`
- Cards con diferentes tipos de gráficos:
  - **BarChart Card**: Con `background` y `stackId` para barras apiladas
  - **AreaChart Card**: Con `fillOpacity={0.05}` y `strokeWidth={2}`
  - **Card con icono**: Icono en header con bg coloreado (`bg-green-500/10`)
  - **LineChart Card**: Ocupa 2 columnas en XL (`col-span-1 xl:col-span-2`)
- Footer con métricas: `text-xl font-semibold tabular-nums`
- Badges de porcentaje: `text-sm font-medium text-green-500`
- ChartContainer para todos los gráficos con config específica

**2. `table-cards.tsx` - Cards con tablas**:
- Usa `useDataTableInstance` hook
- Estructura típica:
  ```tsx
  <Card>
    <CardHeader>
      <CardTitle>Título</CardTitle>
      <CardDescription>Descripción</CardDescription>
      <CardAction>
        <DataTableViewOptions table={table} />
        <Button variant="outline" size="sm">
          <Download />
          <span className="hidden lg:inline">Export</span>
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent className="flex size-full flex-col gap-4">
      <div className="overflow-hidden rounded-md border">
        <DataTable table={table} columns={columns} />
      </div>
      <DataTablePagination table={table} />
    </CardContent>
  </Card>
  ```
- Grid wrapper: `grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs`

**3. `columns.crm.tsx` - Columnas específicas**:
```tsx
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { schema } from "./schema";

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ref" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.id}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" className="text-muted-foreground flex size-8" size="icon">
        <EllipsisVertical />
        <span className="sr-only">Open menu</span>
      </Button>
    ),
    enableSorting: false,
  },
];
```

**4. `crm.config.ts` - Configuración de datos**:
- Exporta datos mock: `recentLeadsData`, `leadsChartData`, etc.
- Exporta chart configs: `leadsChartConfig`, `proposalsChartConfig`, etc.

**5. `schema.ts` - Esquema de validación**:
```tsx
import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  name: z.string(),
  company: z.string(),
  status: z.string(),
  source: z.string(),
  lastActivity: z.string(),
});
```

#### Archivos necesarios
```
crm/
├── _components/
│   ├── overview-cards.tsx
│   ├── insight-cards.tsx
│   ├── operational-cards.tsx
│   ├── table-cards.tsx
│   ├── columns.crm.tsx
│   ├── crm.config.ts
│   └── schema.ts
└── page.tsx
```

---

### 3. Dashboard Finance

**Ruta**: `/dashboard/finance`  
**Archivo**: `src/app/(main)/dashboard/finance/page.tsx`

#### Estructura de la Página

```tsx
import { AccountOverview } from "./_components/account-overview";
import { CurrencyExchange } from "./_components/currency-exchange";
import { ExpenseSummary } from "./_components/expense-summary";
import { FinancialOverview } from "./_components/financial-overview";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-1">
        <AccountOverview />
      </div>

      <div className="flex flex-col gap-4 lg:col-span-2">
        <div className="flex-1">
          <FinancialOverview />
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs md:grid-cols-2">
          <ExpenseSummary />
          <CurrencyExchange />
        </div>
      </div>
    </div>
  );
}
```

#### Características del Layout
- Grid principal: `grid grid-cols-1 gap-4 lg:grid-cols-3`
- Columna izquierda: `lg:col-span-1` (AccountOverview)
- Columna derecha: `lg:col-span-2` (FinancialOverview + grid de 2 cards)
- Grid interno: `grid-cols-1 md:grid-cols-2` con shadow aplicado

#### Archivos necesarios
```
finance/
├── _components/
│   ├── account-overview.tsx
│   ├── financial-overview.tsx
│   ├── expense-summary.tsx
│   └── currency-exchange.tsx
└── page.tsx
```

---

### Patrón General para Crear Nuevos Dashboards

#### 1. Crear estructura de carpetas
```
dashboard/[nombre]/
├── _components/
│   ├── [componente-1].tsx
│   ├── [componente-2].tsx
│   ├── columns.[nombre].tsx (si tiene tabla)
│   ├── schema.ts (si tiene tabla)
│   └── [nombre].config.ts (opcional, para datos mock)
└── page.tsx
```

#### 2. Estructura del archivo `page.tsx`
```tsx
// Importar todos los componentes
import { Componente1 } from "./_components/componente-1";
import { Componente2 } from "./_components/componente-2";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* O usar grid según el layout deseado */}
      <Componente1 />
      <Componente2 />
    </div>
  );
}
```

#### 3. Componentes de Cards

**Card simple con métrica**:
```tsx
<Card className="@container/card">
  <CardHeader>
    <CardDescription>Etiqueta</CardDescription>
    <CardTitle className="text-2xl font-semibold tabular-nums">Valor</CardTitle>
    <CardAction>
      <Badge variant="outline">
        <TrendingUp />
        +X%
      </Badge>
    </CardAction>
  </CardHeader>
  <CardFooter className="flex-col items-start gap-1.5 text-sm">
    <div className="text-muted-foreground">Información adicional</div>
  </CardFooter>
</Card>
```

**Card con gráfico**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer config={chartConfig} className="h-24 w-full">
      <LineChart data={data}>
        <XAxis dataKey="month" hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="value" stroke="var(--color-value)" />
      </LineChart>
    </ChartContainer>
  </CardContent>
</Card>
```

**Card con tabla**:
```tsx
"use client";

import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTable } from "@/components/data-table/data-table";

export function TableCard() {
  const table = useDataTableInstance({
    data: myData,
    columns: myColumns,
    getRowId: (row) => row.id.toString(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Título</CardTitle>
        <CardDescription>Descripción</CardDescription>
        <CardAction>
          <DataTableViewOptions table={table} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex size-full flex-col gap-4">
        <div className="overflow-hidden rounded-md border">
          <DataTable table={table} columns={myColumns} />
        </div>
        <DataTablePagination table={table} />
      </CardContent>
    </Card>
  );
}
```

#### 4. Reglas de Estilo Comunes

- **Grids de cards**: `grid grid-cols-1 gap-4` + breakpoints responsivos
- **Shadows**: `*:data-[slot=card]:shadow-xs`
- **Container queries**: `@container/main`, `@xl/main:grid-cols-2`, etc.
- **Gaps**: `gap-4` para mobile, `md:gap-6` para desktop
- **Font tabular**: `tabular-nums` para números
- **Clases de texto**: `text-muted-foreground` para texto secundario
- **Border radius**: `rounded-md` o `rounded-lg`

#### 5. Uso de "use client"

- El `page.tsx` debe ser **Server Component** (sin "use client")
- Solo marcar con "use client" componentes que:
  - Usan hooks (`useState`, `useDataTableInstance`, etc.)
  - Tienen interactividad (onClick, onChange)
  - Usan charts interactivos

### Dashboards Planificados

- Analytics Dashboard
- E-commerce Dashboard  
- Academy Dashboard
- Logistics Dashboard

---

## Calidad de Código

### ESLint

**Archivo**: `eslint.config.mjs`

**Plugins activos**:
- `@eslint/js`: Reglas base JavaScript
- `typescript-eslint`: Reglas TypeScript
- `eslint-config-next`: Reglas Next.js
- `eslint-plugin-import`: Orden de imports
- `eslint-plugin-security`: Seguridad
- `eslint-plugin-sonarjs`: Complejidad cognitiva
- `eslint-plugin-unicorn`: Best practices
- `eslint-plugin-prettier`: Formateo

**Reglas destacadas**:
```javascript
{
  // Complejidad
  "complexity": ["error", { "max": 10 }],
  "max-lines": ["error", { "max": 300 }],
  "max-depth": ["error", 4],
  
  // Imports
  "import/order": ["error", {
    "groups": ["builtin", "external", "internal", ...],
    "newlines-between": "always",
    "alphabetize": { "order": "asc" }
  }],
  
  // TypeScript
  "@typescript-eslint/prefer-nullish-coalescing": "error",
  "@typescript-eslint/no-unnecessary-type-assertion": "error",
  
  // React
  "react/no-unstable-nested-components": "error",
  "react/jsx-no-constructed-context-values": "error",
  
  // Nombres de archivo (kebab-case)
  "unicorn/filename-case": ["error", { "case": "kebabCase" }]
}
```

### Prettier

**Archivo**: `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": false,
  "printWidth": 120,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Husky + lint-staged

**Pre-commit hook**:
```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["eslint --fix"]
  }
}
```

---

## Optimizaciones

### React Compiler

**next.config.mjs**:
```javascript
{
  reactCompiler: true
}
```

**Beneficios**:
- Memoización automática de componentes
- Optimización de re-renders
- Mejor rendimiento en producción

### Eliminación de console.log

```javascript
{
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  }
}
```

### Server Components

**Estrategia**:
- Por defecto: Server Components
- Client Components solo cuando se necesita:
  - Interactividad (onClick, onChange, etc.)
  - Hooks del cliente (useState, useEffect, etc.)
  - Context providers

**Ejemplo**:
```tsx
// Server Component (por defecto)
export default async function Page() {
  const data = await fetchData();
  return <Dashboard data={data} />;
}

// Client Component (cuando se necesita)
'use client';
export function InteractiveChart({ data }) {
  const [selected, setSelected] = useState(null);
  // ...
}
```

### Code Splitting

- Componentes cargados dinámicamente cuando es apropiado
- Lazy loading de rutas con App Router
- Chunks optimizados por Next.js automáticamente

### Imágenes

- Next.js Image Optimization (preparado)
- Remote patterns configurables
- Lazy loading automático

---

## Diagramas de Arquitectura

### Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Browser    │  │    Zustand   │  │  React Query │     │
│  │   (React)    │◄─┤  (Preferences)│◄─┤   (Cache)    │     │
│  └──────┬───────┘  └──────────────┘  └──────┬───────┘     │
│         │                                     │             │
└─────────┼─────────────────────────────────────┼─────────────┘
          │                                     │
          │ HTTP/POST                           │ tRPC (future)
          │                                     │
┌─────────┼─────────────────────────────────────┼─────────────┐
│         ▼                   SERVIDOR          ▼             │
│                                                             │
│  ┌──────────────┐                      ┌──────────────┐    │
│  │  API Routes  │                      │   tRPC API   │    │
│  │              │                      │   (preparado)│    │
│  │ /api/auth/*  │                      └──────┬───────┘    │
│  └──────┬───────┘                             │            │
│         │                                     │            │
│         ▼                                     ▼            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │           Better Auth + Server Actions              │ │
│  │                                                      │ │
│  │  - Email/Password                                    │ │
│  │  - OAuth (GitHub)                                    │ │
│  │  - Session management                                │ │
│  └──────────────────────┬───────────────────────────────┘ │
│                         │                                  │
│                         ▼                                  │
│              ┌──────────────────┐                         │
│              │   Drizzle ORM    │                         │
│              └────────┬─────────┘                         │
└───────────────────────┼───────────────────────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   PostgreSQL     │
              │                  │
              │  - users         │
              │  - sessions      │
              │  - accounts      │
              │  - verification  │
              │  - posts         │
              └──────────────────┘
```

### Flujo de Autenticación

```
┌──────┐                ┌──────────┐              ┌────────────┐
│Client│                │ Better   │              │ PostgreSQL │
│      │                │  Auth    │              │            │
└──┬───┘                └────┬─────┘              └─────┬──────┘
   │                         │                          │
   │ POST /api/auth/login    │                          │
   ├────────────────────────►│                          │
   │                         │                          │
   │                         │ Verify credentials       │
   │                         ├─────────────────────────►│
   │                         │                          │
   │                         │ User data                │
   │                         │◄─────────────────────────┤
   │                         │                          │
   │                         │ Create session           │
   │                         ├─────────────────────────►│
   │                         │                          │
   │ Set-Cookie: session     │ Session created          │
   │◄────────────────────────┤◄─────────────────────────┤
   │                         │                          │
   │ GET /dashboard          │                          │
   ├────────────────────────►│                          │
   │                         │                          │
   │                         │ Validate session         │
   │                         ├─────────────────────────►│
   │                         │                          │
   │ Dashboard page          │ Session valid            │
   │◄────────────────────────┤◄─────────────────────────┤
   │                         │                          │
```

### Flujo de Temas

```
┌────────────┐          ┌──────────────┐         ┌────────────┐
│  Browser   │          │   Zustand    │         │   Server   │
│            │          │    Store     │         │  (Cookies) │
└─────┬──────┘          └──────┬───────┘         └─────┬──────┘
      │                        │                       │
      │ Initial load           │                       │
      ├───────────────────────►│                       │
      │                        │ Read theme preferences│
      │                        ├──────────────────────►│
      │                        │                       │
      │                        │ theme_mode: "dark"    │
      │                        │ theme_preset: "brutal"│
      │                        │◄──────────────────────┤
      │                        │                       │
      │ Render with theme      │                       │
      │◄───────────────────────┤                       │
      │                        │                       │
      │ User changes theme     │                       │
      ├───────────────────────►│                       │
      │                        │                       │
      │                        │ setThemeMode("light") │
      │                        │                       │
      │                        │ Update cookie         │
      │                        ├──────────────────────►│
      │                        │                       │
      │ Update HTML classes    │ Cookie updated        │
      │◄───────────────────────┤◄──────────────────────┤
      │ className="light"      │                       │
      │ data-theme-preset=...  │                       │
```

### Estructura de Colocalización

```
dashboard/
│
├── _components/                    # Compartido entre dashboards
│   └── sidebar/                    # Componentes del sidebar
│       ├── app-sidebar.tsx
│       ├── nav-main.tsx
│       └── ...
│
├── default/                        # Feature: Dashboard Default
│   ├── _components/                # Solo para default
│   │   ├── chart-area-interactive.tsx
│   │   ├── section-cards.tsx
│   │   └── data-table.tsx
│   └── page.tsx                    # Página default
│
├── crm/                            # Feature: Dashboard CRM
│   ├── _components/                # Solo para CRM
│   │   ├── overview-cards.tsx
│   │   ├── insight-cards.tsx
│   │   └── table-cards.tsx
│   └── page.tsx                    # Página CRM
│
└── finance/                        # Feature: Dashboard Finance
    ├── _components/                # Solo para Finance
    │   ├── account-overview.tsx
    │   └── currency-exchange.tsx
    └── page.tsx                    # Página Finance
```

---

## Conclusión

**Studio Admin** es una plantilla moderna y bien estructurada que implementa las mejores prácticas de desarrollo con Next.js 16. Su arquitectura de colocalización facilita la escalabilidad y mantenimiento, mientras que su sistema de temas y componentes UI permite una personalización completa.

### Fortalezas

✅ Arquitectura modular y escalable  
✅ Type-safety completo con TypeScript  
✅ Sistema de temas robusto y personalizable  
✅ Autenticación moderna con Better Auth  
✅ 53 componentes UI reutilizables  
✅ Múltiples dashboards implementados  
✅ Configuración de calidad de código estricta  
✅ Optimizaciones de rendimiento (React Compiler)  
✅ Documentación clara y ejemplos  

### Áreas de Expansión

🔧 Implementar routers tRPC para operaciones complejas  
🔧 Agregar dashboards adicionales (Analytics, E-commerce, etc.)  
🔧 Implementar RBAC (Role-Based Access Control)  
🔧 Agregar testing (unit, integration, e2e)  
🔧 CI/CD pipeline  
🔧 Internacionalización (i18n)  
🔧 PWA capabilities  

---

## Referencias

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Better Auth](https://better-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query)

---

**Última actualización**: Diciembre 2025  
**Mantenido por**: Studio Admin Team  
**Licencia**: MIT
