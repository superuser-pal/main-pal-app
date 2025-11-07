-- PromptPal Core Schema Rollback Migration
-- Story 1.1: Database Schema and Core Models
-- Rollback script to cleanly remove all PromptPal tables, indexes, policies, and triggers

-- ============================================================================
-- ROLLBACK PROCEDURE
-- ============================================================================
-- To rollback this migration:
-- 1. Run this rollback script: psql -f 20251108000921_create_promptpal_schema_rollback.sql
-- 2. Verify tables are removed: \dt
-- 3. Verify no orphaned policies: SELECT * FROM pg_policies WHERE schemaname = 'public';
-- ============================================================================

-- Drop triggers first
DROP TRIGGER IF EXISTS update_folders_updated_at ON folders;
DROP TRIGGER IF EXISTS update_prompts_updated_at ON prompts;
DROP TRIGGER IF EXISTS update_modules_updated_at ON modules;
DROP TRIGGER IF EXISTS update_module_options_updated_at ON module_options;
DROP TRIGGER IF EXISTS update_variables_updated_at ON variables;

-- Drop trigger function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop tables in reverse dependency order (CASCADE will handle policies and indexes)
DROP TABLE IF EXISTS usage_tracking CASCADE;
DROP TABLE IF EXISTS encrypted_api_keys CASCADE;
DROP TABLE IF EXISTS variables CASCADE;
DROP TABLE IF EXISTS module_options CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS prompts CASCADE;
DROP TABLE IF EXISTS folders CASCADE;

-- Verify cleanup
DO $$
BEGIN
  RAISE NOTICE 'Rollback complete. All PromptPal tables, indexes, policies, and triggers removed.';
END $$;
