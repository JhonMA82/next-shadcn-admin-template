# Páginas de Autenticación

## Estructura

```
src/app/(auth)/
├── layout.tsx           # Layout split-screen
├── _components/
│   ├── sign-in-form.tsx # Formulario de login
│   └── sign-up-form.tsx # Formulario de registro
├── sign-in/
│   └── page.tsx         # Página de login
└── sign-up/
    └── page.tsx         # Página de registro
```

## Layout

### Archivo: `src/app/(auth)/layout.tsx`

Layout con diseño split-screen: formulario a la izquierda, branding a la derecha.

```tsx
import { ReactNode } from "react";
import { Command } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/config/app-config";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
        <div className="bg-primary relative order-2 hidden h-full rounded-3xl lg:flex">
          {/* Branding section */}
        </div>
        <div className="relative order-1 flex h-full">{children}</div>
      </div>
    </main>
  );
}
```

## Formulario de Login

### Archivo: `src/app/(auth)/_components/sign-in-form.tsx`

```tsx
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "@/server/auth/auth-client";

const signInSchema = z.object({
  email: z.string().email({ message: "Por favor ingresa un email válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  remember: z.boolean().optional(),
});

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/default";

  const form = useForm({...});

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: callbackUrl,
    });

    if (error) {
      toast.error("Error al iniciar sesión");
      return;
    }

    toast.success("¡Bienvenido!");
    router.push(callbackUrl);
    router.refresh();
  };

  return <Form {...form}>...</Form>;
}
```

## Formulario de Registro

### Archivo: `src/app/(auth)/_components/sign-up-form.tsx`

Similar al login pero con campos adicionales:
- `name` - Nombre del usuario
- `confirmPassword` - Confirmación de contraseña

```tsx
const { error } = await authClient.signUp.email({
  name: data.name,
  email: data.email,
  password: data.password,
  callbackURL: "/dashboard/default",
});
```

## Páginas

### Login: `src/app/(auth)/sign-in/page.tsx`

```tsx
import Link from "next/link";
import { SignInForm } from "../_components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="m-auto flex w-full max-w-md flex-col justify-center gap-6 px-4">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Iniciar Sesión</h1>
        <p className="text-muted-foreground text-sm">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>
      <SignInForm />
      <p className="text-muted-foreground text-center text-sm">
        ¿No tienes cuenta? <Link href="/sign-up">Regístrate</Link>
      </p>
    </div>
  );
}
```

### Registro: `src/app/(auth)/sign-up/page.tsx`

Estructura similar con `SignUpForm` y enlace a login.
