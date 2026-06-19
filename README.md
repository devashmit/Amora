# Amora

A modern web application to generate custom digital floral bouquets and interactive QR code messages.

> "Say it with flowers, share it with love."

Amora allows users to compose personalized messages that are dynamically translated into beautiful digital floral arrangements. Each flower represents a specific letter, sentiment, or symbol, building a unique visual bouquet. Users can customize their bouquet designs, add heartfelt notes, and generate premium interactive QR codes to share their creations with friends, family, and loved ones.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database & Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Animations:** Framer Motion
- **QR Code Generation:** qr-code-styling

---

## Prerequisites

Before setting up the project, ensure you have the following installed and configured:

- **Node.js:** version 18.x or later
- **Package Manager:** pnpm (version 8.x or later)
- **Supabase Account:** A Supabase project to handle database queries and asset storage

---

## Setup Instructions

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devashmit/Amora.git
   cd Amora
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   Copy the example environment file to create your local configuration:
   ```bash
   cp .env.local.example .env.local
   ```
   Open the `.env.local` file and fill in your Supabase project credentials.

4. **Set up the database schema:**
   Run the SQL scripts provided in the `supabase` directory inside your Supabase SQL Editor.

5. **Start the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Folder Structure

A high level overview of the project structure:

```text
├── src/
│   ├── app/            # Next.js pages, layouts, and routing definitions
│   ├── components/     # Reusable UI components (bouquet builder, interactive flower animations)
│   ├── hooks/          # Custom React hook definitions
│   ├── lib/            # Configuration files (Supabase client, global constants)
│   └── utils/          # Helper utilities and formatting functions
├── supabase/
│   ├── schema.sql      # Database schema and table definitions
│   └── functions.sql   # Remote Procedure Calls (RPC) and database triggers
├── public/             # Static assets (flower SVG assets, illustrations)
└── package.json        # Project metadata and scripts
```

---

## Environment Variables

Configure the following environment variables in your `.env.local` file:

| Variable Name | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | The public API URL of your Supabase project. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The anonymous public key for secure client-side database access. |
| `SUPABASE_SERVICE_ROLE_KEY` | The private service role key for administrative backend operations (do not share). |

---

## Available Scripts

The following package scripts are available:

- `pnpm dev`: Runs the Next.js development server.
- `pnpm build`: Compiles the application and generates the production build.
- `pnpm start`: Launches the compiled application in production mode.
- `pnpm lint`: Runs ESLint to identify and resolve code style issues.

---

## Database Schema & RPC Functions

The application database relies on the following key structures:

### Tables

- `bouquets`: Stores user-generated bouquets. Columns include `id`, `sender_name`, `recipient_name`, `message_text`, `flower_data` (JSONB mapping of letters to flowers), `qr_code_url`, and `created_at`.
- `flower_meanings`: Stores metadata about each flower, including its symbol, description, and corresponding alphabet mapping.

### Remote Procedure Calls (RPC)

- `increment_bouquet_views(bouquet_id)`: Increments the view count of a specific shared bouquet.
- `get_popular_bouquets()`: Returns the most viewed public bouquets for community inspiration.

---

## Deployment

The application is optimized for deployment on Vercel:

1. Import your GitHub repository into Vercel.
2. Configure the build command as `pnpm build` and output directory as `.next`.
3. Add the environment variables from your `.env.local` to the Vercel project settings.
4. Deploy the project.

---

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it.
