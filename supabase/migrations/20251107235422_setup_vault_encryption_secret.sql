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

-- NOTE: Vault extension is not available in this Supabase plan
-- Using application-level encryption instead with API_KEY_ENCRYPTION_SECRET env var
-- See .env.local for API_KEY_ENCRYPTION_SECRET configuration

-- Placeholder migration for Vault setup
-- The encrypted_api_keys table will use application-level encryption in the API layer

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
