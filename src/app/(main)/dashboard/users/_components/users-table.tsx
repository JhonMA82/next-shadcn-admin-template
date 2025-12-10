"use client";
"use no memo";

import { useEffect, useState } from "react";

import { Plus, RefreshCw, Users } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { createUsersColumns } from "./columns.users";
import { User } from "./schema";

interface UsersTableProps {
  onCreateUser?: () => void;
  onEditUser?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
  refreshKey?: number;
}

export function UsersTable({ onCreateUser, onEditUser, onDeleteUser, refreshKey }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]);

  const columns = createUsersColumns({
    onEdit: onEditUser,
    onDelete: onDeleteUser,
  });

  const table = useDataTableInstance({
    data: users,
    columns,
    getRowId: (row) => row.id,
  });

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="text-muted-foreground size-5" />
            <CardTitle>Usuarios</CardTitle>
          </div>
          <CardDescription>Gestiona los usuarios registrados en el sistema.</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={fetchUsers} disabled={isLoading}>
                <RefreshCw className={isLoading ? "animate-spin" : ""} />
                <span className="hidden lg:inline">Actualizar</span>
              </Button>
              <DataTableViewOptions table={table} />
              <Button size="sm" onClick={onCreateUser}>
                <Plus />
                <span className="hidden lg:inline">Nuevo Usuario</span>
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <RefreshCw className="text-muted-foreground size-6 animate-spin" />
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-md border">
                <DataTable table={table} columns={columns} />
              </div>
              <DataTablePagination table={table} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
