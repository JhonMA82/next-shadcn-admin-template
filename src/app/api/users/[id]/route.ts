import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const [user] = await db.select().from(users).where(eq(users.id, id));

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Error al obtener usuario" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ message: "Nombre y email son requeridos" }, { status: 400 });
    }

    // Verificar si el usuario existe
    const [existingUser] = await db.select().from(users).where(eq(users.id, id));

    if (!existingUser) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Verificar si el email ya está en uso por otro usuario
    if (email !== existingUser.email) {
      const [emailInUse] = await db.select().from(users).where(eq(users.email, email));
      if (emailInUse) {
        return NextResponse.json({ message: "El email ya está en uso" }, { status: 409 });
      }
    }

    // Actualizar usuario
    await db
      .update(users)
      .set({
        name,
        email,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id));

    return NextResponse.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error al actualizar usuario" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Verificar si el usuario existe
    const [existingUser] = await db.select().from(users).where(eq(users.id, id));

    if (!existingUser) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Eliminar usuario
    await db.delete(users).where(eq(users.id, id));

    return NextResponse.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Error al eliminar usuario" }, { status: 500 });
  }
}
