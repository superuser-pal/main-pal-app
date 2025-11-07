/**
 * API Key Encryption Utilities
 *
 * Provides AES-256-GCM encryption for user LLM provider API keys.
 * Encryption secret stored in Supabase Vault (production) or .env.local (development).
 *
 * @see docs/architecture.md - API Key Encryption Strategy section
 * @see INSTALL.md - Phase 3.1 for setup instructions
 */

import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // 128 bits
const AUTH_TAG_LENGTH = 16; // 128 bits
const KEY_LENGTH = 32; // 256 bits

/**
 * Get encryption key from environment or Supabase Vault
 *
 * Development: Reads from API_KEY_ENCRYPTION_SECRET environment variable
 * Production: Fetches from Supabase Vault using service role key
 *
 * @param version - Vault secret name (for key rotation support)
 * @returns 256-bit encryption key as Buffer
 * @throws Error if key not found or Vault access fails
 */
async function getEncryptionKey(version: string = 'api_key_encryption_secret'): Promise<Buffer> {
  // Development: use environment variable
  if (process.env.NODE_ENV === 'development') {
    const envKey = process.env.API_KEY_ENCRYPTION_SECRET;
    if (!envKey) {
      throw new Error(
        'API_KEY_ENCRYPTION_SECRET not set in environment. ' +
        'Generate with: openssl rand -hex 32'
      );
    }

    const keyBuffer = Buffer.from(envKey, 'hex');
    if (keyBuffer.length !== KEY_LENGTH) {
      throw new Error(
        `Invalid key length: expected ${KEY_LENGTH} bytes, got ${keyBuffer.length} bytes. ` +
        'Generate new key with: openssl rand -hex 32'
      );
    }

    return keyBuffer;
  }

  // Production: fetch from Supabase Vault
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY! // Service role key required
  );

  const { data, error } = await supabase
    .from('vault.decrypted_secrets')
    .select('decrypted_secret')
    .eq('name', version)
    .single();

  if (error) {
    throw new Error(`Failed to retrieve encryption key from Vault: ${error.message}`);
  }

  if (!data?.decrypted_secret) {
    throw new Error(`Encryption key "${version}" not found in Vault`);
  }

  const keyBuffer = Buffer.from(data.decrypted_secret, 'hex');
  if (keyBuffer.length !== KEY_LENGTH) {
    throw new Error(
      `Invalid key length in Vault: expected ${KEY_LENGTH} bytes, got ${keyBuffer.length} bytes`
    );
  }

  return keyBuffer;
}

/**
 * Encrypt API key using AES-256-GCM
 *
 * Returns base64-encoded ciphertext with format: [IV][AuthTag][Encrypted]
 * Each encryption uses a random IV for security.
 *
 * @param plaintext - API key in plain text (e.g., "sk-...")
 * @returns Base64-encoded ciphertext
 * @throws Error if encryption fails
 *
 * @example
 * const encrypted = await encryptApiKey('sk-test-1234567890');
 * // Returns: "abcd1234..." (base64 string)
 */
export async function encryptApiKey(plaintext: string): Promise<string> {
  if (!plaintext || typeof plaintext !== 'string') {
    throw new Error('Plaintext must be a non-empty string');
  }

  const key = await getEncryptionKey();

  // Generate random IV for this encryption (never reuse IVs!)
  const iv = crypto.randomBytes(IV_LENGTH);

  // Create cipher
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  // Encrypt plaintext
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final()
  ]);

  // Get authentication tag (GCM mode provides authenticity + confidentiality)
  const authTag = cipher.getAuthTag();

  // Combine: [IV][AuthTag][Encrypted]
  // This allows decryption with a single ciphertext string
  const combined = Buffer.concat([iv, authTag, encrypted]);

  // Return base64-encoded for storage in database
  return combined.toString('base64');
}

/**
 * Decrypt API key using AES-256-GCM
 *
 * Supports automatic key rotation by trying multiple key versions.
 * Tries newest version first, falls back to older versions if decryption fails.
 *
 * @param ciphertext - Base64-encoded ciphertext (from encryptApiKey)
 * @returns Decrypted API key in plain text
 * @throws Error if decryption fails with all key versions
 *
 * @example
 * const decrypted = await decryptApiKey('abcd1234...');
 * // Returns: "sk-test-1234567890"
 */
export async function decryptApiKey(ciphertext: string): Promise<string> {
  if (!ciphertext || typeof ciphertext !== 'string') {
    throw new Error('Ciphertext must be a non-empty string');
  }

  // Try current key first, then fall back to previous versions (for rotation)
  const versions = ['api_key_encryption_secret', 'api_key_encryption_secret_v2'];

  let lastError: Error | null = null;

  for (const version of versions) {
    try {
      const key = await getEncryptionKey(version);
      return await decryptWithKey(ciphertext, key);
    } catch (error) {
      lastError = error as Error;
      // Try next version
      if (version === versions[versions.length - 1]) {
        // Last version failed, throw error
        throw new Error(
          `Failed to decrypt with any key version. Last error: ${lastError.message}`
        );
      }
    }
  }

  // Should never reach here, but TypeScript needs this
  throw new Error('Failed to decrypt API key with any key version');
}

/**
 * Decrypt with specific key (internal helper)
 *
 * @param ciphertext - Base64-encoded ciphertext
 * @param key - 256-bit encryption key
 * @returns Decrypted plaintext
 * @throws Error if decryption or authentication fails
 */
async function decryptWithKey(ciphertext: string, key: Buffer): Promise<string> {
  // Decode base64
  const combined = Buffer.from(ciphertext, 'base64');

  // Validate minimum length: IV + AuthTag + at least 1 byte encrypted
  const minLength = IV_LENGTH + AUTH_TAG_LENGTH + 1;
  if (combined.length < minLength) {
    throw new Error(
      `Invalid ciphertext: too short (${combined.length} bytes, minimum ${minLength} bytes)`
    );
  }

  // Extract components: [IV][AuthTag][Encrypted]
  const iv = combined.subarray(0, IV_LENGTH);
  const authTag = combined.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const encrypted = combined.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

  // Create decipher
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  try {
    // Decrypt
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]);

    return decrypted.toString('utf8');
  } catch (error) {
    // Authentication tag verification failed or decryption error
    throw new Error(
      `Decryption failed (wrong key or tampered ciphertext): ${(error as Error).message}`
    );
  }
}

/**
 * Validate encryption key format
 *
 * Used for validating user-provided encryption keys during setup.
 *
 * @param hexKey - Hex-encoded key string
 * @returns True if valid 256-bit key, false otherwise
 *
 * @example
 * const isValid = validateEncryptionKeyFormat('abcd1234...'); // 64 hex chars
 */
export function validateEncryptionKeyFormat(hexKey: string): boolean {
  if (typeof hexKey !== 'string') {
    return false;
  }

  // Must be 64 hex characters (32 bytes = 256 bits)
  const hexPattern = /^[0-9a-fA-F]{64}$/;
  return hexPattern.test(hexKey);
}

/**
 * Generate new encryption key
 *
 * Utility function for generating new encryption keys during setup or rotation.
 *
 * @returns 256-bit encryption key as hex string
 *
 * @example
 * const newKey = generateEncryptionKey();
 * console.log(newKey); // "abcd1234..." (64 hex chars)
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString('hex');
}
