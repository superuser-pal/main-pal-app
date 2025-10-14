# 6.10 Story 1.10: API Key Management

**As a** user,
**I want** to securely store and manage API keys for LLM providers (OpenAI, Anthropic),
**so that** I can execute prompts without exposing my keys.

## Acceptance Criteria

1. Settings page includes "API Keys" section with table of configured providers
2. Users can add API key with provider selection, key input, and nickname
3. System validates key format and tests connection before saving
4. Keys are encrypted using AES-256 before storage
5. Users can view last used date and revoke keys
6. Revoked keys are deleted from database (or marked inactive)

## Integration Verification

- **IV1**: API key storage uses existing encryption utilities or adds new secure implementation
- **IV2**: API keys are never exposed in client-side code or logs
- **IV3**: API key operations audit log entries (created, revoked)

## Technical Notes

- Use environment variable for encryption key (`API_KEY_ENCRYPTION_SECRET`)
- Store encrypted keys in `encrypted_api_keys` table
- Implement key rotation strategy for long-term security

---
