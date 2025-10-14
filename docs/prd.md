# PromptPal Web Application - Product Requirements Document

**Version**: 1.0
**Date**: 2025-10-14
**Status**: Draft
**Type**: Brownfield Enhancement PRD

---

## Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|--------|
| Initial PRD | 2025-10-14 | 1.0 | Converted from original feature requirements to BMAD format | PM Agent |

---

# 1. Intro Project Analysis and Context

## 1.1 Existing Project Overview

### Analysis Source
- **Analysis Type**: IDE-based fresh analysis + existing CLAUDE.md documentation
- **Project Context**: Building on Vibin Coders SaaS Accelerator (Next.js 15+ foundation)

### Current Project State

The existing project is a comprehensive **Next.js 15+ SaaS accelerator** with:

- **Core Infrastructure**: Complete authentication (Supabase), payments (Stripe), database (PostgreSQL via Supabase)
- **Tech Stack**: TypeScript, Next.js App Router, Tailwind CSS, shadcn/ui
- **Implemented Features**: Landing pages, user auth flows (login/signup/password reset), subscription management, protected routes, customer portal
- **Testing**: Playwright E2E testing infrastructure
- **Current Purpose**: Generic SaaS foundation ready for feature-specific implementation

**PromptPal Enhancement**: Transform this generic SaaS foundation into a specialized **prompt management platform** for AI/LLM power users who need to create, organize, and execute complex prompts with modules, variables, and team collaboration.

## 1.2 Documentation Analysis

### Available Documentation
- ✅ Tech Stack Documentation (CLAUDE.md)
- ✅ Source Tree/Architecture (CLAUDE.md - comprehensive)
- ✅ API Documentation (Supabase, Stripe integration docs)
- ✅ Coding Standards (partial - in CLAUDE.md)
- ⚠️ External API Documentation (requires PromptPal-specific API design)
- ❌ UX/UI Guidelines (needs design for prompt management interfaces)
- ✅ Technical Debt Documentation (noted in STRIPE.md)

**Assessment**: Existing documentation is strong for infrastructure. Need to develop PromptPal-specific architecture and UI/UX patterns.

## 1.3 Enhancement Scope Definition

### Enhancement Type
- ✅ **New Feature Addition** (Primary)
- ✅ **Major Feature Modification** (Convert generic SaaS to specialized prompt management)
- ✅ **Integration with New Systems** (LLM provider APIs: OpenAI, Anthropic, etc.)
- ⚠️ **UI/UX Overhaul** (New interfaces for prompt building, module management)

### Enhancement Description

Transform the existing SaaS accelerator into **PromptPal**, a sophisticated web application for managing AI prompts with:
- Advanced prompt builder with modular architecture (modules with multiple options)
- Variable system with validation and type support
- Folder-based organization with search and filtering
- Import/export capabilities (JSON, CSV)
- API integration for LLM providers (OpenAI, Anthropic, etc.)
- Extension API for browser extension sync
- Real-time collaboration features (future phase)

### Impact Assessment
- ✅ **Significant Impact** (substantial existing code changes)
  - Leverage existing auth, database, subscription systems
  - Add extensive new UI components for prompt management
  - New database schema for prompts, modules, variables, folders
  - New API routes for prompt operations and LLM provider integration
  - Maintain existing patterns for routing, styling, authentication

## 1.4 Goals and Background Context

### Goals
- Build a production-ready prompt management platform that empowers AI power users to create, organize, and execute complex prompts
- Provide modular prompt architecture allowing users to compose reusable prompt components
- Enable variable-driven prompt templates with validation and type safety
- Support multi-provider LLM execution (OpenAI, Anthropic, etc.) with API key management
- Deliver seamless browser extension integration for in-context prompt execution
- Establish foundation for team collaboration and prompt sharing (Phase 2)
- Maintain performance with large prompt libraries (1,000+ prompts per user)

### Background Context

The proliferation of AI assistants (ChatGPT, Claude, Gemini) has created demand for sophisticated prompt management tools. Power users struggle with:
- **Prompt sprawl**: Dozens/hundreds of prompts scattered across notes, files, extensions
- **Lack of reusability**: Can't easily compose prompts from reusable modules
- **No variable support**: Manual find-replace for variations
- **Poor organization**: No hierarchical structure or search
- **Vendor lock-in**: Prompts tied to specific platforms

PromptPal solves this by providing a **centralized, modular prompt management system** that works across providers. The existing SaaS accelerator provides ideal foundation:
- ✅ User authentication and session management (Supabase)
- ✅ Subscription tiers for usage limits (Stripe)
- ✅ Database infrastructure (PostgreSQL via Supabase)
- ✅ API infrastructure for extension sync
- ✅ Secure secrets management for API keys

---

# 2. Requirements

## 2.1 Functional Requirements

### FR1: Prompt CRUD Operations
Users shall be able to create, read, update, and delete prompts with name, description, folder assignment, and module composition.

### FR2: Modular Prompt Architecture
Prompts shall support a modular architecture where each prompt consists of multiple named modules (e.g., Context, Goal, Persona), and each module contains one or more options that can be selected during execution.

