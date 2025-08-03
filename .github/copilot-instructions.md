# Copilot Instructions für The Coding Vault

## Überblick & Architektur

- **The Coding Vault** ist ein selbstverwaltender Doku-Hub, der Manuel (und eingeladenen Nutzer\:innen) gleichzeitig als CMS, Nachschlagewerk und Lehrhilfe dient.
- Die App ist MDX-basiert, gebaut mit Next.js, TailwindCSS und Supabase.
- Inhalte werden in PostgreSQL gespeichert (Supabase als Backend), Markdown/MDX wird für die Darstellung verwendet.
- Authentifizierung und Rollenverwaltung sind zentral (`lib/auth.ts`, `lib/roles.ts`).
- Die App ist in **Admin**- und **Vault**-Bereiche unterteilt (`app/(admin)/`, `app/(vault)/`).

## Projektstruktur

```
root/
├── app/
│   ├── (admin)/         # Admin-Bereich: Dashboard, Editor, Userverwaltung, Login
│   ├── (vault)/         # Vault-Bereich: Content-Ansicht, Fehlerseiten, Loading, NotFound
│   ├── api/             # Next.js API-Routen: Auth, Vault, Fehler, Bild-Upload, OpenGraph
│   └── ...              # Globale Assets, Manifest, Icons
├── components/
│   ├── layout/          # Bereichspezifische Layouts (admin, vault)
│   ├── ui/shadcn/       # UI-Bibliothek: Buttons, Cards, Alerts, etc. (Radix, shadcn)
│   ├── general/         # Footer, Navbar
│   ├── auth/            # Login-Formular
│   └── ...
├── context/             # Theme-Provider
├── drizzle/
│   ├── db/              # Datenbank: Schema, Seed, Index, Relations
│   ├── *.sql            # Migrationen
│   └── meta/            # Snapshots
├── hooks/               # Custom React Hooks
├── lib/                 # Hilfsfunktionen: Auth, DB, Fehler, Rollen, Utils
├── types/               # Globale TypeScript-Typen
├── public/              # Statische Assets, Bilder, Logos
├── .env.example         # Beispiel-Umgebungsvariablen
├── package.json         # Abhängigkeiten & Skripte
├── README.md            # Projektbeschreibung
└── ...
```

## Technologien & Pakete

- **Frontend:** Next.js (App Router), React 19, TailwindCSS, shadcn/ui, Radix UI, Lucide Icons
- **MDX:** @mdx-js/loader, @mdx-js/react, @next/mdx, next-mdx-remote-client
- **Editor:** EditorJS + Plugins (Codecup, Delimiter, Embed, Header, List, Quote, Table, InlineCode, Alert, Annotation, Strikethrough, ToggleBlock, InlineHotkey, ImageTool)
- **Formular:** react-hook-form, @hookform/resolvers
- **Datenbank:** drizzle-orm, postgres, pg
- **Auth:** jose (JWT), bcryptjs, Supabase
- **Cloudinary:** next-cloudinary, cloudinary
- **Sonstiges:** dotenv, class-variance-authority, clsx, next-themes, remark-gfm, tailwind-merge, tw-animate-css, sonner (Toasts)

## Wichtige .env Variablen (ohne Werte)

- DATABASE_URL
- DIRECT_URL
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- NEXT_PUBLIC_CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- JWT_SECRET
- NEXT_PUBLIC_APP_URL
- DISCORD_WEBHOOK_URL (für Error-Reporting)

## UX & Suchfunktion

- Inhalte sollen mittels leistungsfähiger Suchfunktion mit Autocomplete auffindbar sein.
- Sortierung, Tags und dynamische Routen (`/docs/[slug]`) sind elementarer Bestandteil der UX.

## Datei- und Verzeichnis-Überblick

