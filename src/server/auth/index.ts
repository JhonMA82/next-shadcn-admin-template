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
