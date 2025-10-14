# 6.7 Story 1.7: Real-time Prompt Preview

**As a** user,
**I want** to see a real-time preview of my assembled prompt with modules, options, and variables,
**so that** I can understand how my prompt will look before execution.

## Acceptance Criteria

1. Preview pane displays assembled prompt with selected options from each module
2. Variables are highlighted in preview with placeholders
3. Preview updates in real-time as user modifies modules, options, or variables
4. Users can test variable substitution by entering sample values
5. Preview shows module boundaries and names for clarity
6. Preview supports markdown rendering toggle

## Integration Verification

- **IV1**: Preview performance remains acceptable with 20+ modules (render <100ms)
- **IV2**: Preview scrolls independently from editor pane
- **IV3**: Preview preserves formatting (line breaks, indentation)

## Technical Notes

- Use debounced updates to avoid excessive re-renders
- Implement split-pane component with resizable divider
- Consider virtual scrolling for very long prompts

---
