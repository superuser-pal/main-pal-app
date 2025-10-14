# 6.8 Story 1.8: Library Search and Filtering

**As a** user,
**I want** to search across prompt names, descriptions, and content, and filter by folder,
**so that** I can quickly find prompts in large libraries.

## Acceptance Criteria

1. Search bar in library view supports full-text search
2. Search results match prompt names, descriptions, module names, option content, variable names
3. Search highlights matching terms in results
4. Users can filter by folder using sidebar or dropdown
5. Users can combine search and folder filter
6. Search results appear within 1 second

## Integration Verification

- **IV1**: Search uses database indexes for performance (no full table scans)
- **IV2**: Search handles special characters and Unicode correctly
- **IV3**: Search respects RLS policies (only returns user's prompts)

## Technical Notes

- Use PostgreSQL full-text search (`tsvector`, `tsquery`)
- Create GIN index on searchable columns
- Implement search result ranking by relevance

---
