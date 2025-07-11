# The Coding Vault

🧠 A knowledge-driven, MDX-powered CMS built with Next.js, TailwindCSS, Drizzle ORM, and Supabase.

## Status

This project is a work in progress and currently in the setup phase.

## Features

- Admin interface for creating and editing entries
- Content stored in PostgreSQL (via Supabase & Drizzle ORM)
- Markdown/MDX-based rendering (MDX, EditorJS)
- Image handling with Cloudinary
- Secure access with role-based authentication (JWT, Supabase)
- Modern UI with shadcn/ui, Radix UI, Lucide Icons
- Dark/Light Theme support

## Getting Started

Create a `.env` file based on `.env.example`.
Drizzle ORM is used for all database schema and migrations (see `drizzle/`).

Then install dependencies:

```bash
npm install
```

And run the dev server:

```bash
npm run dev
```

---

## Tech Stack

- **Frontend:** Next.js (App Router), React 19, TailwindCSS
- **UI:** shadcn/ui, Radix UI, Lucide Icons
- **Content:** MDX, EditorJS (+ Plugins)
- **Database:** PostgreSQL (Supabase), Drizzle ORM
- **Auth:** JWT (jose), Supabase, bcryptjs
- **Image:** Cloudinary, next-cloudinary
- **Forms:** react-hook-form
- **Other:** dotenv, class-variance-authority, clsx, next-themes, remark-gfm, tailwind-merge, sonner

## Environment Variables

See `.env.example` for all required variables:

- DATABASE_URL
- DIRECT_URL
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- NEXT_PUBLIC_CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- JWT_SECRET
- NEXT_PUBLIC_APP_URL
- DISCORD_WEBHOOK_URL

---

More details will be added as the project evolves 🚧
