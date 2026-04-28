import { EnrollmentForm } from "./_components/enrollment-form";
import { MetricCards } from "./_components/metric-cards";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div>
        <h1 className="font-semibold text-2xl">Inscripción de Alumnos</h1>
        <p className="text-muted-foreground text-sm">
          Completá el formulario para registrar un nuevo alumno. Todos los campos marcados son obligatorios.
        </p>
      </div>
      <MetricCards />
      <EnrollmentForm />
    </div>
  );
}
