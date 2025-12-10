import Link from "next/link";

import { SignUpForm } from "../_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="m-auto flex w-full max-w-md flex-col justify-center gap-6 px-4">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Crear Cuenta</h1>
        <p className="text-muted-foreground text-sm">Completa el formulario para registrarte</p>
      </div>

      <SignUpForm />

      <p className="text-muted-foreground text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link href="/sign-in" className="text-primary underline-offset-4 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
