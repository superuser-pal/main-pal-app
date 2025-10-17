# Supabase Migrations

This directory contains database schema migrations for PromptPal.

## Migration Workflow

**Prerequisites:**
- Supabase CLI installed: `npm install -g supabase`
- Supabase project linked: `supabase link --project-ref <your-project-ref>`

**Creating a New Migration:**
```bash
supabase migration new <descriptive_name>
# Example: supabase migration new create_prompts_schema
```

**Applying Migrations Locally:**
```bash
supabase db reset  # Reset local DB and apply all migrations
```

**Pushing to Remote:**
```bash
supabase db push  # Push migrations to remote Supabase project
```

**Generating Types:**
```bash
supabase gen types typescript --local > src/types/database.ts
```

## Migration Naming Convention

Format: `YYYYMMDDHHMMSS_descriptive_name.sql`

Example:
- `20250115120000_create_prompts_schema.sql`
- `20250115130000_add_folders_table.sql`
- `20250115140000_add_rls_policies.sql`

## Schema Versioning Strategy

1. **Initial Schema**: Create base schema in single migration
2. **Incremental Changes**: One migration per logical change
3. **Rollback Support**: Include DOWN migrations where possible
4. **Type Generation**: Regenerate TypeScript types after each migration

## Testing Migrations

Before pushing to production:
1. Test locally: `supabase db reset`
2. Verify data integrity
3. Check RLS policies work as expected
4. Regenerate and verify TypeScript types

