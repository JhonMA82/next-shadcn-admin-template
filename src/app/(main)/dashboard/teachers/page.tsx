import { OverviewCards } from "./_components/overview-cards";
import { TeachersTable } from "./_components/teachers-table";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <OverviewCards />
      <TeachersTable />
    </div>
  );
}
