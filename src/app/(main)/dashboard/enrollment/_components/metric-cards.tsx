import { ClockIcon, FileCheck, ShieldCheck, UserPlus, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <UserPlus className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Total Solicitudes</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">20</div>
            <Badge>
              <UserPlus className="size-3" />
              +8.3%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Inscripciones recibidas este mes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <ClockIcon className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Pendientes</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">8</div>
            <Badge variant="outline">
              <ClockIcon className="size-3" />
              40%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Requieren revisión de documentos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <ShieldCheck className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Aprobadas</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">6</div>
            <Badge>
              <FileCheck className="size-3" />
              30%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Inscripciones confirmadas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <XCircle className="size-4" />
            </div>
          </CardTitle>
          <CardDescription>Rechazadas</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">3</div>
            <Badge variant="destructive">
              <XCircle className="size-3" />
              15%
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">Documentación incompleta</p>
        </CardContent>
      </Card>
    </div>
  );
}
