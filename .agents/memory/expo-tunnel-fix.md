---
name: Expo Go tunnel fix for Replit proxy 404
description: Replit's expo.pike.replit.dev proxy returns 404 for native Expo requests; --tunnel bypasses it.
---

## Rule
For Expo Go on Replit to work, use `expo start --tunnel` instead of relying on the `expo.pike.replit.dev` proxy.

**Why:** Replit's `expo.pike.replit.dev` proxy intercepts requests with `Accept: application/expo+json` header at the infrastructure level and returns HTTP 404 with empty body (`Content-Length: 0`). The container is never contacted for these requests. Regular HTTP requests are proxied normally (200 OK), but native Expo requests are handled by a Replit-internal service that returns 404 regardless of what runs on port 8081.

**How to apply:**
- "Start Frontend" workflow command: `cd Attached-Assets && EXPO_PUBLIC_DOMAIN=$REPLIT_DEV_DOMAIN EXPO_PUBLIC_REPL_ID=$REPL_ID pnpm --filter @workspace/mobile exec expo start --tunnel --port 19000`
- `@expo/ngrok` is already installed in the mobile package
- The tunnel produces an `exp://xxxx-anonymous-19000.exp.direct` URL — this is what Expo Go scans
- Metro can be on any available port when tunneling (19000 works; 18115 conflicts with the artifact workflow; 8081 conflicts with the mockup sandbox artifact)
- The `expo.pike.replit.dev` domain and the proxy are NOT needed in tunnel mode — remove `EXPO_PACKAGER_PROXY_URL` and `REACT_NATIVE_PACKAGER_HOSTNAME` from the command
- The mobile dev script in package.json was changed (removed CI=1, removed --clear, removed --web, removed --localhost)
