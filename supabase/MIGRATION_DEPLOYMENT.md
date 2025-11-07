# Migration Deployment Guide

## Story 1.1: Database Schema and Core Models

This guide explains how to deploy the PromptPal database schema migration to your Supabase project.

## Prerequisites

- Supabase project: `vfsjeanhkyivuukpoqeq`
- Access to Supabase Dashboard

## Deployment Options

### Option 1: Using Supabase CLI (Recommended)

1. **Get your personal access token:**
   - Go to: https://supabase.com/dashboard/account/tokens
   - Click "Generate new token"
   - Copy the token

2. **Set the token and link your project:**
   ```bash
   export SUPABASE_ACCESS_TOKEN=<your-token>
   supabase link --project-ref vfsjeanhkyivuukpoqeq
   ```

3. **Push the migration:**
   ```bash
   supabase db push
   ```

4. **Verify the migration:**
   ```bash
   supabase db diff
   ```
   Should show "No schema changes detected"

### Option 2: Using Supabase Dashboard SQL Editor

1. **Navigate to SQL Editor:**
   - Go to: https://supabase.com/dashboard/project/vfsjeanhkyivuukpoqeq/sql/new

2. **Copy and paste the migration SQL:**
   - Open: `supabase/migrations/20251108000921_create_promptpal_schema.sql`
   - Copy the entire contents
   - Paste into the SQL Editor

3. **Execute the migration:**
   - Click "Run" or press `Cmd+Enter` / `Ctrl+Enter`
   - Wait for execution to complete
   - Verify "Query executed successfully"

4. **Verify tables were created:**
   ```sql
   SELECT tablename
   FROM pg_tables
   WHERE schemaname = 'public'
   AND tablename IN (
     'folders', 'prompts', 'modules',
     'module_options', 'variables',
     'encrypted_api_keys', 'usage_tracking'
   );
   ```
   Should return 7 rows.

5. **Verify RLS is enabled:**
   ```sql
   SELECT tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public'
   AND tablename IN (
     'folders', 'prompts', 'modules',
     'module_options', 'variables',
     'encrypted_api_keys', 'usage_tracking'
   );
   ```
   All tables should have `rowsecurity = true`.

## Post-Deployment Verification

### 1. Test RLS Policies

```sql
-- Should return empty (anonymous users can't see anything)
SET request.jwt.claims TO '{"sub": "00000000-0000-0000-0000-000000000000"}';
SELECT * FROM prompts;

-- Should return only user's data
SET request.jwt.claims TO '{"sub": "your-user-id-here"}';
SELECT * FROM prompts;
```

### 2. Test Foreign Key Constraints

```sql
-- Should fail (invalid user_id)
INSERT INTO folders (user_id, name)
VALUES ('00000000-0000-0000-0000-000000000000', 'Test');

-- Should succeed (valid user_id from auth.users)
-- Replace with actual user ID from your database
INSERT INTO folders (user_id, name)
VALUES ('<your-user-id>', 'Test Folder');
```

### 3. Verify Indexes

```sql
SELECT
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN (
  'folders', 'prompts', 'modules',
  'module_options', 'variables',
  'encrypted_api_keys', 'usage_tracking'
)
ORDER BY tablename, indexname;
```

Should show 25+ indexes.

## Rollback Procedure

If you need to rollback the migration:

1. **Using Supabase Dashboard SQL Editor:**
   - Open: `supabase/migrations/20251108000921_create_promptpal_schema_rollback.sql`
   - Copy and paste into SQL Editor
   - Execute

2. **Using Supabase CLI:**
   ```bash
   supabase db reset
   ```

**⚠️ WARNING**: Rollback will delete all data in these tables!

## Troubleshooting

### Error: "relation already exists"

If you see this error, some tables may already exist. You can:

1. Check existing tables:
   ```sql
   \dt
   ```

2. Drop conflicting tables manually:
   ```sql
   DROP TABLE IF EXISTS <table_name> CASCADE;
   ```

3. Re-run the migration

### Error: "permission denied"

Make sure you're using the service role key or are logged in as the project owner.

### Error: RLS prevents data access

RLS policies require valid JWT claims. Test with a real authenticated user or temporarily disable RLS:

```sql
ALTER TABLE <table_name> DISABLE ROW LEVEL SECURITY;
```

**Note**: Re-enable after testing!

## Migration File Location

- **Forward migration**: `supabase/migrations/20251108000921_create_promptpal_schema.sql`
- **Rollback migration**: `supabase/migrations/20251108000921_create_promptpal_schema_rollback.sql`

## Support

If you encounter issues:
1. Check Supabase logs: https://supabase.com/dashboard/project/vfsjeanhkyivuukpoqeq/logs
2. Review the migration SQL file for syntax errors
3. Ensure your project has the latest Postgres version
