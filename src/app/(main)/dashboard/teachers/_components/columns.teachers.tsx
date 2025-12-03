import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Star } from "lucide-react";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { teacherSchema } from "./schema";

export const teachersColumns: ColumnDef<z.infer<typeof teacherSchema>>[] = [
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
    accessorKey: "department",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
    cell: ({ row }) => <span>{row.original.department}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => {
      const rating = row.original.rating;
      return (
        <div className="flex items-center gap-1">
          <Star className={`size-4 ${rating >= 4.5 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
          <span className={rating >= 4.5 ? "font-semibold text-yellow-600 tabular-nums" : "tabular-nums"}>
            {rating.toFixed(1)}
          </span>
        </div>
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
        "on-leave": { label: "En Licencia", variant: "outline" as const },
      };
      // eslint-disable-next-line security/detect-object-injection
      const config = statusConfig[status];

      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "hireDate",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de Contratación" />,
    cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.hireDate}</span>,
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
