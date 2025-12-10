# Gestión de Usuarios

## Estructura

```
src/app/(main)/dashboard/users/
├── page.tsx                    # Página principal
└── _components/
    ├── schema.ts               # Esquema Zod
    ├── columns.users.tsx       # Definición de columnas
    ├── users-table.tsx         # Tabla de usuarios
    ├── create-user-dialog.tsx  # Modal crear
    └── edit-user-dialog.tsx    # Modal editar
```

## API Endpoints

### Archivo: `src/app/api/users/route.ts`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Listar todos los usuarios |
| POST | `/api/users` | Crear nuevo usuario |

### Archivo: `src/app/api/users/[id]/route.ts`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users/:id` | Obtener usuario por ID |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |

## Crear Usuario (sin cambiar sesión)

```typescript
// POST /api/users
export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // 1. Verificar email único
  const [existingUser] = await db.select().from(users).where(eq(users.email, email));
  if (existingUser) {
    return NextResponse.json({ message: "El email ya está registrado" }, { status: 409 });
  }

  // 2. Generar ID y hashear password
  const userId = crypto.randomUUID();
  const { hash } = await import("@node-rs/argon2");
  const hashedPassword = await hash(password, {...opciones});

  // 3. Insertar usuario
  await db.insert(users).values({
    id: userId,
    name,
    email,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // 4. Insertar cuenta con password
  await db.insert(accounts).values({
    id: crypto.randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId: userId,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({ message: "Usuario creado" }, { status: 201 });
}
```

**Importante:** Usamos `@node-rs/argon2` para hashear passwords de forma compatible con better-auth, sin usar `signUp.email()` que cambiaría la sesión actual.

## Componentes

### Schema (`schema.ts`)

```typescript
import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
```

### Columnas (`columns.users.tsx`)

Función factory que recibe callbacks para acciones:

```typescript
interface ColumnsOptions {
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export function createUsersColumns(options?: ColumnsOptions): ColumnDef<User>[] {
  return [
    // Checkbox, Usuario (avatar + nombre), Email, Estado, Creado, Acciones
  ];
}
```

### Tabla (`users-table.tsx`)

```typescript
interface UsersTableProps {
  onCreateUser?: () => void;
  onEditUser?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
  refreshKey?: number;
}

export function UsersTable({ onCreateUser, onEditUser, onDeleteUser, refreshKey }) {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]);

  // Render DataTable...
}
```

### Página Principal (`page.tsx`)

```typescript
export default function UsersPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <UsersTable
        onCreateUser={() => setIsCreateDialogOpen(true)}
        onEditUser={(user) => { setSelectedUser(user); setIsEditDialogOpen(true); }}
        onDeleteUser={(user) => { setSelectedUser(user); setIsDeleteDialogOpen(true); }}
        refreshKey={refreshKey}
      />
      <CreateUserDialog ... />
      <EditUserDialog user={selectedUser} ... />
      <AlertDialog ... /> {/* Confirmación de eliminación */}
    </>
  );
}
```

## Navegación

El enlace está en `src/navigation/sidebar/sidebar-items.ts`:

```typescript
{
  title: "Users",
  url: "/dashboard/users",
  icon: Users,
},
```
