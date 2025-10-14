# 4.3 Code Organization and Standards

## File Structure Approach
```
src/app/
├── library/              # Prompt library view
├── prompts/
│   └── [id]/
│       ├── edit/         # Prompt builder
│       └── execute/      # Prompt executor
├── api/
│   ├── prompts/          # CRUD operations
│   ├── modules/          # Module management
│   ├── folders/          # Folder operations
│   └── llm/              # LLM provider integration
src/components/
├── prompts/              # Prompt-specific components
│   ├── PromptCard.tsx
│   ├── PromptBuilder.tsx
│   ├── ModuleEditor.tsx
│   ├── VariableForm.tsx
│   └── PromptPreview.tsx
├── folders/
│   └── FolderTree.tsx
src/lib/
├── prompts.ts            # Prompt utility functions
├── modules.ts            # Module utilities
├── variables.ts          # Variable substitution logic
└── llm-providers.ts      # LLM API client wrappers
src/types/
├── prompts.ts            # Prompt type definitions
├── modules.ts
└── variables.ts
supabase/migrations/      # Database migrations
```

## Naming Conventions
- **Components**: PascalCase (e.g., `PromptBuilder.tsx`)
- **Functions**: camelCase (e.g., `createPrompt()`)
- **Types/Interfaces**: PascalCase (e.g., `Prompt`, `ModuleOption`)
- **Database Tables**: snake_case (e.g., `prompts`, `module_options`)
- **API Routes**: kebab-case (e.g., `/api/prompts/by-folder`)

## Coding Standards
- Follow existing ESLint configuration
- Use Prettier for formatting (existing config)
- TypeScript strict mode enabled
- Prefer Server Components, use 'use client' only when necessary
- Avoid `any` types, define proper interfaces
- JSDoc comments for public APIs
- Error boundaries for client component trees

## Documentation Standards
- Update CLAUDE.md with new features and architecture decisions
- Inline comments for complex business logic
- README updates for new setup steps (LLM API keys)
- API documentation for extension developers
