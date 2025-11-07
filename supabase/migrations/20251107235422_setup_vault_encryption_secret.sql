-- Setup Supabase Vault for API Key Encryption
--
-- This migration enables the Vault extension and configures it for storing
-- the API_KEY_ENCRYPTION_SECRET used to encrypt user LLM provider API keys.
--
-- IMPORTANT: After running this migration, you must manually create the
-- encryption secret in the Supabase Dashboard SQL Editor. See instructions below.
--
-- @see docs/architecture.md - API Key Encryption Strategy section
-- @see INSTALL.md - Phase 3.1 for complete setup instructions
-- @see supabase/README.md - Supabase Vault Setup section

-- Enable Vault extension for encrypted secret storage
-- The Vault extension uses pgsodium for encryption
CREATE EXTENSION IF NOT EXISTS vault;

-- Disable statement logging to prevent secrets from appearing in Supabase logs
-- CRITICAL: This must be done before storing any secrets
-- Note: This affects the entire database, not just Vault operations
ALTER SYSTEM SET log_statement = 'none';

-- Apply the logging configuration change
-- This reloads the PostgreSQL configuration
SELECT pg_reload_conf();

-- Create a comment to document the Vault setup
COMMENT ON EXTENSION vault IS
'Vault extension for encrypted secret storage. Used for API_KEY_ENCRYPTION_SECRET.';

-- ============================================================================
-- MANUAL STEP REQUIRED AFTER MIGRATION
-- ============================================================================
--
-- The encryption secret must be created manually in the Supabase Dashboard
-- SQL Editor to avoid committing secrets to git.
--
-- Steps:
--
-- 1. Generate encryption secret locally:
--    $ openssl rand -hex 32
--
-- 2. Go to Supabase Dashboard → SQL Editor
--
-- 3. Run the following SQL (replace with your generated key):
--    SELECT vault.create_secret(
--      'api_key_encryption_secret',
--      'paste-your-generated-hex-key-here'
--    );
--
-- 4. Verify secret was created (should show encrypted value):
--    SELECT id, name, created_at FROM vault.secrets
--    WHERE name = 'api_key_encryption_secret';
--
-- 5. Backup the encryption secret to your team password manager
--    (1Password, LastPass, etc.) with 2-admin access requirement
--
-- ============================================================================

-- Create a record in a comments table to remind about manual step
-- (This is optional, just for documentation purposes)
DO $$
BEGIN
  RAISE NOTICE 'Vault extension enabled successfully.';
  RAISE NOTICE 'IMPORTANT: You must manually create the encryption secret in Supabase Dashboard.';
  RAISE NOTICE 'See migration file comments or INSTALL.md Phase 3.1 for instructions.';
END $$;
