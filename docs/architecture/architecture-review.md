# PromptPal Architecture Review

**Document reviewed**: `docs/architecture.md` (v1.0 Draft)
**Reviewer**: Codex (GPT-5)
**Date**: 2025-??-??

## Findings
- docs/architecture.md:95-117 assumes adoption of npm workspaces with `packages/*`, but the current repository is a single Next.js app without workspace tooling (`package.json:5-15`), creating a structural mismatch without a migration plan.
- docs/architecture.md:1210-1226 references Jest, Supabase CLI, and Playwright scripts that aren’t defined today (`package.json:5-15,43-53`), so following the documented workflow will fail until the tooling or docs are aligned.
- docs/architecture.md:108-115 and 1184-1205 expect a committed `supabase/migrations` directory, yet none exists; the large schema spec in docs/architecture.md:924-1073 needs concrete generation/versioning steps to prevent schema drift.
- docs/architecture.md:1265-1272 adds `API_KEY_ENCRYPTION_SECRET` to `.env.local` but lacks guidance for production storage, rotation, or ownership, leaving the encryption story incomplete.
- docs/architecture.md:679-864 outlines browser-extension endpoints without specifying token issuance, refresh, or CORS strategy, leaving the extension security model underdefined.

## Open Questions
- Should the team actually migrate to a workspaces-based layout, or should the document be corrected to match the current single-app structure?
- Which secret-management mechanism (Supabase secrets, Vercel env groups, external KMS) should hold `API_KEY_ENCRYPTION_SECRET` in shared and production environments?

## Consistencies
- Retaining the Supabase + Stripe stack (`docs/architecture.md:25-41`) aligns with the existing dependency footprint (`package.json:31-38`).
- The TypeScript-first approach (`docs/architecture.md:26-37,189-194`) matches the current project setup and supports shared typing across the stack.
