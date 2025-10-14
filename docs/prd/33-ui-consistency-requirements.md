# 3.3 UI Consistency Requirements

## Design Token Usage
- Use existing CSS variables for colors (`--primary`, `--secondary`, `--accent`, `--muted`)
- Follow existing spacing scale (4px, 8px, 16px, 24px, 32px, 48px)
- Apply existing border radius tokens (`--radius`)
- Maintain existing font family and size scales

## Component Patterns
- All forms use existing validation patterns with inline errors
- All modals use shadcn/ui Dialog component
- All dropdowns use shadcn/ui DropdownMenu or Select
- All loading states use existing LoadingSpinner component
- All empty states follow existing pattern (centered icon + text + action button)

## Interaction Patterns
- Save operations show optimistic UI updates with toast notifications
- Destructive actions (delete) require confirmation dialogs
- Long operations show progress indicators
- Keyboard shortcuts follow existing patterns (Cmd/Ctrl + K for search)

## Accessibility Requirements
- All interactive elements have focus indicators
- All images/icons have alt text or aria-labels
- All forms have proper label associations
- Color-critical information has non-color alternatives
- All custom components pass axe accessibility testing

---
