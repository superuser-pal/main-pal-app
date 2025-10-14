# 6.13 Story 1.13: Subscription Tier Feature Gating

**As a** product owner,
**I want** to enforce subscription tier limits on prompt count, folder count, and API usage,
**so that** the business model is sustainable and users are incentivized to upgrade.

## Acceptance Criteria

1. Free tier limits: 100 prompts, 10 folders, 10 API executions/day
2. Pro tier limits: 1000 prompts, 50 folders, 100 API executions/day
3. Enterprise tier limits: unlimited prompts/folders, 1000 API executions/day
4. Users see clear messaging when approaching limits (90% threshold)
5. Users cannot create prompts/folders beyond limits (error message with upgrade CTA)
6. API execution blocking prevents exceeding daily quota

## Integration Verification

- **IV1**: Feature gating uses existing `hasFeatureAccess()` utility from subscription system
- **IV2**: Limits are checked server-side (not just client-side validation)
- **IV3**: Stripe subscription webhooks update limits in real-time

## Technical Notes

- Store feature limits in `features` table (existing Stripe integration)
- Add feature keys: `max_prompts`, `max_folders`, `api_executions_per_day`
- Implement usage tracking in `usage_tracking` table

---
