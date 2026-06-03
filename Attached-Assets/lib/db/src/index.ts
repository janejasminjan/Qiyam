import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// ---------------------------------------------------------------------------
// Neon serverless endpoints auto-suspend after inactivity.
//
// When suspended, Neon can respond in two ways depending on timing:
//   1. Immediate error: "The endpoint has been disabled."
//   2. Connection hang → pg-pool timeout: "timeout exceeded when trying to connect"
//
// We retry both flavors up to MAX_RETRIES times.  Removing the connect()
// override avoids a double-retry loop (Pool.query() already calls connect()
// internally — wrapping both creates O(n²) retry attempts).
// ---------------------------------------------------------------------------

const MAX_RETRIES = 7;
const BASE_DELAY_MS = 2_000;

function isRetryableError(err: unknown): boolean {
  const msg = (err as any)?.message ?? "";
  return (
    msg.includes("endpoint has been disabled") ||
    msg.includes("endpoint is disabled") ||
    msg.includes("Enable it using the API and retry") ||
    // Neon cold-start: TCP connection accepted but handshake hangs until
    // connectionTimeoutMillis fires.
    msg.includes("timeout exceeded when trying to connect")
  );
}

async function withRetry<T>(
  fn: () => Promise<T>,
  label: string,
): Promise<T> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (isRetryableError(err) && attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * attempt;
        console.warn(
          `[db] DB endpoint resuming (${label}), attempt ${attempt}/${MAX_RETRIES - 1} — retrying in ${delay}ms…`,
        );
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw err;
    }
  }
  throw new Error("[db] Max retries exceeded while waiting for DB endpoint.");
}

class NeonPool extends Pool {
  query(queryTextOrConfig: any, values?: any): any {
    return withRetry(
      () => (values !== undefined
        ? super.query(queryTextOrConfig, values)
        : super.query(queryTextOrConfig)) as Promise<any>,
      "query",
    );
  }
  // Note: do NOT override connect() — Pool.query() calls connect() internally,
  // so overriding both creates a double-retry loop.
}

export const pool = new NeonPool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30_000,
  // Short per-attempt timeout so the retry loop can kick in quickly.
  connectionTimeoutMillis: 8_000,
  // Client-side query timeout so no pool client is held indefinitely.
  query_timeout: 15_000,
} as any);

export const db = drizzle(pool, { schema });

export * from "./schema";
