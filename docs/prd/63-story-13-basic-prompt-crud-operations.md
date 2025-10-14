# 6.3 Story 1.3: Basic Prompt CRUD Operations

**As a** user,
**I want** to create, view, edit, and delete prompts with name, description, and folder assignment,
**so that** I can start building my prompt library.

## Acceptance Criteria

1. API routes implemented: `POST /api/prompts`, `GET /api/prompts/[id]`, `PATCH /api/prompts/[id]`, `DELETE /api/prompts/[id]`
2. Library view displays prompts in grid/list layout with names, descriptions, folder tags
3. Users can create minimal prompt (name + folder only)
4. Users can edit prompt name, description, folder assignment
5. Users can duplicate prompts (creates copy with "(copy)" suffix)
6. Delete prompt requires confirmation, invalidates any future share links (Phase 2 feature)

## Integration Verification

- **IV1**: Prompt count respects subscription tier limits (Free: 100, Pro: 1000, Enterprise: unlimited)
- **IV2**: Protected routes middleware correctly restricts access to `/library` and `/prompts/*`
- **IV3**: Prompt operations are audited (created_at, updated_at timestamps)

## Technical Notes

- Use Server Components for library view, Client Component for interactive cards
- Implement infinite scroll or pagination for large libraries
- Include search highlighting in prompt cards

---
