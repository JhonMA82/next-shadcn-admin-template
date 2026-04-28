# AGENTS.md — Studio Admin (Next.js 16 + Shadcn UI)

## Package Manager

- Use **pnpm** (lockfile is `pnpm-lock.yaml`). README says `npm install` — ignore it.
- No `packageManager` field in `package.json`, but pnpm is the implicit choice.

## Commands

| Task | Command |
|---|---|
| Dev server | `pnpm dev` |
| Production build | `pnpm build` |
| Lint only | `pnpm lint` |
| Format + lint + organize imports | `pnpm check:fix` |
| CI check (no write) | `pnpm check` |
| Generate theme presets | `pnpm generate:presets` |

Run `pnpm build` before pushing if you suspect type errors — there are no other typecheck or test commands.

## Tooling

- **Lint/Format**: Biome (`biome.json`). No ESLint, no Prettier.
- **Husky pre-commit hook** (`.husky/pre-commit`):
  1. Runs `generate:presets` — auto-generates `src/lib/preferences/theme.ts` from CSS preset files.
  2. Stages the generated theme file (`git add src/lib/preferences/theme.ts`).
  3. Runs `lint-staged` → Biome check on staged JS/TS/JSX/TSX files.
- If the commit fails due to a hook, the generated theme file may need to be staged first.

## Architecture

- **Colocation**: each route segment keeps its own `_components/` folder next to its `page.tsx`.
- **Route groups**: `(auth)` (login, register), `(main)` (dashboard, auth routes), `(external)` (landing).
- `@/*` alias → `./src/*`.
- `src/components/ui/` — shadcn-generated components. **Excluded from Biome** (`biome.json`). Do NOT edit these directly.
- `src/navigation/sidebar/` — sidebar navigation definitions.
- `src/stores/preferences/` — Zustand store for theme/layout preferences with a provider.

## Theme System

- Tailwind CSS v4 with CSS-first config (`@import "tailwindcss"` in `globals.css`). No `tailwind.config.ts`.
- Theme presets live in `src/styles/presets/*.css`. Each must include `/* label: ... */` and `/* value: ... */` comments.
- `src/lib/preferences/theme.ts` contains a **generated section** between `// --- generated:themePresets:start ---` and `// --- generated:themePresets:end ---`. Never edit manually.
- When adding a new CSS preset, run `pnpm generate:presets` to regenerate `theme.ts`.
- **Theme boot script** (`src/scripts/theme-boot.tsx`) runs inline `<script>` in `<head>` to apply theme data attributes before hydration — prevents flicker.

## Preferences & Persistence

Preferences (theme mode, preset, font, layout, sidebar variant, navbar style) use a multi-layer persistence system (`src/lib/preferences/preferences-config.ts`):
- `client-cookie` — written via browser `document.cookie`.
- `server-cookie` — written via Server Action (`src/server/server-actions.ts`).
- `localStorage` — client-only. **Cannot** be used for layout-critical keys (`sidebar_variant`, `sidebar_collapsible`) because SSR needs them.

## React-Specific

- **React Compiler enabled** (`reactCompiler: true` in `next.config.mjs`). `useMemo` and `useCallback` are unnecessary in most cases.
- React Strict Mode is on.
- Server Components by default. Add `"use client"` only where needed.

## Proxy Middleware

- `src/proxy.disabled.ts` — disabled by default. Rename to `proxy.ts` to activate the Next.js middleware.
- Used for rewrites, redirects, or header inspection before requests resolve.

## No Tests, No Database

- No test framework or test files exist.
- `drizzle/` and `src/trpc/` directories are empty stubs. No database yet.
- `config/` at root is empty (not used). App config is at `src/config/app-config.ts`.

## Creating Dashboard Pages

To add a new dashboard, touch only **2 files**:

| Action | File |
|--------|------|
| Sidebar entry | `src/navigation/sidebar/sidebar-items.ts` — add item to appropriate group |
| Page component | `src/app/(main)/dashboard/<name>/page.tsx` — Server Component, no `"use client"` |

Local components go in `_components/` next to `page.tsx`. Layout, theme, search, and preferences are inherited automatically — no extra wiring.

For TanStack Table components, add both directives: `"use client"` and `"use no memo"` (React Compiler compatibility).

Full patterns: see [studio-admin-dashboard skill](skills/studio-admin-dashboard/SKILL.md).

## Conventions

- Commit messages use conventional prefixes: `feat:`, `fix:`, `chore:`.
- Biome enforces: double quotes in JSX, semicolons, trailing commas, self-closing elements, no `any`, sorted Tailwind classes.
- `tw-animate-css` provides animation utilities (imported in `globals.css`).

## Available Skills

| Skill | Description |
|-------|-------------|
| `studio-admin-dashboard` | Dashboard page creation patterns, sidebar navigation, TanStack Table setup |
