# Deployment Notes for AI Assistants

## Railway Deployment - Critical Pattern

### Problem
Railway's private networking is NOT available during build phase. Any attempt to connect to `*.railway.internal` during `next build` will fail.

### Solution Pattern
Add to root layout to force runtime rendering:
```typescript
export const dynamic = 'force-dynamic'
```

### Why This Works
- Build phase: No database connection attempted
- Runtime: Pages render on-demand with database access

### Files Changed
- `src/app/(frontend)/layout.tsx` - Added `dynamic = 'force-dynamic'`
- All pages with `generateStaticParams` - Added Railway environment check

### Remember
This pattern applies to ANY platform where:
- Services deploy in separate phases
- Private networking initializes after build completes
- Database isn't accessible during build time

Common platforms: Railway, Render, Fly.io (when using private networking)

### Alternative Approaches (NOT used here)
- Vercel: Use public database URLs (build happens in isolated environment)
- Netlify: Use build plugins to skip database operations
- Docker multi-stage: Build without DB, runtime with DB

---
Generated: December 2025
Project: spike-test (Payload CMS + Next.js on Railway)
