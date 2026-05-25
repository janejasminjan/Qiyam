import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { authMiddleware } from "./middlewares/authMiddleware";
import { guestMiddleware } from "./middlewares/guestMiddleware";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// credentials:true + origin:true is required for cookie-based auth through the Replit proxy
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth middleware: loads OIDC session into req.user if present
app.use(authMiddleware);
// Guest middleware: resolves/creates a guest user and sets req.resolvedUserId
app.use(guestMiddleware);

app.use("/api", router);

// Serve the built React frontend in production.
// The frontend is built to artifacts/quran-app/dist/public relative to the
// monorepo root; relative to this compiled file's __dirname that is two levels up.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticDir = path.resolve(__dirname, "..", "..", "quran-app", "dist", "public");
if (existsSync(staticDir)) {
  app.use(express.static(staticDir));
  // SPA fallback — let React Router handle all non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

export default app;
