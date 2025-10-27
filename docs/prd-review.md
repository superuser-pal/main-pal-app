# PRD Review – PromptPal Web Application

## Findings

- **High – Security model conflict**  
  FR9 states the extension can “retrieve API keys securely” (`docs/prd.md:135`), yet Story 1.11 keeps provider keys server-side and proxies LLM requests (`docs/prd.md:832-834`). Exposing raw keys to an extension removes that control surface. Align the extension spec with the proxy pattern (extension calls an execution endpoint that injects keys server-side) or document a hardened secret-sharing approach.

- **High – Data model drift**  
  Story 1.1 mandates soft deletes and `created_by`/`updated_by` audit columns for every table (`docs/prd.md:540-543`), but the appendix schema only has `deleted_at` on `folders` and `prompts`, omits it for `modules`, `module_options`, `variables`, and lacks audit columns entirely (`docs/prd.md:1034-1089`). Update the schema or adjust requirements so engineering has a single source of truth.

- **Medium – Performance target mismatch**  
  FR13 and Story 1.14 require auto-save to finish within 200 ms (`docs/prd.md:147-148`, `docs/prd.md:904-907`), while Story 1.4’s notes prescribe a 500 ms debounce (`docs/prd.md:629-631`). Harmonize the requirement or revise the UX so save budgets and debounce strategy align.

- **Medium – Auth stack responsibility**  
  NFR1 calls for hashing passwords with bcrypt (`docs/prd.md:158-160`), yet Supabase manages password hashing. If the algorithm can’t be changed, reframe the requirement to “verify Supabase hashing meets policy” or move it to an audit checklist to avoid misaligned ownership.

- **Medium – Gating/usage tracking clarity**  
  Subscription limits are per-day (`docs/prd.md:875-878`), but the `usage_tracking` table (`docs/prd.md:1082-1089`) just stores raw events. Specify aggregation rules (window, timezone, reset mechanics) so billing enforcement is deterministic.

- **Low – Extension auth flow ambiguity**  
  Story 1.12 mixes issuing JWTs via Supabase with an OAuth consent flow (`docs/prd.md:846-863`). Clarify whether the extension relies on existing Supabase sessions, a dedicated OAuth client, or both, to prevent mis-scoping the auth UX.

## Open Questions

- If the extension never sees raw API keys, what payload does it receive for executions, and does it call back to the server for fulfillment?
- Should soft deletions cascade (prompt → modules/options) or hard-delete children?
- How and when are daily usage counters reset (UTC midnight, user timezone, rolling 24 hours)?

## Suggested Next Steps

1. Reconcile API key handling and document the extension execution flow end-to-end.
2. Update the canonical schema—or the requirements—so audit/soft-delete expectations match.
3. Document the metering approach (jobs, cron, Supabase policies) that enforces daily execution caps.

