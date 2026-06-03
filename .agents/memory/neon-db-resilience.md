---
name: Neon DB resilience patterns
description: Root causes and fixes for production crashes caused by Neon serverless endpoint auto-suspend; critical to keep consistent.
---

## Problem
Production deployments crashed in a restart loop because Replit's health-check probe
hit `GET /` → guestMiddleware → DB → Neon suspended endpoint → crash → redeploy fails.

## Root Causes & Fixes

### 1. Neon returns two different errors when suspended
- **"endpoint has been disabled"** — returned immediately (fast fail)
- **"timeout exceeded when trying to connect"** — returned after `connectionTimeoutMillis` elapses (slow fail)

**Fix**: `isRetryableError()` in `lib/db/src/index.ts` must match BOTH strings.

### 2. Double-retry loop from overriding both `query()` and `connect()`
`pg.Pool.query()` internally calls `this.connect()`. If NeonPool overrides both,
every query gets O(n²) retry attempts (inner × outer).

**Fix**: Only override `query()` in NeonPool. Remove the `connect()` override entirely.

### 3. `Promise.race` in guestMiddleware leaves orphaned Promises
Using `Promise.race([dbOp, timeout])` lets the timeout win but the DB op keeps running
in the background. When it eventually throws, it becomes an unhandled rejection → crash.

**Fix**: Use true fire-and-forget: call `.catch(() => {})` without any await or race.

### 4. No unhandledRejection safety net
Any background fire-and-forget that throws kills the process in Node 20+.

**Fix**: Add `process.on("unhandledRejection", (reason) => logger.warn(...))` in `index.ts`.

### 5. Deployment health check probe hits `GET /` (not `/healthz`)
Replit's autoscale probe hits the root path. Route handlers run after middleware, but
guestMiddleware (even fire-and-forget) and the SPA fallback must execute first.

**Fix**: Register `app.get("/healthz", ...)` BEFORE `app.use(authMiddleware)` in `app.ts`.
In production the static SPA is built, so `GET /` serves `index.html` quickly via
`express.static` — no DB needed for the probe to succeed.

### 6. Profile GET returns 404 for new guests (race with fire-and-forget insert)
guestMiddleware fires the DB insert without awaiting; the profile SELECT may run
before the insert commits, returning 404 → app always shows Onboarding.

**Fix**: Profile GET route upserts the user row (`onConflictDoNothing`) before the SELECT.

## Pool Configuration
```typescript
new NeonPool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 8_000,  // fast-fail per attempt, rely on retry loop
  query_timeout: 15_000,           // prevents pool client starvation
} as any)
```
MAX_RETRIES = 7, BASE_DELAY_MS = 2_000 → worst-case ~98s for Neon to wake up.

## Startup Warmup
`pool.query("SELECT 1")` fires in background after `app.listen()`. Ensures Neon
endpoint is awake before the first user-facing request. Logged as "Database connection warmed up".

**Why:** Replit's helium local DB and Neon production DB both benefit; eliminates the cold-start
latency that hits the first real request otherwise.
