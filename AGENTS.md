<template>
## Goal
Complete and polish the Gov-Listen AI civic reporting project — remove Lovable traces, publish to GitHub, deploy to Vercel, fix microphone/transcription.

## Constraints & Preferences
- Project must not contain any Lovable references or code.
- Zero breakage — all modifications must keep existing functionality intact.
- Professional GitHub workflow (LICENSE, CI/CD, proper commit history).
- Deploy to Vercel with live demo URL.

## Progress
### Done
- Removed all Lovable traces: AGENTS.md block, lovable-error-reporting.ts, LOVABLE_API_KEY fallbacks, @lovable.dev dependencies, bunfig.toml, bun.lock.
- Replaced @lovable.dev/vite-tanstack-config with manual Vite config.
- Created README.md, MIT License, GitHub repo, CI/CD workflow.
- Simplified recording flow: Removed server-side transcription entirely. Now uses browser `SpeechRecognition` API for real-time speech-to-text.
- Deleted `src/routes/api/transcribe.ts`.
- Switched from Gemini API to Cloudflare Workers AI REST API for text extraction.
- **Migrated from Cloudflare Workers to Vercel**: Removed `@cloudflare/vite-plugin`, `wrangler`, custom `server.ts`. Added `nitro()` plugin for Vercel deployment.
- Environment variables now accessed via `process.env` (Vercel) instead of `globalThis.__WORKER_ENV__` (Cloudflare Workers).
- Deleted unused files: `wrangler.jsonc`, `test-cf-api.js`, `src/server.ts`, `src/lib/env.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`.
- Build produces clean Nitro output in `.output/` with no size limits (was 3 MiB limit on Cloudflare free tier).

### In Progress
- **(none)**

### Blocked
- **(none)**

## Key Decisions
- Chose **Vercel** (via Nitro) over Cloudflare Workers — free tier has no bundle size limit (Cloudflare free tier: 3 MiB, project was exceeding it).
- Removed server-side audio transcription — browser `SpeechRecognition` API sufficient for all target browsers (Chrome, Edge, Safari).
- Use CF Workers AI REST API (`@cf/meta/llama-3.1-8b-instruct`) for chat-based extraction. Free 10K neurons/day.
- Vercel Hobby plan: free, 1M function invocations/month, 4 CPU-hrs/month.

## Next Steps
1. **Deploy** — Push to GitHub, import to Vercel, add env vars, click Deploy.
2. **Verify** — test the full flow: mic → SpeechRecognition → text → `/api/extract` → CF Workers AI → report.

## Critical Context
- **Vercel**: deploy via git push or `vercel --prod` CLI
- GitHub repo: https://github.com/MohamedAshrafAbdelwahab/gov-listen2
- **Flow**: `report.tsx` → `SpeechRecognition` (browser) → transcribed text → `fetch("/api/extract")` → CF Workers AI REST API. No server-side audio.
- CF AI API uses `process.env.CF_AI_ACCOUNT_ID` and `process.env.CF_AI_API_TOKEN`.
- Nitro preset: `node-server` (auto-detected by Vercel).

## Relevant Files
- `src/routes/report.tsx`: client-side mic/recording — uses `SpeechRecognition` API
- `src/routes/api/extract.ts`: server handler for AI extraction via CF Workers AI REST API
- `vite.config.ts`: Vite config with `nitro()` plugin for Vercel
- `package.json`: dependencies and scripts (no cloudflare/wrangler)
- `.env.local`: local-only CF_AI_ACCOUNT_ID and CF_AI_API_TOKEN (excluded from git)
- `.github/workflows/deploy.yml`: CI/CD workflow
</template>
