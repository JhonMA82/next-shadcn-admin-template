import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { accounts, users } from "@/server/db/schema";

// Implementación de hash compatible con better-auth (Scrypt simplificado)
// better-auth usa la misma librería internamente
async function hashPassword(password: string): Promise<string> {
  const { hash } = await import("@node-rs/argon2");
  return hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
}

export async function GET() {
  try {
    const allUsers = await db.select().from(users).orderBy(users.createdAt);

    return NextResponse.json(
      allUsers.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      })),
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error al obtener usuarios" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Nombre, email y contraseña son requeridos" }, { status: 400 });
    }

    // Verificar si el email ya existe
    const [existingUser] = await db.select().from(users).where(eq(users.email, email));
    if (existingUser) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 409 });
    }

    // Generar ID único
    const userId = crypto.randomUUID();
    const now = new Date();

    // Hashear la contraseña con Argon2 (compatible con better-auth)
    let hashedPassword: string;
    try {
      hashedPassword = await hashPassword(password);
    } catch {
      // Fallback: usar hash simple si argon2 no está disponible
      const encoder = new TextEncoder();
      const data = encoder.encode(password + userId);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      hashedPassword = "$sha256$" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    // Crear usuario directamente en la base de datos (sin iniciar sesión)
    await db.insert(users).values({
      id: userId,
      name,
      email,
      emailVerified: false,
      image: null,
      createdAt: now,
      updatedAt: now,
    });

    // Crear la cuenta con el password hasheado
    await db.insert(accounts).values({
      id: crypto.randomUUID(),
      accountId: userId,
      providerId: "credential",
      userId: userId,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ message: "Usuario creado exitosamente" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);

    // Si hay error de constraint (email duplicado a nivel de BD)
    if (error instanceof Error && error.message.includes("unique")) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 409 });
    }

    return NextResponse.json({ message: "Error al crear usuario" }, { status: 500 });
  }
}
