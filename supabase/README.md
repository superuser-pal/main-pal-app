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

---

## Supabase Vault Setup (Production)

**Purpose:** Securely store `API_KEY_ENCRYPTION_SECRET` for production environments using Supabase Vault instead of environment variables.

### Why Supabase Vault?

- **Encrypted at Rest**: Vault secrets automatically encrypted by Supabase backend
- **Access Control**: Controlled via Supabase RLS and service role key
- **Audit Trail**: All Vault access logged in Supabase logs
- **No New Infrastructure**: Leverages existing Supabase deployment
- **Cost**: No additional charge for Vault usage

### Initial Setup

1. **Enable Vault Extension** (via Supabase Dashboard or SQL):
   ```bash
   # Option 1: Via Supabase Dashboard
   # Go to: Dashboard → Database → Extensions
   # Search for "vault" and click "Enable"

   # Option 2: Via SQL Editor
   supabase link --project-ref <prod-project-ref>
   ```

2. **Create Vault Setup Migration:**
   ```bash
   supabase migration new setup_vault_encryption_secret
   ```

3. **Migration Content** (`supabase/migrations/YYYYMMDDHHMMSS_setup_vault_encryption_secret.sql`):
   ```sql
   -- Enable Vault extension for encrypted secret storage
   CREATE EXTENSION IF NOT EXISTS vault;

   -- Disable statement logging to prevent secret exposure in Supabase logs
   -- IMPORTANT: This must be done to prevent secrets from appearing in logs
   ALTER SYSTEM SET log_statement = 'none';

   -- Note: Manual step required after deployment
   -- Run the following in Supabase Dashboard SQL Editor (not in migration):
   --
   -- SELECT vault.create_secret(
   --   'api_key_encryption_secret',
   --   '<your-generated-hex-from-openssl-rand-32>'
   -- );
   --
   -- Reason: Secrets should never be committed to git, even in migrations
   ```

4. **Store Secret Manually** (after migration runs):
   ```sql
   -- Generate secret locally first:
   -- $ openssl rand -hex 32

   -- Then run in Supabase Dashboard SQL Editor:
   SELECT vault.create_secret(
     'api_key_encryption_secret',
     'your-hex-encoded-key-here'
   );

   -- Verify secret stored (shows encrypted value only)
   SELECT id, name, created_at FROM vault.secrets
   WHERE name = 'api_key_encryption_secret';
   ```

### Accessing Vault Secrets in Code

**Server-side access** (API routes, serverless functions):

```typescript
// src/lib/encryption.ts or any API route
import { createClient } from '@supabase/supabase-js';

// Create client with SERVICE ROLE key (required for Vault access)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!  // Service role key, NOT publishable key
);

// Fetch decrypted secret from Vault
const { data, error } = await supabase
  .from('vault.decrypted_secrets')  // Special Vault view
  .select('decrypted_secret')
  .eq('name', 'api_key_encryption_secret')
  .single();

if (error) {
  throw new Error(`Failed to retrieve encryption key: ${error.message}`);
}

// Use the decrypted secret
const encryptionKey = Buffer.from(data.decrypted_secret, 'hex');
```

**Development vs Production:**

```typescript
async function getEncryptionKey(): Promise<Buffer> {
  // Development: use environment variable
  if (process.env.NODE_ENV === 'development') {
    const envKey = process.env.API_KEY_ENCRYPTION_SECRET;
    if (!envKey) {
      throw new Error('API_KEY_ENCRYPTION_SECRET not set in .env.local');
    }
    return Buffer.from(envKey, 'hex');
  }

  // Production: fetch from Supabase Vault
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );

  const { data, error } = await supabase
    .from('vault.decrypted_secrets')
    .select('decrypted_secret')
    .eq('name', 'api_key_encryption_secret')
    .single();

  if (error) {
    throw new Error(`Vault access failed: ${error.message}`);
  }

  return Buffer.from(data.decrypted_secret, 'hex');
}
```

### Security Best Practices

**DO:**
- ✅ Store encryption secret in Vault for staging/production
- ✅ Disable statement logging (`log_statement = 'none'`) before creating secrets
- ✅ Use service role key (not publishable key) to access Vault
- ✅ Back up encryption secret to team password manager
- ✅ Rotate secrets annually or on security incident
- ✅ Limit Supabase Dashboard admin access to trusted team members

**DON'T:**
- ❌ Commit Vault secrets to git (even in migrations)
- ❌ Use publishable key to access Vault (will fail)
- ❌ Store production secrets in Vercel environment variables
- ❌ Share encryption secret via insecure channels (Slack, email)
- ❌ Skip statement logging disable (secrets will appear in logs)

### Key Rotation with Vault

When rotating encryption keys:

1. **Generate new key:**
   ```bash
   openssl rand -hex 32
   ```

2. **Store versioned secret:**
   ```sql
   SELECT vault.create_secret(
     'api_key_encryption_secret_v2',
     'new-hex-key'
   );
   ```

3. **Update code to support both versions** (graceful migration):
   ```typescript
   async function decryptApiKey(ciphertext: string): Promise<string> {
     // Try v2 first, fall back to v1
     for (const version of ['api_key_encryption_secret_v2', 'api_key_encryption_secret']) {
       try {
         const key = await getEncryptionKey(version);
         return await decryptWithKey(ciphertext, key);
       } catch (error) {
         // Try next version
       }
     }
     throw new Error('Decryption failed with all key versions');
   }
   ```

4. **Re-encrypt all API keys** (background job)

5. **Remove old secret after transition:**
   ```sql
   SELECT vault.delete_secret('api_key_encryption_secret');
   ```

### Troubleshooting

**Error: "permission denied for view decrypted_secrets"**
- Solution: Use service role key (`SUPABASE_SECRET_KEY`), not publishable key

**Error: "relation 'vault.decrypted_secrets' does not exist"**
- Solution: Enable Vault extension via Dashboard or migration

**Secret appears in Supabase logs:**
- Solution: Run `ALTER SYSTEM SET log_statement = 'none'` before creating secrets

**Lost encryption secret:**
- Solution: Retrieve from team password manager backup (requires 2 admins)

### References

- [Supabase Vault Documentation](https://supabase.com/docs/guides/database/vault)
- [pgsodium Extension](https://github.com/michelp/pgsodium) (powers Vault)
- PromptPal Architecture Docs: `docs/architecture.md` (API Key Encryption Strategy section)

