import { OverviewCards } from "./_components/overview-cards";
import { StudentsTable } from "./_components/students-table";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <OverviewCards />
      <StudentsTable />
    </div>
  );
}
