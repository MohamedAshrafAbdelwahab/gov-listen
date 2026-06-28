<template>
## Goal
Complete and polish the Gov-Listen AI civic reporting project — remove Lovable traces, publish to GitHub, deploy to Cloudflare Workers, fix microphone/transcription.

## Constraints & Preferences
- Project must not contain any Lovable references or code.
- Zero breakage — all modifications must keep existing functionality intact.
- Professional GitHub workflow (LICENSE, CI/CD, proper commit history).
- Deploy to Cloudflare Workers with live demo URL.

## Progress
### Done
- Removed all Lovable traces: AGENTS.md block, lovable-error-reporting.ts, LOVABLE_API_KEY fallbacks, @lovable.dev dependencies, bunfig.toml, bun.lock.
- Replaced @lovable.dev/vite-tanstack-config with manual Vite config.
- Created README.md, MIT License, GitHub repo, CI/CD workflow.
- Deployed to Cloudflare Workers at https://gov-listen.mohamedashraf.workers.dev/.
- Fixed worker name in wrangler.jsonc from `tanstack-start-ts` to `gov-listen`.
- **Root cause found**: 404 was from Gemini OpenAI-compatible endpoint (`v1beta/openai/audio/transcriptions`) — doesn't support audio transcription.
- **Simplified recording flow**: Removed server-side transcription entirely. Now uses browser `SpeechRecognition` API for real-time speech-to-text → text sent to `/api/extract` → Gemini chat.
- Deleted `src/routes/api/transcribe.ts`.
- Cleaned up unused `mediaRef`, `chunksRef` from `report.tsx`.
- Switched Gemini model from `gemini-3.5-flash` (doesn't exist → 503) to `gemini-2.0-flash`.
- Removed redundant `vite-tsconfig-paths` plugin (resolve.alias handles `@/` paths).
- Fixed package.json name from `tanstack_start_ts` to `gov-listen`.

### In Progress
- **(none)**

### Blocked
- **(none)**

## Key Decisions
- Chose Cloudflare Workers (SSR) over GitHub Pages.
- Removed server-side audio transcription — browser `SpeechRecognition` API sufficient for all target browsers (Chrome, Edge, Safari).
- Use `gemini-2.0-flash` via `@ai-sdk/openai-compatible` for chat-based extraction.

## Next Steps
1. **Deploy** — run `npm run deploy` to push changes to Cloudflare Workers.
2. **Verify** — test the full flow: mic → SpeechRecognition → text → `/api/extract` → Gemini → report.

## Critical Context
- Live demo: https://gov-listen.mohamedashraf.workers.dev/
- GitHub repo: https://github.com/MohamedAshrafAbdelwahab/gov-listen2
- Worker name: `gov-listen`
- **Flow**: `report.tsx` → `getUserMedia` → `SpeechRecognition` (browser) → transcribed text → `fetch("/api/extract")` → Gemini `generateText` via `@ai-sdk/openai-compatible`. No server-side audio.
- `SERVER_FN_BASE = "/_serverFn/"` — only `/_serverFn/...` goes through TanStack Start's RPC handler.
- GEMINI_API_KEY is sent via `Authorization: Bearer` for the OpenAI-compatible adapter.

## Relevant Files
- `src/routes/report.tsx`: client-side mic/recording — uses `SpeechRecognition` API, no server transcription
- `src/routes/api/extract.ts`: server handler for AI extraction via Gemini (`gemini-2.0-flash`)
- `src/lib/ai-gateway.server.ts`: OpenAI-compatible adapter for Gemini chat
- `vite.config.ts`: manual Vite config (no tsConfigPaths plugin)
- `wrangler.jsonc`: worker config — name `gov-listen`
- `.env.local`: local-only GEMINI_API_KEY (excluded from git)
- `.github/workflows/deploy.yml`: CI/CD workflow
</template>
