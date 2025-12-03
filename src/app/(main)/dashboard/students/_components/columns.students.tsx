import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { studentSchema } from "./schema";

export const studentsColumns: ColumnDef<z.infer<typeof studentSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <span className="tabular-nums">{row.original.id}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    cell: ({ row }) => <span>{row.original.name}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
  },
  {
    accessorKey: "program",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Programa" />,
    cell: ({ row }) => <span>{row.original.program}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "gpa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Promedio" />,
    cell: ({ row }) => {
      const gpa = row.original.gpa;
      return (
        <span className={gpa >= 3.5 ? "font-semibold text-green-600 tabular-nums" : "tabular-nums"}>
          {gpa.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => {
      const status = row.original.status;
      const statusConfig = {
        active: { label: "Activo", variant: "default" as const },
        inactive: { label: "Inactivo", variant: "secondary" as const },
        graduated: { label: "Graduado", variant: "outline" as const },
      };
      // eslint-disable-next-line security/detect-object-injection
      const config = statusConfig[status];

      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "enrollmentDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de Inscripción" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.enrollmentDate}</span>,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" className="text-muted-foreground flex size-8" size="icon">
        <EllipsisVertical />
        <span className="sr-only">Open menu</span>
      </Button>
    ),
    enableSorting: false,
  },
];
