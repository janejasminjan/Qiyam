import app from "./app";
import { logger } from "./lib/logger";
import { pool } from "@workspace/db";

// Prevent orphaned background promises (e.g. fire-and-forget DB ops) from
// crashing the process.  Log them so they're still visible in the output.
process.on("unhandledRejection", (reason) => {
  logger.warn({ reason }, "unhandledRejection — suppressed to keep server alive");
});

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  // Wake up the Neon database endpoint in the background so the first
  // user-facing request doesn't bear the cold-start latency.
  pool.query("SELECT 1")
    .then(() => logger.info("Database connection warmed up"))
    .catch((e: unknown) => logger.warn({ err: e }, "Database warmup failed (will retry on first query)"));
});
