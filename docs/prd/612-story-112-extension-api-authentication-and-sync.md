# 6.12 Story 1.12: Extension API - Authentication and Sync

**As a** browser extension developer,
**I want** authenticated API endpoints to fetch user's prompt library and sync updates,
**so that** the extension can provide in-context prompt execution.

## Acceptance Criteria

1. API endpoint `POST /api/extension/auth` issues JWT tokens for extension authentication
2. API endpoint `GET /api/extension/prompts` returns user's full prompt library with metadata
3. API endpoint `GET /api/extension/prompts/sync` returns incremental updates since timestamp
4. API endpoint `POST /api/extension/usage` tracks prompt execution from extension
5. All endpoints require valid JWT token in Authorization header
6. API responses are compressed for efficiency (gzip)

## Integration Verification

- **IV1**: Extension API uses existing JWT token infrastructure (Supabase Auth)
- **IV2**: Extension API rate limits prevent abuse (per-user limits)
- **IV3**: Extension API respects subscription tier access (sync frequency limits)

## Technical Notes

- Version API endpoints (`/api/v1/extension/...`) for future compatibility
- Implement OAuth flow for extension authorization (user consent)
- Document API in OpenAPI/Swagger format

---
