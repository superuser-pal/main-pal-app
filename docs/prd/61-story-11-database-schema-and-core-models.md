# 6.1 Story 1.1: Database Schema and Core Models

**As a** developer,
**I want** a robust database schema for prompts, modules, variables, and folders,
**so that** the application has a solid data foundation for all PromptPal features.

## Acceptance Criteria

1. Database tables created: `prompts`, `folders`, `modules`, `module_options`, `variables`
2. Foreign key relationships established with `auth.users` table
3. RLS policies enabled for multi-tenant isolation (user can only access their own data)
4. TypeScript types generated from schema (`supabase gen types typescript`)
5. Migration scripts tested on staging environment
6. Rollback scripts prepared for each migration

## Integration Verification

- **IV1**: Existing user authentication continues to work without modification
- **IV2**: Existing Stripe webhook handlers continue to function
- **IV3**: Database query performance remains within acceptable thresholds (<100ms for simple selects)

## Technical Notes

- Use UUID primary keys for all tables
- Add indexes on `user_id`, `created_at`, `updated_at` columns
- Include soft delete support (`deleted_at` timestamp nullable)
- Implement created_by/updated_by audit columns

---
