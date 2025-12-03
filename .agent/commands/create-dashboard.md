# Comando: /create-dashboard

## Descripción
Genera un dashboard completo siguiendo la arquitectura de colocalización del proyecto, incluyendo página principal, componentes específicos, configuración de navegación y tipos TypeScript.

## Uso
```
/create-dashboard [nombre] [tipo]
```

### Parámetros
- **nombre**: Nombre del dashboard en kebab-case (ej: `analytics`, `e-commerce`, `logistics`)
- **tipo**: Tipo de dashboard - `metrics` | `operations` | `analytics` | `custom` (opcional, default: `custom`)

### Ejemplos
```bash
/create-dashboard analytics metrics
/create-dashboard e-commerce operations
/create-dashboard academy custom
```

---

## Proceso de Generación

### 1. Validación Previa

**Preguntar al usuario:**
- ✅ Nombre del dashboard (kebab-case)
- ✅ Título visible en UI (ej: "Analytics Dashboard")
- ✅ Icono de Lucide React (ej: `BarChart3`, `ShoppingCart`)
- ✅ Tipo de dashboard (afecta estructura de componentes)
- ✅ Descripción breve (para metadata SEO)

**Validar que NO exista:**
```
src/app/(main)/dashboard/{nombre}/
```

---

### 2. Crear Estructura de Carpetas

```
src/app/(main)/dashboard/{nombre}/
├── _components/                    # Componentes EXCLUSIVOS de este dashboard
│   ├── overview-cards.tsx          # Cards de resumen/métricas
│   ├── {nombre}-table.tsx          # Tabla de datos (si aplica)
│   └── columns.{nombre}.tsx        # Definición de columnas (si tiene tabla)
└── page.tsx                        # Página principal del dashboard
```

**Ejemplo para `analytics`:**
```
src/app/(main)/dashboard/analytics/
├── _components/
│   ├── overview-cards.tsx
│   ├── analytics-table.tsx
│   ├── columns.analytics.tsx
│   └── metrics-chart.tsx
└── page.tsx
```

---

### 3. Generar `page.tsx`

**Template Base:**

```typescript
import type { Metadata } from "next";

import { OverviewCards } from "./_components/overview-cards";
// Importar otros componentes según tipo

export const metadata: Metadata = {
  title: "{Título} Dashboard - Studio Admin",
  description: "{Descripción del dashboard}",
};

export default function {Nombre}DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-6 lg:p-8">
      {/* Encabezado */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {Título} Dashboard
        </h1>
        <p className="text-muted-foreground">
          {Descripción breve del dashboard}
        </p>
      </div>

      {/* Componentes del dashboard */}
      <OverviewCards />
      
      {/* Agregar más componentes según tipo */}
    </div>
  );
}
```

**Adaptaciones por Tipo:**

#### `metrics` (Tipo Métricas)
```typescript
// Incluir:
- OverviewCards (4-6 métricas principales)
- Gráfico principal (área/línea/barra)
- Tabla de datos (opcional)
```

#### `operations` (Tipo Operaciones)
```typescript
// Incluir:
- OverviewCards (2-4 KPIs)
- Tablas operacionales (actividades recientes)
- Cards de insights
- Cards de acciones rápidas
```

#### `analytics` (Tipo Analytics)
```typescript
// Incluir:
- OverviewCards (métricas de tráfico/conversión)
- Múltiples gráficos (charts)
- Tablas comparativas
- Filtros de fecha
```

---

### 4. Generar `overview-cards.tsx`

**Template:**

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  // Importar iconos necesarios de lucide-react
} from "lucide-react";