- **app/(admin)/admin/dashboard/**: Admin-Dashboard, Einträge und Userverwaltung
- **app/(admin)/admin/login/**: Login-Seite für Admins
- **app/(vault)/vault/**: Vault-Content, Slug-basierte Einträge, Fehlerseiten
- **app/api/auth/**: Authentifizierung (Login, Logout, Register, User-Info)
- **app/api/vault/**: Vault-spezifische API (Kategorien, Bild-Upload, Save-Entry)
- **app/api/error/**: Fehler-Reporting (z.B. an Discord)
- **components/layout/admin/editor/**: Editor-Komponenten, EditorJS, MDX-Konvertierung
- **components/layout/vault/**: Vault-spezifische UI (Sidebar, Author, Alerts, etc.)
- **components/ui/shadcn/**: UI-Komponenten (Button, Card, Alert, Table, Tooltip, etc.)
- **context/theme-provider.tsx**: Theme-Handling (Dark/Light)
- **drizzle/db/schema.ts**: Datenbank-Schema (User, VaultEntry, Category, Enums)
- **drizzle/db/seed.ts**: Seed-Skript für Kategorien
- **drizzle/db/relations.ts**: DB-Relationen (VaultEntry ↔ User/Category)
- **lib/auth.ts**: JWT-Auth, User-Session, Guards
- **lib/roles.ts**: Rollenlogik (SUPERADMIN, MODERATOR, GUEST)
- **lib/db.ts**: DB-Queries, Caching, Fehlerbehandlung
- **lib/error.ts**: Fehler-Reporting (Discord, Logging)
- **mdx-components.tsx**: Registrierung und Styling von MDX-Komponenten
- **types/types.ts**: Globale Typen (User, VaultEntry, Category, Content, JWT, etc.)

## Zukünftige Ideen & ToDos

- Erweiterte MDX-Komponenten: Callout, Hint, Tabs
- Export der Inhalte nach PDF oder ZIP (für Schüler\:innen und Lernende)
- Autocomplete / erweiterte Suchfunktion

## Patterns & Workflows

- **Start & Setup:**
  - `.env` aus `.env.example` kopieren, Keys setzen
  - `npm install` → `npm run dev` für lokalen Start
- **Migrationen:**
  - Migrationen in `drizzle/` mit Drizzle verwalten
  - Schema-Änderungen in `drizzle/db/schema.ts` dokumentieren
- **Editor-Workflow:**
  - EditorJS im Admin-Bereich, Konvertierung zu MDX (`convert-editor-js-to-mdx.tsx`)
  - Speichern via API (`app/api/vault/save-entry/route.ts`)
- **Vault-Workflow:**
  - Content-Rendering mit MDX, Sidebar, Author, Skeleton-Loader
- **Fehlerbehandlung:**
  - Fehlerseiten (`app/(vault)/error.tsx`), Error-API (`app/api/error/report-error/`), Discord-Webhook
- **Auth & Rollen:**
  - JWT-Auth mit jose, Rollenlogik in `lib/roles.ts`, Guards in `lib/auth.ts`
- **Bild-Upload:**
  - Cloudinary-Integration über API, Rückgabe von URLs
- **UI:**
  - shadcn-Komponenten für konsistente UI, Tailwind für Styling
- **Typen:**
  - Typen in `types/` prüfen und wiederverwenden

## Hinweise für AI Agents

- Halte dich strikt an die bestehende Struktur und Konventionen
- Prüfe Typen in `types/` bevor du neue Typen definierst
- Nutze Hilfsfunktionen aus `lib/` für Auth, DB, Fehler
- Beachte die Trennung zwischen Admin- und Vault-Bereich
- API-Routen immer als JSON, Fehler konsistent melden
- Dokumentiere neue Patterns/Workflows im README und copilot-instructions
- Prüfe Umgebungsvariablen vor Supabase/Cloudinary-Nutzung
- Projektstruktur, UX-Flows oder Architekturfragen dürfen gerne detailliert besprochen werden
- Antworten dürfen auch technische Implementierungsdetails enthalten, solange sie Manuel nicht mit finalem Code erschlagen 😉

Happy vault-building! 💾🧱✨
