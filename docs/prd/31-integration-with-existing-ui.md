# 3.1 Integration with Existing UI

PromptPal UI will leverage the existing design system while introducing specialized prompt management interfaces:

- **Component Library**: Use shadcn/ui components (Button, Input, Textarea, Select, Dialog, Dropdown, Card, Badge, Tabs)
- **Layout System**: Integrate with existing MainLayout, Sidebar, and Breadcrumbs components
- **Theme System**: Support existing dark/light mode toggle via next-themes
- **Icon Library**: Utilize Lucide React icons for consistency
- **Responsive Patterns**: Follow existing mobile-first Tailwind breakpoint strategy
- **Form Validation**: Extend existing form patterns (used in LoginForm, SignupForm) for prompt and module forms

**New UI Patterns Required**:
1. **Drag-and-drop** module reordering (not currently in component library)
2. **Rich text editor** for module options with variable insertion
3. **Split-pane interface** for prompt builder with live preview
4. **Tree view** for folder navigation
5. **Variable highlighting** in preview pane
