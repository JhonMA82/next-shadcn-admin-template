"use client";
"use no memo";

import type { ColumnDef } from "@tanstack/react-table";
import { addMinutes, differenceInCalendarDays, endOfToday, format, parseISO } from "date-fns";
import { CircleAlertIcon, CircleCheckIcon, ClockIcon, FileTextIcon, UserRound, XCircleIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import type { EnrollmentRow } from "./schema";

const statusConfig = {
  Pendiente: {
    variant: "outline",
    icon: <ClockIcon className="text-amber-600 dark:text-amber-500" />,
  },
  Aprobada: {
    variant: "default",
    icon: <CircleCheckIcon className="fill-green-500 stroke-primary-foreground dark:fill-green-600" />,
  },
  Rechazada: {
    variant: "destructive",
    icon: <XCircleIcon className="text-destructive-foreground" />,
  },
  Revisión: {
    variant: "secondary",
    icon: <CircleAlertIcon className="text-muted-foreground" />,
  },
} as const;

function documentProgress(documents: number, total: number) {
  const pct = Math.round((documents / total) * 100);

  if (pct === 100) return "default";
  if (pct >= 50) return "secondary";
  if (pct > 0) return "outline";
  return "destructive";
}

export const enrollmentsColumns: ColumnDef<EnrollmentRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all enrollments on this page"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`Select ${row.original.student}`}
        />
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "student",
    header: "Alumno",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-md border bg-muted">
          <UserRound className="size-4 text-muted-foreground" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="grid min-w-0 gap-0.5">
            <span className="truncate font-medium text-sm leading-none">{row.original.student}</span>
            <span className="truncate text-muted-foreground text-xs leading-none">#{row.original.id}</span>
          </div>
        </div>
      </div>
    ),
    enableHiding: false,
  },
  {
    id: "search",
    accessorFn: (row) => `${row.id} ${row.student} ${row.career} ${row.plan}`,
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    accessorKey: "career",
    header: "Carrera",
    cell: ({ row }) => <span className="text-sm">{row.original.career}</span>,
  },
  {
    accessorKey: "plan",
    header: "Plan",
    filterFn: "equalsString",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.plan}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    filterFn: "equalsString",
    cell: ({ row }) => {
      const config = statusConfig[row.original.status as keyof typeof statusConfig];

      return (
        <Badge variant={config?.variant ?? "outline"} className="gap-1 px-1.5">
          {config?.icon}
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    id: "documents",
    accessorKey: "documents",
    header: "Documentos",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FileTextIcon className="size-3.5 text-muted-foreground" />
        <span className="font-mono text-sm tabular-nums">
          {row.original.documents}/{row.original.total}
        </span>
        <Badge
          variant={documentProgress(row.original.documents, row.original.total)}
          className="px-1.5 font-mono text-xs tabular-nums"
        >
          {Math.round((row.original.documents / row.original.total) * 100)}%
        </Badge>
      </div>
    ),
  },
  {
    id: "submittedWindow",
    accessorFn: (row) => {
      const daysAgo = differenceInCalendarDays(endOfToday(), parseISO(row.submitted));

      if (daysAgo <= 7) return ["7", "14"];
      if (daysAgo <= 14) return ["14"];
      return [];
    },
    filterFn: "arrIncludes",
    enableHiding: true,
  },
  {
    accessorKey: "submitted",
    header: "Fecha de solicitud",
    cell: ({ row }) => {
      const baseDate = parseISO(row.original.submitted);
      const submittedAt = addMinutes(baseDate, (Number(row.original.id.split("-")[1]) % 12) * 17);

      return (
        <div className="grid gap-0.5">
          <span className="text-sm">{format(submittedAt, "do MMMM yyyy")}</span>
          <span className="text-muted-foreground text-xs">
            hace {differenceInCalendarDays(endOfToday(), parseISO(row.original.submitted))} días
          </span>
        </div>
      );
    },
  },
];
