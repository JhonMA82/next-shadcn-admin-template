import enrollmentsData from "./_components/enrollments-table/data.json";
import { EnrollmentsTable } from "./_components/enrollments-table/table";
import { MetricCards } from "./_components/metric-cards";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div>
        <h1 className="font-semibold text-2xl">Inscripción de Alumnos</h1>
        <p className="text-muted-foreground text-sm">
          Gestioná las solicitudes de inscripción, verificá documentos y confirmá el ingreso de nuevos alumnos.
        </p>
      </div>
      <MetricCards />
      <EnrollmentsTable data={enrollmentsData} />
    </div>
  );
}
