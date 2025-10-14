# 6.15 Story 1.15: Mobile-Responsive Prompt Management

**As a** mobile user,
**I want** to view, search, and edit prompts on my phone or tablet,
**so that** I can manage my prompt library on the go.

## Acceptance Criteria

1. Library view adapts to mobile screens (320px-768px) with single-column layout
2. Folder navigation collapses to hamburger menu on mobile
3. Prompt builder uses stacked layout (module editor above preview on mobile)
4. Touch targets are at least 44px for comfortable tapping
5. Forms and inputs are optimized for mobile keyboards
6. Drag-and-drop works with touch gestures

## Integration Verification

- **IV1**: Mobile responsiveness uses existing Tailwind breakpoints
- **IV2**: Navigation integrates with existing mobile menu component
- **IV3**: Performance on mobile networks is acceptable (3G test)

## Technical Notes

- Test on real devices (iOS Safari, Android Chrome)
- Use `@media (hover: hover)` to detect touch vs mouse
- Implement swipe gestures for common actions (delete, duplicate)

---
