# Base de Datos

## Conexión a PostgreSQL

### Archivo: `src/server/db/index.ts`

```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const globalForDb = globalThis as unknown as { conn: postgres.Sql | undefined };

const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
```

**Nota:** El singleton `globalForDb` evita crear múltiples conexiones durante hot reload en desarrollo.

## Exportación de Esquemas

### Archivo: `src/server/db/schema.ts`

```typescript
export * from "./users";
```

## Esquemas de Tablas

### Archivo: `src/server/db/users.ts`

```typescript
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// ============================================================================
// USERS TABLE
// ============================================================================
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").$defaultFn(() => false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
});

// ============================================================================
// SESSIONS TABLE
// ============================================================================
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// ============================================================================
// ACCOUNTS TABLE
// ============================================================================
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// ============================================================================
// VERIFICATIONS TABLE
// ============================================================================
export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

// ============================================================================
// RELATIONS
// ============================================================================
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));
```

## Diagrama de Tablas

```
┌─────────────────────┐
│       users         │
├─────────────────────┤
│ id (PK)            │
│ name               │
│ email (UNIQUE)     │
│ emailVerified      │
│ image              │
│ createdAt          │
│ updatedAt          │
└─────────┬───────────┘
          │
          │ 1:N
          ▼
┌─────────────────────┐      ┌─────────────────────┐
│      sessions       │      │      accounts       │
├─────────────────────┤      ├─────────────────────┤
│ id (PK)            │      │ id (PK)            │
│ userId (FK)        │      │ userId (FK)        │
│ token (UNIQUE)     │      │ accountId          │
│ expiresAt          │      │ providerId         │
│ ipAddress          │      │ password           │
│ userAgent          │      │ accessToken        │
│ createdAt          │      │ refreshToken       │
│ updatedAt          │      │ createdAt          │
└─────────────────────┘      │ updatedAt          │
                             └─────────────────────┘
```

## Crear Tablas

```bash
pnpm drizzle-kit push
```

Este comando sincroniza los esquemas con la base de datos PostgreSQL.
