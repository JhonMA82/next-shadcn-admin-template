"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Ingresá un email válido." }),
  career: z.string().min(1, { message: "Seleccioná una carrera." }),
  plan: z.string().min(1, { message: "Seleccioná un plan." }),
  phone: z.string().min(8, { message: "Ingresá un teléfono válido." }),
  birthDate: z.string().min(1, { message: "Ingresá la fecha de nacimiento." }),
  address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
  notes: z.string().optional(),
});

const careers = [
  { value: "", label: "Seleccionar..." },
  { value: "Ingeniería Informática", label: "Ingeniería Informática" },
  { value: "Medicina", label: "Medicina" },
  { value: "Derecho", label: "Derecho" },
  { value: "Arquitectura", label: "Arquitectura" },
  { value: "Administración de Empresas", label: "Administración de Empresas" },
  { value: "Psicología", label: "Psicología" },
  { value: "Contaduría Pública", label: "Contaduría Pública" },
  { value: "Diseño Gráfico", label: "Diseño Gráfico" },
  { value: "Marketing Digital", label: "Marketing Digital" },
  { value: "Nutrición", label: "Nutrición" },
  { value: "Ingeniería Civil", label: "Ingeniería Civil" },
] as const;

const plans = [
  { value: "", label: "Seleccionar..." },
  { value: "Regular", label: "Regular" },
  { value: "Becado", label: "Becado" },
  { value: "Corporativo", label: "Corporativo" },
] as const;

export function EnrollmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      career: "",
      plan: "",
      phone: "",
      birthDate: "",
      address: "",
      notes: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast("Inscripción registrada", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    form.reset();
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Formulario de Inscripción</CardTitle>
          <CardDescription>Completá los datos del alumno para registrar su inscripción.</CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FieldGroup className="gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="enrollment-name">Nombre completo</FieldLabel>
                      <Input
                        {...field}
                        id="enrollment-name"
                        placeholder="Juan Pérez"
                        autoComplete="name"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="enrollment-email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="enrollment-email"
                        type="email"
                        placeholder="juan@email.com"
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="career"
                  render={({ field, fieldState }) => (
                    <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="enrollment-career">Carrera</FieldLabel>
                      <NativeSelect {...field} id="enrollment-career" aria-invalid={fieldState.invalid}>
                        {careers.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </NativeSelect>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="plan"
                  render={({ field, fieldState }) => (
                    <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="enrollment-plan">Plan</FieldLabel>
                      <NativeSelect {...field} id="enrollment-plan" aria-invalid={fieldState.invalid}>
                        {plans.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </NativeSelect>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="enrollment-phone">Teléfono</FieldLabel>
                      <Input
                        {...field}
                        id="enrollment-phone"
                        type="tel"
                        placeholder="+54 11 1234-5678"
                        autoComplete="tel"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  control={form.control}
                  name="birthDate"
                  render={({ field, fieldState }) => (
                    <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="enrollment-birthdate">Fecha de nacimiento</FieldLabel>
                      <Input {...field} id="enrollment-birthdate" type="date" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="address"
                render={({ field, fieldState }) => (
                  <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="enrollment-address">Dirección</FieldLabel>
                    <Input
                      {...field}
                      id="enrollment-address"
                      placeholder="Av. Siempre Viva 742"
                      autoComplete="street-address"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <Field className="gap-1.5">
                    <FieldLabel htmlFor="enrollment-notes">Notas adicionales</FieldLabel>
                    <Textarea
                      {...field}
                      id="enrollment-notes"
                      placeholder="Observaciones, beca aplicada, documentación pendiente..."
                      rows={3}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
            <div className="flex gap-3">
              <Button type="submit" className="w-full sm:w-auto">
                Registrar inscripción
              </Button>
              <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => form.reset()}>
                Limpiar formulario
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Información</CardTitle>
          <CardDescription>Detalles importantes antes de inscribir.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="font-medium">Documentación requerida</p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-muted-foreground">
              <li>DNI (frente y dorso)</li>
              <li>Certificado de estudios secundarios</li>
              <li>Partida de nacimiento</li>
              <li>Foto 4x4 actualizada</li>
            </ul>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="font-medium">Planes disponibles</p>
            <ul className="mt-1 space-y-1 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Regular</span> — Pago mensual estándar
              </li>
              <li>
                <span className="font-medium text-foreground">Becado</span> — Con beneficio económico
              </li>
              <li>
                <span className="font-medium text-foreground">Corporativo</span> — Convenio con empresas
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