### FR3: Module Management
Users shall be able to add, rename, reorder, delete, and temporarily disable modules within a prompt, with changes reflected in real-time preview.

### FR4: Variable System
Users shall be able to define variables within prompt modules using `{variable_name}` syntax, with support for type definitions (text, number, date, select, multi-line), validation rules (required, min/max length, regex patterns), and default values.

### FR5: Folder Organization
Users shall organize prompts in a flat folder structure (no nesting), with ability to create, rename, delete folders, and move prompts between folders.

### FR6: Search and Discovery
Users shall search across prompt names, descriptions, module content, option content, and variable names with full-text search capabilities.

### FR7: Import/Export
Users shall export prompts to JSON format and import prompts from JSON or CSV files, with conflict resolution options (skip duplicates, overwrite existing) and validation for schema compatibility.

### FR8: API Key Management
Users shall securely store and manage API keys for multiple LLM providers (OpenAI, Anthropic), with ability to test validity, set nicknames, view last used dates, and revoke keys.

### FR9: Extension API
System shall provide authenticated API endpoints for browser extension to fetch user's prompt library, sync incremental updates, retrieve API keys securely, and track usage.

### FR10: Real-time Preview
Users shall see real-time preview of assembled prompt as they modify modules, options, variables, and module ordering.

### FR11: Subscription Tiers
System shall enforce subscription-based limits on prompt count, folder count, API calls per month, and storage using existing Stripe integration (Free: 100 prompts, Pro: 1000 prompts, Enterprise: unlimited).

### FR12: User Settings
Users shall manage profile (name, email, password), notification preferences, theme (light/dark), keyboard shortcuts, and API configurations through settings interface.

### FR13: Performance Targets
System shall support initial load <3 seconds, navigation <500ms, search results <1 second, auto-save <200ms, and handle libraries up to 10,000 prompts with pagination.

### FR14: Mobile Responsiveness
System shall provide responsive interfaces optimized for mobile (320px-768px), tablet (768px-1024px), and desktop (1024px+) with touch-friendly targets (44px minimum).

### FR15: Accessibility
System shall meet WCAG 2.1 Level AA standards with keyboard navigation, screen reader support, focus indicators, and appropriate color contrast ratios.

## 2.2 Non-Functional Requirements

### NFR1: Security
System shall encrypt API keys using AES-256, hash passwords using bcrypt, implement secure session management with JWT tokens, and protect against common vulnerabilities (XSS, CSRF, SQL injection).

### NFR2: Performance
System shall maintain sub-second response times for 95% of operations, support 100+ concurrent users per deployment, and implement progressive loading for large libraries (pagination at 50 items).

### NFR3: Scalability
Database schema shall support efficient querying at scale with appropriate indexes, foreign key constraints, and normalized structure for prompts, modules, variables, and folders.

### NFR4: Data Integrity
System shall implement transactional operations for prompt modifications, automatic save with optimistic UI updates, and conflict resolution for concurrent edits.

### NFR5: Error Handling
System shall provide user-friendly error messages, inline field validation, retry mechanisms for network failures, and graceful degradation during service outages.

### NFR6: Monitoring
System shall log critical operations, track API usage per user, monitor webhook delivery success rates, and alert on threshold breaches.

### NFR7: Testing Coverage
System shall maintain E2E test coverage for critical user flows (auth, prompt CRUD, module management, variable substitution) using Playwright infrastructure.

### NFR8: Documentation
Code shall follow existing TypeScript conventions, include JSDoc comments for public APIs, and maintain architecture documentation as system evolves.

## 2.3 Compatibility Requirements

### CR1: Existing Authentication System
PromptPal features must integrate seamlessly with existing Supabase authentication (JWT tokens, session management, protected routes middleware) without modification to auth flows.

### CR2: Existing Subscription System
Prompt library limits and feature access must utilize existing Stripe subscription tier system (Free/Pro/Enterprise) and `hasFeatureAccess()` utility functions without breaking current subscription management.

### CR3: Database Schema Compatibility
New database tables (prompts, modules, options, variables, folders) must follow existing naming conventions, use Supabase RLS policies for row-level security, and maintain foreign key relationships with users table.

### CR4: UI/UX Consistency
New prompt management interfaces must use existing shadcn/ui component library, follow established design tokens (colors, spacing, typography), support dark/light themes, and match existing navigation patterns.

