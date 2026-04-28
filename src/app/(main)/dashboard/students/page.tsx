import { MetricCards } from "./_components/metric-cards";
import studentsData from "./_components/students-table/data.json";
import { StudentsTable } from "./_components/students-table/table";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div>
        <h1 className="font-semibold text-2xl">Gestión de Alumnos</h1>
        <p className="text-muted-foreground text-sm">
          Administrá el listado de alumnos, estados académicos y promedios.
        </p>
      </div>
      <MetricCards />
      <StudentsTable data={studentsData} />
    </div>
  );
}
