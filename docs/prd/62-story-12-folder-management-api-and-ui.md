# 6.2 Story 1.2: Folder Management API and UI

**As a** user,
**I want** to create, rename, delete, and organize prompts into folders,
**so that** I can keep my prompt library organized as it grows.

## Acceptance Criteria

1. API routes implemented: `POST /api/folders`, `PATCH /api/folders/[id]`, `DELETE /api/folders/[id]`, `GET /api/folders`
2. Folder tree component displays user's folders with prompt counts
3. Users can create folders with unique names (validation prevents duplicates)
4. Users can rename folders (updates reflected immediately)
5. Delete folder requires confirmation, handles prompts (move or cascade delete)
6. Empty states guide users to create first folder

## Integration Verification

- **IV1**: Existing dashboard navigation continues to work
- **IV2**: Folder operations respect subscription tier limits (via `hasFeatureAccess()`)
- **IV3**: Folder data loads within performance budget (<500ms)

## Technical Notes

- Flat folder structure only (no nesting in MVP)
- Include default "Uncategorized" folder for orphaned prompts
- Implement optimistic UI updates with rollback on error

---
