# 6.4 Story 1.4: Prompt Builder - Module Management

**As a** user,
**I want** to add, reorder, rename, and delete modules within a prompt,
**so that** I can compose prompts from reusable structural components.

## Acceptance Criteria

1. Prompt builder UI displays module list with drag-and-drop reordering
2. Users can add modules using "Add Module" button with name input
3. Users can select from module templates (Context, Goal, Persona, Examples, Constraints, Output Format)
4. Users can rename modules inline
5. Users can delete modules with confirmation
6. Users can toggle module visibility (exclude from assembly temporarily)
7. Module order persists and affects assembled prompt output

## Integration Verification

- **IV1**: Module operations auto-save with optimistic UI updates
- **IV2**: Module data structure supports future extension (metadata fields)
- **IV3**: Drag-and-drop works on touch devices (tablet, mobile)

## Technical Notes

- Use `dnd-kit` or `react-beautiful-dnd` for drag-and-drop
- Store module order in `order_index` integer column
- Implement debounced auto-save (500ms delay)

---