### CR5: API Consistency
New API routes (/api/prompts/*, /api/folders/*, etc.) must follow existing patterns for authentication (middleware), error responses (JSON format), and rate limiting using NextJS App Router conventions.

### CR6: Testing Infrastructure
New features must integrate with existing Playwright test setup, use established test helpers pattern (auth-helpers.ts), and follow existing test organization structure.

---

# 3. User Interface Enhancement Goals

## 3.1 Integration with Existing UI

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

## 3.2 Modified/New Screens and Views

### New Primary Views

1. **Library View** (`/app/library/page.tsx`)
   - Left sidebar: Folder tree with counts
   - Main area: Grid/list of prompts with thumbnails, names, descriptions
   - Top bar: Search, filter, sort, view toggle (grid/list)
   - Action bar: New Prompt, New Folder, Import, Export

2. **Prompt Builder** (`/app/prompts/[id]/edit/page.tsx`)
   - Left panel: Module list with drag handles, add module button
   - Center panel: Selected module editor with options, variable insertion
   - Right panel: Live preview of assembled prompt with variable highlighting
   - Top bar: Prompt name, folder selector, save status, actions menu

3. **Prompt Executor** (`/app/prompts/[id]/execute/page.tsx`)
   - Top: Prompt name and description
   - Left: Module option selectors (dropdowns/radios)
   - Center: Variable input form with type-specific controls
   - Right: Assembled prompt preview
   - Bottom: Provider selector, model selector, Execute button

4. **Settings - API Keys** (`/app/settings/api-keys/page.tsx`)
   - Table of configured providers with nicknames, last used, status
   - Add Key dialog with provider selection, key input, nickname
   - Test connection button with status indicator
   - Revoke action with confirmation

### Modified Existing Views

5. **Dashboard** (`/app/dashboard/page.tsx`)
   - Add widgets: Recent prompts, prompt count, API usage chart, quick actions

6. **Subscriptions** (`/app/subscriptions/page.tsx`)
   - Extend feature comparison table to include prompt limits, API call limits

## 3.3 UI Consistency Requirements

### Design Token Usage
- Use existing CSS variables for colors (`--primary`, `--secondary`, `--accent`, `--muted`)
- Follow existing spacing scale (4px, 8px, 16px, 24px, 32px, 48px)
- Apply existing border radius tokens (`--radius`)
- Maintain existing font family and size scales

### Component Patterns
- All forms use existing validation patterns with inline errors
- All modals use shadcn/ui Dialog component
- All dropdowns use shadcn/ui DropdownMenu or Select
- All loading states use existing LoadingSpinner component
- All empty states follow existing pattern (centered icon + text + action button)

### Interaction Patterns
- Save operations show optimistic UI updates with toast notifications
- Destructive actions (delete) require confirmation dialogs
- Long operations show progress indicators
- Keyboard shortcuts follow existing patterns (Cmd/Ctrl + K for search)

### Accessibility Requirements
- All interactive elements have focus indicators
- All images/icons have alt text or aria-labels
- All forms have proper label associations
- Color-critical information has non-color alternatives
- All custom components pass axe accessibility testing

---

# 4. Technical Constraints and Integration Requirements

## 4.1 Existing Technology Stack

**Languages**: TypeScript 5.x (strict mode enabled)
**Frameworks**:
- Next.js 15+ (App Router, Server Components, Server Actions)
- React 18+ (Client Components for interactivity)

**Database**:
- Supabase (PostgreSQL 15+)
- Row Level Security (RLS) policies for multi-tenant isolation

**Authentication**:
- Supabase Auth (JWT tokens, HTTP-only cookies)
- OAuth providers: Google (configured)

**Infrastructure**:
- Vercel deployment (recommended)
- Supabase hosting for database and auth
- Stripe for payment processing

**External Dependencies**:
- Stripe SDK (subscription management)
- Supabase JS SDK (database and auth client)
- Tailwind CSS + shadcn/ui (UI components)
- Lucide React (icons)
- Playwright (E2E testing)

**Constraints**:
- Must support Node.js 18+ runtime
- Database migrations via Supabase CLI
- Environment variables required for all API keys
- Webhook endpoints must verify signatures

## 4.2 Integration Approach

### Database Integration Strategy
- **New Tables**: Create `prompts`, `modules`, `options`, `variables`, `folders` tables
- **Relationships**: Foreign keys to `auth.users` via `user_id` columns
- **RLS Policies**: Enable RLS on all tables, policies enforce `user_id = auth.uid()`
- **Migrations**: Use Supabase migration files (`supabase/migrations/YYYYMMDDHHMMSS_create_prompts.sql`)
- **Queries**: Use Supabase client with TypeScript types (`Database['public']['Tables']`)

### API Integration Strategy
- **Route Convention**: Place routes in `/app/api/prompts/`, `/app/api/folders/`, etc.
- **Authentication**: Use existing `requireAuth()` from `lib/auth/server.ts` in route handlers
- **Error Handling**: Return consistent JSON format `{ error: string, code?: string }`
- **Rate Limiting**: Leverage subscription tier checks before expensive operations
- **Validation**: Use Zod schemas for request body validation

### Frontend Integration Strategy
- **Layout**: Use existing `MainLayout` component with custom navigation config for Library/Builder sections
- **Forms**: Extend existing form patterns (controlled components, validation state, submit handlers)
- **State Management**: React Context for prompt builder state, Server Components for data fetching
- **Caching**: Leverage Next.js App Router caching, revalidate on mutations
- **Real-time**: Use Supabase real-time subscriptions for collaborative features (Phase 2)

### Testing Integration Strategy
- **Unit Tests**: Jest + React Testing Library for component tests (add to existing setup)
- **E2E Tests**: Playwright specs in `/tests/prompts/`, extend existing test helpers
- **Test Data**: Seed scripts for prompt fixtures, use existing Supabase test database
- **CI/CD**: Integrate with existing GitHub Actions workflow

## 4.3 Code Organization and Standards

### File Structure Approach
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

### Naming Conventions
- **Components**: PascalCase (e.g., `PromptBuilder.tsx`)
- **Functions**: camelCase (e.g., `createPrompt()`)
- **Types/Interfaces**: PascalCase (e.g., `Prompt`, `ModuleOption`)
- **Database Tables**: snake_case (e.g., `prompts`, `module_options`)
- **API Routes**: kebab-case (e.g., `/api/prompts/by-folder`)

### Coding Standards
- Follow existing ESLint configuration
- Use Prettier for formatting (existing config)
- TypeScript strict mode enabled
- Prefer Server Components, use 'use client' only when necessary
- Avoid `any` types, define proper interfaces
- JSDoc comments for public APIs
- Error boundaries for client component trees

### Documentation Standards
- Update CLAUDE.md with new features and architecture decisions
- Inline comments for complex business logic
- README updates for new setup steps (LLM API keys)
- API documentation for extension developers

## 4.4 Deployment and Operations

### Build Process Integration
- Leverage existing Next.js build pipeline
- Environment variable validation at build time
- Database migrations run via Supabase CLI before deployment
- Type generation from database schema (`supabase gen types typescript`)

### Deployment Strategy
- **Vercel**: Deploy via Git integration (main branch → production)
- **Staging**: Use Vercel preview deployments for feature branches
- **Database**: Supabase project per environment (dev, staging, prod)
- **Secrets**: Environment variables in Vercel dashboard

### Monitoring and Logging
- Existing Vercel analytics for performance monitoring
- Supabase dashboard for database metrics (connections, query performance)
- Stripe dashboard for webhook delivery monitoring
- Implement structured logging for LLM API calls (provider, model, tokens, latency)
- Error tracking via Vercel logs or Sentry integration (optional)

### Configuration Management
- Environment variables for all secrets and config
- `.env.local.example` updated with PromptPal variables:
  ```
  # Existing
  NEXT_PUBLIC_SUPABASE_URL=...
  SUPABASE_SECRET_KEY=...
  STRIPE_SECRET_KEY=...

  # New
  OPENAI_API_KEY=...              # For server-side LLM calls (optional)
  ANTHROPIC_API_KEY=...           # For server-side LLM calls (optional)
  MAX_PROMPTS_FREE=100
  MAX_PROMPTS_PRO=1000
  ```

## 4.5 Risk Assessment and Mitigation

### Technical Risks
1. **Database Performance**: Large prompt libraries may cause slow queries
   - **Mitigation**: Implement pagination, add indexes on `user_id` + `created_at`, use database query analysis

2. **Variable Substitution Complexity**: Regex-based variable replacement may have edge cases
   - **Mitigation**: Comprehensive unit tests, escape special characters, validation before save

3. **LLM API Rate Limits**: Provider rate limits may block user executions
   - **Mitigation**: Implement exponential backoff, queue system, surface errors clearly to users

### Integration Risks
1. **Auth Flow Disruption**: New protected routes may conflict with existing middleware
   - **Mitigation**: Test all existing auth flows after adding new routes, review middleware configuration

2. **Subscription Tier Enforcement**: Feature access checks may be inconsistent
   - **Mitigation**: Centralize checks in `hasFeatureAccess()` utility, comprehensive test coverage

### Deployment Risks
1. **Database Migration Failures**: Complex migrations may fail in production
   - **Mitigation**: Test migrations on staging with production-like data volume, implement rollback scripts

2. **Breaking Changes to Extension API**: API changes may break existing extensions
   - **Mitigation**: Version API endpoints (`/api/v1/prompts/`), maintain backwards compatibility for 1 major version

### Mitigation Strategies
- Comprehensive E2E testing before each release
- Feature flags for gradual rollout of risky features
- Database backups before migrations
- Monitoring dashboards for early detection of issues
- Incident response playbook for common failure modes

---

# 5. Epic and Story Structure

## 5.1 Epic Approach

**Epic Structure Decision**: Single comprehensive epic

**Rationale**: PromptPal features are tightly interconnected - prompt creation requires modules, modules require variables, execution requires API keys. Breaking into multiple epics would create artificial boundaries and integration challenges. A single epic with carefully sequenced stories allows incremental delivery while maintaining system coherence.

**Story Sequencing Strategy**:
1. **Foundation first**: Database schema, core models, basic CRUD
2. **UI building blocks**: Reusable components, library view
3. **Advanced features**: Module system, variables, preview
4. **Integration**: API keys, LLM provider integration
5. **Polish**: Search, import/export, performance optimization

Each story delivers standalone value while building toward complete system.

---

# 6. Epic 1: PromptPal Prompt Management Platform

**Epic Goal**: Transform the SaaS accelerator into a fully functional prompt management platform with modular prompt architecture, variable system, folder organization, and LLM provider integration, while maintaining all existing authentication and subscription capabilities.

**Integration Requirements**:
- Maintain backward compatibility with existing auth flows (login, signup, password reset)
- Leverage existing Stripe subscription tiers for feature gating
- Use existing UI component library and design system
- Follow established code organization patterns
- Integrate with existing testing infrastructure

---

## 6.1 Story 1.1: Database Schema and Core Models

**As a** developer,
**I want** a robust database schema for prompts, modules, variables, and folders,
**so that** the application has a solid data foundation for all PromptPal features.

### Acceptance Criteria

1. Database tables created: `prompts`, `folders`, `modules`, `module_options`, `variables`
2. Foreign key relationships established with `auth.users` table
3. RLS policies enabled for multi-tenant isolation (user can only access their own data)
4. TypeScript types generated from schema (`supabase gen types typescript`)
5. Migration scripts tested on staging environment
6. Rollback scripts prepared for each migration

### Integration Verification

- **IV1**: Existing user authentication continues to work without modification
- **IV2**: Existing Stripe webhook handlers continue to function
- **IV3**: Database query performance remains within acceptable thresholds (<100ms for simple selects)

### Technical Notes

- Use UUID primary keys for all tables
- Add indexes on `user_id`, `created_at`, `updated_at` columns
- Include soft delete support (`deleted_at` timestamp nullable)
- Implement created_by/updated_by audit columns

---

## 6.2 Story 1.2: Folder Management API and UI

**As a** user,
**I want** to create, rename, delete, and organize prompts into folders,
**so that** I can keep my prompt library organized as it grows.

### Acceptance Criteria

1. API routes implemented: `POST /api/folders`, `PATCH /api/folders/[id]`, `DELETE /api/folders/[id]`, `GET /api/folders`
2. Folder tree component displays user's folders with prompt counts
3. Users can create folders with unique names (validation prevents duplicates)
4. Users can rename folders (updates reflected immediately)
5. Delete folder requires confirmation, handles prompts (move or cascade delete)
6. Empty states guide users to create first folder

### Integration Verification

- **IV1**: Existing dashboard navigation continues to work
- **IV2**: Folder operations respect subscription tier limits (via `hasFeatureAccess()`)
- **IV3**: Folder data loads within performance budget (<500ms)

### Technical Notes

- Flat folder structure only (no nesting in MVP)
- Include default "Uncategorized" folder for orphaned prompts
- Implement optimistic UI updates with rollback on error

---

## 6.3 Story 1.3: Basic Prompt CRUD Operations

**As a** user,
**I want** to create, view, edit, and delete prompts with name, description, and folder assignment,
**so that** I can start building my prompt library.

### Acceptance Criteria

1. API routes implemented: `POST /api/prompts`, `GET /api/prompts/[id]`, `PATCH /api/prompts/[id]`, `DELETE /api/prompts/[id]`
2. Library view displays prompts in grid/list layout with names, descriptions, folder tags
3. Users can create minimal prompt (name + folder only)
4. Users can edit prompt name, description, folder assignment
5. Users can duplicate prompts (creates copy with "(copy)" suffix)
6. Delete prompt requires confirmation, invalidates any future share links (Phase 2 feature)

### Integration Verification

- **IV1**: Prompt count respects subscription tier limits (Free: 100, Pro: 1000, Enterprise: unlimited)
- **IV2**: Protected routes middleware correctly restricts access to `/library` and `/prompts/*`
- **IV3**: Prompt operations are audited (created_at, updated_at timestamps)

### Technical Notes

- Use Server Components for library view, Client Component for interactive cards
- Implement infinite scroll or pagination for large libraries
- Include search highlighting in prompt cards

---

## 6.4 Story 1.4: Prompt Builder - Module Management

**As a** user,
**I want** to add, reorder, rename, and delete modules within a prompt,
**so that** I can compose prompts from reusable structural components.

### Acceptance Criteria

1. Prompt builder UI displays module list with drag-and-drop reordering
2. Users can add modules using "Add Module" button with name input
3. Users can select from module templates (Context, Goal, Persona, Examples, Constraints, Output Format)
4. Users can rename modules inline
5. Users can delete modules with confirmation
6. Users can toggle module visibility (exclude from assembly temporarily)
7. Module order persists and affects assembled prompt output

### Integration Verification

- **IV1**: Module operations auto-save with optimistic UI updates
- **IV2**: Module data structure supports future extension (metadata fields)
- **IV3**: Drag-and-drop works on touch devices (tablet, mobile)

### Technical Notes

- Use `dnd-kit` or `react-beautiful-dnd` for drag-and-drop
- Store module order in `order_index` integer column
- Implement debounced auto-save (500ms delay)

---

## 6.5 Story 1.5: Module Options Editor

**As a** user,
**I want** to add multiple options to each module and edit option content,
**so that** I can create variations of each prompt component.

### Acceptance Criteria

1. Each module displays list of options with add/delete controls
2. Users can add options with "Add Option" button
3. Users can edit option content in rich text area (markdown support)
4. Users can set default option (pre-selected during execution)
5. Users can add option metadata (description, tags, use case notes)
6. Option changes reflect in real-time preview pane

### Integration Verification

- **IV1**: Option content supports multi-line text, special characters, Unicode
- **IV2**: Option storage is efficient (no unnecessary database writes)
- **IV3**: Option loading is optimized (lazy load for prompts with 50+ options)

### Technical Notes

- Use controlled textarea components with auto-resize
- Implement markdown preview toggle
- Store options in separate `module_options` table with foreign key to `modules`

---

## 6.6 Story 1.6: Variable System - Definition and Insertion

**As a** user,
**I want** to insert variables into module options using `{variable_name}` syntax and configure their properties,
**so that** I can create reusable prompt templates.

### Acceptance Criteria

1. Users can insert variables by typing `{variable_name}` or clicking "Insert Variable" button
2. Variable markers are highlighted in editor with distinct styling
3. Variable registry auto-populates from detected variables in all module options
4. Users can configure variable properties: type (text, number, date, select, multi-line), validation (required, min/max length, regex), default value, placeholder text
5. Variable configurations are saved to `variables` table
6. Variables reused across modules share single configuration

### Integration Verification

- **IV1**: Variable detection handles edge cases (escaped braces, nested braces)
- **IV2**: Variable configuration UI uses existing form components (shadcn/ui)
- **IV3**: Variable updates propagate to all instances across modules

### Technical Notes

- Use regex for variable detection: `/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g`
- Validate variable names (alphanumeric + underscore, must start with letter)
- Store variable config as JSONB in database for flexibility

---

## 6.7 Story 1.7: Real-time Prompt Preview

**As a** user,
**I want** to see a real-time preview of my assembled prompt with modules, options, and variables,
**so that** I can understand how my prompt will look before execution.

### Acceptance Criteria

1. Preview pane displays assembled prompt with selected options from each module
2. Variables are highlighted in preview with placeholders
3. Preview updates in real-time as user modifies modules, options, or variables
4. Users can test variable substitution by entering sample values
5. Preview shows module boundaries and names for clarity
6. Preview supports markdown rendering toggle

### Integration Verification

- **IV1**: Preview performance remains acceptable with 20+ modules (render <100ms)
- **IV2**: Preview scrolls independently from editor pane
- **IV3**: Preview preserves formatting (line breaks, indentation)

### Technical Notes

- Use debounced updates to avoid excessive re-renders
- Implement split-pane component with resizable divider
- Consider virtual scrolling for very long prompts

---

## 6.8 Story 1.8: Library Search and Filtering

**As a** user,
**I want** to search across prompt names, descriptions, and content, and filter by folder,
**so that** I can quickly find prompts in large libraries.

### Acceptance Criteria

1. Search bar in library view supports full-text search
2. Search results match prompt names, descriptions, module names, option content, variable names
3. Search highlights matching terms in results
4. Users can filter by folder using sidebar or dropdown
5. Users can combine search and folder filter
6. Search results appear within 1 second

### Integration Verification

- **IV1**: Search uses database indexes for performance (no full table scans)
- **IV2**: Search handles special characters and Unicode correctly
- **IV3**: Search respects RLS policies (only returns user's prompts)

### Technical Notes

- Use PostgreSQL full-text search (`tsvector`, `tsquery`)
- Create GIN index on searchable columns
- Implement search result ranking by relevance

---

## 6.9 Story 1.9: Import/Export Functionality

**As a** user,
**I want** to export my prompts to JSON and import prompts from JSON or CSV files,
**so that** I can backup, share, and migrate my prompt library.

### Acceptance Criteria

1. Users can export single prompt or entire library to JSON file
2. Export includes all prompt data (modules, options, variables, metadata)
3. Users can import prompts from JSON file with schema validation
4. Import detects conflicts (duplicate names) and offers resolution (skip, overwrite, rename)
5. Import validates data integrity and shows detailed error messages on failure
6. CSV import supports simple prompt format (name, description, content)

### Integration Verification

- **IV1**: Export file size is reasonable (compression if >1MB)
- **IV2**: Import respects subscription tier limits (prompt count)
- **IV3**: Import handles malformed files gracefully (no crashes)

### Technical Notes

- Use JSON schema validation (e.g., Zod)
- Implement streaming for large exports (avoid memory issues)
- Include export format version for future compatibility

---

## 6.10 Story 1.10: API Key Management

**As a** user,
**I want** to securely store and manage API keys for LLM providers (OpenAI, Anthropic),
**so that** I can execute prompts without exposing my keys.

### Acceptance Criteria

1. Settings page includes "API Keys" section with table of configured providers
2. Users can add API key with provider selection, key input, and nickname
3. System validates key format and tests connection before saving
4. Keys are encrypted using AES-256 before storage
5. Users can view last used date and revoke keys
6. Revoked keys are deleted from database (or marked inactive)

### Integration Verification

- **IV1**: API key storage uses existing encryption utilities or adds new secure implementation
- **IV2**: API keys are never exposed in client-side code or logs
- **IV3**: API key operations audit log entries (created, revoked)

### Technical Notes

- Use environment variable for encryption key (`API_KEY_ENCRYPTION_SECRET`)
- Store encrypted keys in `encrypted_api_keys` table
- Implement key rotation strategy for long-term security

---

## 6.11 Story 1.11: Prompt Execution with LLM Providers

**As a** user,
**I want** to execute prompts with my configured LLM providers (OpenAI, Anthropic),
**so that** I can test prompts and get AI responses directly in the app.

### Acceptance Criteria

1. Prompt executor view displays module option selectors and variable input form
2. Users select options for each module (dropdowns or radio buttons)
3. Users fill in required variables with type-specific inputs (text, number, date picker, etc.)
4. Users select provider and model from configured API keys
5. Users click "Execute" button to send assembled prompt to LLM
6. Response displays in output pane with copy button and metadata (tokens, latency, cost estimate)

### Integration Verification

- **IV1**: LLM API calls are rate limited per subscription tier (Free: 10/day, Pro: 100/day, Enterprise: 1000/day)
- **IV2**: API errors are handled gracefully with user-friendly messages
- **IV3**: Execution history is logged for usage tracking

### Technical Notes

- Use API route (`POST /api/prompts/execute`) to proxy LLM requests (keep keys server-side)
- Implement timeout handling (30s default)
- Support streaming responses for real-time output (optional enhancement)

---

## 6.12 Story 1.12: Extension API - Authentication and Sync

**As a** browser extension developer,
**I want** authenticated API endpoints to fetch user's prompt library and sync updates,
**so that** the extension can provide in-context prompt execution.

### Acceptance Criteria

1. API endpoint `POST /api/extension/auth` issues JWT tokens for extension authentication
2. API endpoint `GET /api/extension/prompts` returns user's full prompt library with metadata
3. API endpoint `GET /api/extension/prompts/sync` returns incremental updates since timestamp
4. API endpoint `POST /api/extension/usage` tracks prompt execution from extension
5. All endpoints require valid JWT token in Authorization header
6. API responses are compressed for efficiency (gzip)

### Integration Verification

- **IV1**: Extension API uses existing JWT token infrastructure (Supabase Auth)
- **IV2**: Extension API rate limits prevent abuse (per-user limits)
- **IV3**: Extension API respects subscription tier access (sync frequency limits)

### Technical Notes

- Version API endpoints (`/api/v1/extension/...`) for future compatibility
- Implement OAuth flow for extension authorization (user consent)
- Document API in OpenAPI/Swagger format

---

## 6.13 Story 1.13: Subscription Tier Feature Gating

**As a** product owner,
**I want** to enforce subscription tier limits on prompt count, folder count, and API usage,
**so that** the business model is sustainable and users are incentivized to upgrade.

### Acceptance Criteria

1. Free tier limits: 100 prompts, 10 folders, 10 API executions/day
2. Pro tier limits: 1000 prompts, 50 folders, 100 API executions/day
3. Enterprise tier limits: unlimited prompts/folders, 1000 API executions/day
4. Users see clear messaging when approaching limits (90% threshold)
5. Users cannot create prompts/folders beyond limits (error message with upgrade CTA)
6. API execution blocking prevents exceeding daily quota

### Integration Verification

- **IV1**: Feature gating uses existing `hasFeatureAccess()` utility from subscription system
- **IV2**: Limits are checked server-side (not just client-side validation)
- **IV3**: Stripe subscription webhooks update limits in real-time

### Technical Notes

- Store feature limits in `features` table (existing Stripe integration)
- Add feature keys: `max_prompts`, `max_folders`, `api_executions_per_day`
- Implement usage tracking in `usage_tracking` table

---

## 6.14 Story 1.14: Performance Optimization and Caching

**As a** user with a large prompt library,
**I want** fast load times and smooth interactions,
**so that** the app remains performant even with 1000+ prompts.

### Acceptance Criteria

1. Library view loads within 3 seconds for 1000+ prompts
2. Prompt builder opens within 500ms
3. Search results appear within 1 second
4. Auto-save completes within 200ms
5. Pagination or infinite scroll prevents loading all prompts at once
6. Database queries use indexes for efficient retrieval

### Integration Verification

- **IV1**: Caching strategy does not interfere with Next.js App Router caching
- **IV2**: Performance metrics tracked in production (Vercel Analytics)
- **IV3**: Database query performance monitored (Supabase dashboard)

### Technical Notes

- Implement pagination (50 prompts per page)
- Add database indexes on frequently queried columns
- Use Next.js `unstable_cache` for expensive operations
- Implement lazy loading for prompt builder components

---

## 6.15 Story 1.15: Mobile-Responsive Prompt Management

**As a** mobile user,
**I want** to view, search, and edit prompts on my phone or tablet,
**so that** I can manage my prompt library on the go.

### Acceptance Criteria

1. Library view adapts to mobile screens (320px-768px) with single-column layout
2. Folder navigation collapses to hamburger menu on mobile
3. Prompt builder uses stacked layout (module editor above preview on mobile)
4. Touch targets are at least 44px for comfortable tapping
5. Forms and inputs are optimized for mobile keyboards
6. Drag-and-drop works with touch gestures

### Integration Verification

- **IV1**: Mobile responsiveness uses existing Tailwind breakpoints
- **IV2**: Navigation integrates with existing mobile menu component
- **IV3**: Performance on mobile networks is acceptable (3G test)

### Technical Notes

- Test on real devices (iOS Safari, Android Chrome)
- Use `@media (hover: hover)` to detect touch vs mouse
- Implement swipe gestures for common actions (delete, duplicate)

---

# 7. Out of Scope (Phase 2+)

The following features are explicitly **out of scope** for MVP but planned for future phases:

## Phase 2: Collaboration & Sharing
- Team workspaces with shared prompt libraries
- Real-time collaborative editing (multiple users editing same prompt)
- Prompt sharing via public links with permission controls
- Prompt marketplace for buying/selling prompt templates
- Comment threads on prompts for feedback
- Version history with rollback capabilities

## Phase 3: Advanced Features
- Prompt templates with guided wizards
- A/B testing framework for prompt variations
- Prompt analytics (usage stats, execution success rates)
- Batch execution across multiple prompts
- Scheduled prompt execution (cron-like)
- Custom webhook integrations
- Zapier/Make.com connectors

## Phase 4: Enterprise Features
- SSO integration (SAML, OIDC)
- Advanced audit logging and compliance reports
- Custom branding (white-label options)
- Dedicated support channels
- SLA guarantees
- On-premise deployment option

---

# 8. Success Metrics

## Product Metrics
- **User Activation**: 70% of signups create at least 1 prompt within 7 days
- **Engagement**: Active users execute 10+ prompts per month
- **Retention**: 60% monthly retention rate for Pro users
- **Library Growth**: Average library size of 20 prompts per active user

## Technical Metrics
- **Performance**: 95% of pages load within 3 seconds
- **Reliability**: 99.9% uptime for core functionality
- **Error Rate**: <0.1% of API requests result in 5xx errors
- **Test Coverage**: >80% coverage for critical paths

## Business Metrics
- **Conversion**: 15% of free users upgrade to Pro within 30 days
- **MRR Growth**: 20% month-over-month growth
- **Churn**: <5% monthly churn for paid users
- **NPS**: Net Promoter Score >50

---

# 9. Appendices

## A. Database Schema (Detailed)

```sql
-- Folders table
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, name)
);

-- Prompts table
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Modules table
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  order_index INTEGER NOT NULL,
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Module options table
CREATE TABLE module_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Variables table
CREATE TABLE variables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) DEFAULT 'text',
  config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(prompt_id, name)
);

-- Encrypted API keys table
CREATE TABLE encrypted_api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL,
  nickname VARCHAR(255),
  encrypted_key TEXT NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  revoked_at TIMESTAMP WITH TIME ZONE
);

-- Usage tracking table
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
  action VARCHAR(50) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## B. API Route Specifications

### Prompts API

- `GET /api/prompts` - List user's prompts (with pagination, filtering, search)
- `POST /api/prompts` - Create new prompt
- `GET /api/prompts/[id]` - Get prompt details with modules and variables
- `PATCH /api/prompts/[id]` - Update prompt metadata
- `DELETE /api/prompts/[id]` - Soft delete prompt
- `POST /api/prompts/[id]/duplicate` - Duplicate prompt

### Folders API

- `GET /api/folders` - List user's folders with prompt counts
- `POST /api/folders` - Create new folder
- `PATCH /api/folders/[id]` - Rename folder
- `DELETE /api/folders/[id]` - Delete folder (with cascade options)

### Modules API

- `POST /api/prompts/[promptId]/modules` - Add module to prompt
- `PATCH /api/modules/[id]` - Update module (name, order, visibility)
- `DELETE /api/modules/[id]` - Delete module
- `POST /api/modules/[id]/reorder` - Bulk reorder modules

### Variables API

- `GET /api/prompts/[promptId]/variables` - Get all variables for prompt
- `PATCH /api/variables/[id]` - Update variable configuration

### Execution API

- `POST /api/prompts/execute` - Execute prompt with LLM provider
- `GET /api/prompts/[id]/history` - Get execution history

### Extension API

- `POST /api/extension/auth` - Authenticate extension
- `GET /api/extension/prompts` - Get full library
- `GET /api/extension/prompts/sync` - Get incremental updates

## C. Environment Variables

```bash
# Existing (from SaaS accelerator)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=

# New (for PromptPal)
API_KEY_ENCRYPTION_SECRET=          # 32-byte hex string for AES-256
MAX_PROMPTS_FREE=100
MAX_PROMPTS_PRO=1000
MAX_FOLDERS_FREE=10
MAX_FOLDERS_PRO=50
API_EXECUTIONS_FREE=10
API_EXECUTIONS_PRO=100
API_EXECUTIONS_ENTERPRISE=1000
```

---

**End of PRD**

---

_This PRD was generated using BMAD methodology and converted from original feature requirements. Last updated: 2025-10-14_