export function OverviewCards() {
  const cards = [
    {
      title: "Métrica 1",
      value: "12,345",
      change: "+12.5%",
      trend: "up" as const,
      icon: IconoLucide,
      description: "vs último mes",
    },
    // ... más cards según el tipo
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  card.trend === "up" 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                }
              >
                {card.change}
              </span>{" "}
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

### 5. Generar Componentes Adicionales (Según Tipo)

#### Si incluye Tabla de Datos:

**`{nombre}-table.tsx`:**

```typescript
"use client";

import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { DataTable } from "@/components/data-table/data-table";

import { columns } from "./columns.{nombre}";
import { type {Nombre}Data } from "./columns.{nombre}";

// Datos de ejemplo (reemplazar con fetch real)
const mockData: {Nombre}Data[] = [
  // ... datos de ejemplo
];

export function {Nombre}Table() {
  const table = useDataTableInstance({
    data: mockData,
    columns,
  });

  return (
    <div className="space-y-4">
      <DataTable table={table} />
    </div>
  );
}
```

**`columns.{nombre}.tsx`:**

```typescript
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export interface {Nombre}Data {
  id: string;
  // ... definir campos según el dashboard
}

export const columns: ColumnDef<{Nombre}Data>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  // ... más columnas
];
```

#### Si incluye Gráficos:

**`{nombre}-chart.tsx`:**

```typescript
"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  // ... datos del gráfico
];

const chartConfig = {
  // ... configuración de colores
};

export function {Nombre}Chart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Título del Gráfico</CardTitle>
        <CardDescription>Descripción</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Area
              dataKey="value"
              type="natural"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
```

---

### 6. Actualizar Navegación del Sidebar

**Ubicación:** `src/navigation/sidebar/sidebar-items.ts`

**Agregar al grupo "Dashboards":**

```typescript
{
  title: "{Título}",
  url: "/dashboard/{nombre}",
  icon: {IconoImportado},
  badge: "New", // Opcional por 30 días
}
```

**Importar icono:**
```typescript
import { {IconoImportado} } from "lucide-react";
```

---

### 7. Crear Tipos TypeScript (Opcional)

**Si necesita tipos específicos:**

```
src/types/{nombre}/
├── index.ts
└── {nombre}-types.ts
```

**`{nombre}-types.ts`:**
```typescript
export interface {Nombre}Metrics {
  // ... tipos de métricas
}

export interface {Nombre}Filter {
  dateRange?: [Date, Date];
  status?: string;
}
```

---

### 8. Agregar Data Mock (Desarrollo)

**Ubicación:** `src/data/{nombre}.ts`

```typescript
import { type {Nombre}Data } from "@/app/(main)/dashboard/{nombre}/_components/columns.{nombre}";

export const mock{Nombre}Data: {Nombre}Data[] = [
  {
    id: "1",
    // ... datos de ejemplo
  },
  // ... más registros
];
```

---

### 9. Checklist Final

Antes de completar, verificar:

- [ ] ✅ Carpeta creada en `src/app/(main)/dashboard/{nombre}/`
- [ ] ✅ `page.tsx` con metadata SEO correcta
- [ ] ✅ `_components/` con al menos 1 componente
- [ ] ✅ Componentes usan "use client" solo cuando necesario
- [ ] ✅ Imports ordenados según eslint config
- [ ] ✅ TypeScript sin errores (`npm run type-check`)
- [ ] ✅ Sidebar actualizado con nuevo item
- [ ] ✅ Responsive design (mobile, tablet, desktop)
- [ ] ✅ Accesibilidad (aria-labels si aplica)
- [ ] ✅ Soporte dark/light mode
- [ ] ✅ Comentarios en código complejo

---

### 10. Comandos Post-Generación

```bash
# Verificar tipos
npm run type-check

# Lint y formatear
npm run lint
npm run format

# Iniciar dev server
npm run dev

# Navegar a:
http://localhost:3000/dashboard/{nombre}
```

---

## Templates por Tipo

### Template: `metrics`
**Componentes:**
- `overview-cards.tsx` (4-6 cards)
- `{nombre}-chart.tsx` (1 gráfico principal)
- `metrics-grid.tsx` (grid de métricas secundarias)

### Template: `operations`
**Componentes:**
- `overview-cards.tsx` (2-4 cards)
- `{nombre}-table.tsx` (tabla de operaciones)
- `columns.{nombre}.tsx`
- `quick-actions.tsx` (acciones rápidas)

### Template: `analytics`
**Componentes:**
- `overview-cards.tsx` (4 cards)
- `traffic-chart.tsx`
- `conversion-chart.tsx`
- `{nombre}-table.tsx`
- `columns.{nombre}.tsx`
- `date-range-filter.tsx`

### Template: `custom`
**Componentes básicos:**
- `overview-cards.tsx`
- (Usuario define componentes adicionales)

---

## Notas Importantes

### Arquitectura de Colocalización
- ✅ **TODO** el código específico del dashboard va en su carpeta
- ✅ Solo usar `_components/` para componentes EXCLUSIVOS
- ✅ Componentes compartidos van en `src/components/`
- ✅ NO crear componentes en `_components/` si se usan en múltiples dashboards

### Convenciones de Nombres
- Carpetas: `kebab-case` (ej: `e-commerce`)
- Componentes: `PascalCase` (ej: `OverviewCards`)
- Archivos: `kebab-case.tsx` (ej: `overview-cards.tsx`)
- Prefijos de columnas: `columns.{nombre}.tsx`

### Performance
- Server Components por defecto
- `"use client"` solo en componentes con:
  - Hooks de estado (`useState`, `useEffect`)
  - Event handlers (`onClick`, etc.)
  - Context consumers
  - Browser APIs

### SEO
- Siempre incluir `metadata` en `page.tsx`
- Título descriptivo
- Description única por dashboard
- Open Graph tags (si se implementa)

---

## Ejemplo Completo: Analytics Dashboard

```bash
/create-dashboard analytics metrics
```

**Resultado:**
```
✓ Created src/app/(main)/dashboard/analytics/
✓ Created src/app/(main)/dashboard/analytics/_components/overview-cards.tsx
✓ Created src/app/(main)/dashboard/analytics/_components/traffic-chart.tsx
✓ Created src/app/(main)/dashboard/analytics/_components/analytics-table.tsx
✓ Created src/app/(main)/dashboard/analytics/_components/columns.analytics.tsx
✓ Created src/app/(main)/dashboard/analytics/page.tsx
✓ Updated src/navigation/sidebar/sidebar-items.ts
✓ Created src/data/analytics.ts

Dashboard "Analytics" creado exitosamente!

Próximos pasos:
1. Revisar componentes generados
2. Conectar con datos reales (tRPC/Server Actions)
3. Ajustar estilos según necesidad
4. Probar en navegador: http://localhost:3000/dashboard/analytics
```

---

## Referencias

- [Arquitectura del Proyecto](./.docs/arquitectura.md)
- [Dashboards Existentes](../src/app/(main)/dashboard/)
  - Default: Ejemplo con gráfico interactivo
  - CRM: Ejemplo con múltiples cards
  - Finance: Ejemplo con overview financiero
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Recharts Docs](https://recharts.org/)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
