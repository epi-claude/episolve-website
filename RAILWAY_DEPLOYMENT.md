# Railway Deployment Guide

## Critical: Database Connection During Build

**IMPORTANT:** Railway's private networking (`.railway.internal` domains) is **NOT available during the build phase**. It only becomes available at runtime after services are fully deployed.

### The Problem

If your Next.js app tries to connect to the database during build (for static page generation), it will fail with:
```
Error: getaddrinfo ENOTFOUND {service}.railway.internal
```

### The Solution

**Disable all static page generation during build** by adding this to your root layout:

```typescript
// src/app/(frontend)/layout.tsx
export const dynamic = 'force-dynamic'
```

This forces all pages to render on-demand at runtime (when database is accessible) instead of during build time.

### Additional Steps

1. **Skip `generateStaticParams` on Railway:**
   ```typescript
   export async function generateStaticParams() {
     if (process.env.RAILWAY_ENVIRONMENT) {
       return []
     }
     // ... rest of your static params logic
   }
   ```

2. **Use Railway variable references for DATABASE_URI:**
   ```
   DATABASE_URI=${{Postgres.DATABASE_PRIVATE_URL}}
   ```
   Not a hardcoded connection string.

## Deployment Steps

### 1. Environment Variables

Set these in Railway dashboard:

```bash
PAYLOAD_SECRET=<generated-secret>
CRON_SECRET=<generated-secret>
PREVIEW_SECRET=<generated-secret>
NEXT_PUBLIC_SERVER_URL=${{RAILWAY_PUBLIC_DOMAIN}}
DATABASE_URI=${{Postgres.DATABASE_PRIVATE_URL}}
```

Generate secrets with:
```bash
openssl rand -base64 32
```

### 2. Add PostgreSQL Database

In Railway project:
- Click **+ New**
- Select **Database** → **Add PostgreSQL**
- Railway automatically sets `DATABASE_URL` and `DATABASE_PRIVATE_URL`

### 3. Deploy

Push to GitHub - Railway auto-deploys on push.

### 4. Run Migrations

After first successful deployment:

```bash
railway link  # Link CLI to project
railway run pnpm payload migrate
```

Or in Railway dashboard:
- Go to your service → **Settings** → **Deploy**
- Add a one-time deploy command: `pnpm payload migrate && pnpm start`
- Redeploy, then change back to `pnpm start`

## Troubleshooting

### Build fails with database connection error
- Check that `dynamic = 'force-dynamic'` is in the layout
- Verify `generateStaticParams` returns `[]` when `RAILWAY_ENVIRONMENT` is set

### Runtime database connection fails
- Verify `DATABASE_URI` uses Railway variable reference: `${{Postgres.DATABASE_PRIVATE_URL}}`
- Check both services are in the same Railway project
- Confirm PostgreSQL service name matches the reference (case-sensitive)

### Migrations fail
- Ensure database is fully deployed before running migrations
- Link Railway CLI: `railway link`
- Run in correct environment: `railway run -e production pnpm payload migrate`

## Why This Matters

Railway deploys services in phases:
1. **Build phase:** Code is compiled, no networking available
2. **Deploy phase:** Container starts, networking initializes
3. **Runtime:** All services connected via private network

Next.js static generation happens during **build phase**, so database connections will always fail. The solution is to defer all database-dependent rendering to **runtime**.

---

**Last Updated:** December 2025
**Tested With:** Next.js 15.4.7, Payload CMS 3.65.0, Railway
