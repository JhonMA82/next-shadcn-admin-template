import Link from "next/link";

import { SignInForm } from "../_components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="m-auto flex w-full max-w-md flex-col justify-center gap-6 px-4">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Iniciar Sesión</h1>
        <p className="text-muted-foreground text-sm">Ingresa tus credenciales para acceder a tu cuenta</p>
      </div>

      <SignInForm />

      <p className="text-muted-foreground text-center text-sm">
        ¿No tienes cuenta?{" "}
        <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
