# 6.6 Story 1.6: Variable System - Definition and Insertion

**As a** user,
**I want** to insert variables into module options using `{variable_name}` syntax and configure their properties,
**so that** I can create reusable prompt templates.

## Acceptance Criteria

1. Users can insert variables by typing `{variable_name}` or clicking "Insert Variable" button
2. Variable markers are highlighted in editor with distinct styling
3. Variable registry auto-populates from detected variables in all module options
4. Users can configure variable properties: type (text, number, date, select, multi-line), validation (required, min/max length, regex), default value, placeholder text
5. Variable configurations are saved to `variables` table
6. Variables reused across modules share single configuration

## Integration Verification

- **IV1**: Variable detection handles edge cases (escaped braces, nested braces)
- **IV2**: Variable configuration UI uses existing form components (shadcn/ui)
- **IV3**: Variable updates propagate to all instances across modules

## Technical Notes

- Use regex for variable detection: `/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g`
- Validate variable names (alphanumeric + underscore, must start with letter)
- Store variable config as JSONB in database for flexibility

---
