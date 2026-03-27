# Flag Review Oversight Dashboard

A minimal React (Next.js) app for reviewing case flags, backed by PostgreSQL, designed to be embedded in Power BI via the Web Content visual.

## Quick Start (5 Steps)

### 1. Get a Free Database (Neon)
- Go to [console.neon.tech](https://console.neon.tech)
- Sign up (free)
- Create a project and copy your connection string

### 2. Set up Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env and paste your Neon connection string
```

### 3. Install & Setup
```bash
npm install
npm run db:setup    # Create tables
npm run db:seed     # Add mock data
```

### 4. Run Locally
```bash
npm run dev
```

Open http://localhost:3000 — you should see the dashboard!

### 5. Deploy to Vercel
```bash
npm i -g vercel
vercel
```
When prompted, add `DATABASE_URL` as an environment variable.

## Embed in Power BI

1. In Power BI Desktop, add a **Web content** visual
2. Set the URL to your Vercel app (e.g., `https://yourapp.vercel.app`)
3. The React app renders inside Power BI!

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Neon PostgreSQL (free tier)
- **Hosting**: Vercel (free tier)

## Features

✅ Case selector (searchable dropdown)
✅ Expandable flag cards with details
✅ Mark flags as Confirmed or Rejected
✅ Add reviewer notes
✅ Mock data with 6 cases and 15+ realistic flags
✅ Responsive (works in Power BI iframe)

## Project Structure

```
flag-review-dashboard/
├── sql/                    # Database setup
│   ├── schema.sql
│   ├── setup.mjs
│   └── seed.mjs
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── page.tsx       # Main dashboard
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   └── FlagCard.tsx
│   └── lib/
│       ├── db.ts
│       └── types.ts
├── package.json
├── README.md
└── .env.example
```

## Questions?

This is a proof-of-concept. All code is intentionally simple and minimal. For production use, add authentication, better error handling, and form validation.
