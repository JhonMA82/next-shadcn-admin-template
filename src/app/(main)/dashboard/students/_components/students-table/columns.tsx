"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { addMinutes, differenceInCalendarDays, endOfToday, format, parseISO } from "date-fns";
import { CircleAlertIcon, CircleCheckIcon, GraduationCap, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import type { StudentRow } from "./schema";

const statusVariant = {
  Activo: "default",
  Inactivo: "destructive",
  Graduado: "outline",
} as const;

const statusIcon = {
  Activo: <CircleCheckIcon className="text-green-500 dark:text-green-600" />,
  Inactivo: <CircleAlertIcon className="text-muted-foreground" />,
  Graduado: <GraduationCap className="text-muted-foreground" />,
} as const;

function gradeBadge(grade: number) {
  if (grade >= 9) return "default";
  if (grade >= 7) return "secondary";
  if (grade >= 5) return "outline";
  return "destructive";
}

export const studentsColumns: ColumnDef<StudentRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all students on this page"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`Select ${row.original.name}`}
        />
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Alumno",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-md border bg-muted">
          <UserRound className="size-4 text-muted-foreground" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="grid min-w-0 gap-0.5">
            <span className="truncate font-medium text-sm leading-none">{row.original.name}</span>
            <span className="truncate text-muted-foreground text-xs leading-none">#{row.original.id}</span>
          </div>
        </div>
      </div>
    ),
    enableHiding: false,
  },
  {
    id: "search",
    accessorFn: (row) => `${row.id} ${row.name} ${row.email} ${row.career}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "career",
    header: "Carrera",
    cell: ({ row }) => <span className="text-sm">{row.original.career}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.original.email}</span>,
  },
  {
    accessorKey: "status",
    header: "Estado",
    filterFn: "equalsString",
    cell: ({ row }) => (
      <Badge
        variant={statusVariant[row.original.status as keyof typeof statusVariant] ?? "outline"}
        className="gap-1 px-1.5"
      >
        {statusIcon[row.original.status as keyof typeof statusIcon]}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "grade",
    header: "Promedio",
    cell: ({ row }) => (
      <Badge variant={gradeBadge(row.original.grade)} className="px-1.5 font-mono tabular-nums">
        {row.original.grade.toFixed(1)}
      </Badge>
    ),
  },
  {
    id: "enrolledWindow",
    accessorFn: (row) => {
      const daysSinceEnrolled = differenceInCalendarDays(endOfToday(), parseISO(row.enrolled));

      if (daysSinceEnrolled <= 90) return ["90", "180"];
      if (daysSinceEnrolled <= 180) return ["180"];
      return [];
    },
    filterFn: "arrIncludes",
    enableHiding: true,
  },
  {
    accessorKey: "enrolled",
    header: "Fecha de inscripción",
    cell: ({ row }) => {
      const baseDate = parseISO(row.original.enrolled);
      const enrolledAt = addMinutes(baseDate, (Number(row.original.id.split("-")[1]) % 12) * 25);

      return (
        <div className="grid gap-0.5">
          <span className="text-sm">{format(enrolledAt, "do MMMM yyyy")}</span>
          <span className="text-muted-foreground text-xs">
            hace {differenceInCalendarDays(endOfToday(), parseISO(row.original.enrolled))} días
          </span>
        </div>
      );
    },
  },
];
