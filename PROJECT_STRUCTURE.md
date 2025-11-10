# PromptPal Project Structure

This document outlines the organization of the PromptPal codebase. The project is built on the SaaS Accelerator boilerplate foundation with PromptPal-specific features being added incrementally.

## Philosophy

**One Cohesive Project**: The SaaS Accelerator is the foundational boilerplate that provides authentication, subscriptions, and layout infrastructure. PromptPal builds on top of this foundation to create a specialized prompt management application. They are not separate—they are one unified project.

## Directory Structure

```
main-pal-app/
├── src/                           # Source code
│   ├── app/                       # Next.js App Router pages
│   │   ├── _dev/                  # 🔧 Development & demo pages (not in production routing)
│   │   │   ├── testnav/          # Navigation system test pages
│   │   │   └── sidebar-demo/     # Sidebar component demo
│   │   ├── api/                  # API routes
│   │   │   ├── plans/            # Subscription plans API
│   │   │   └── subscriptions/    # Stripe subscription management
│   │   ├── auth/                 # Authentication routes
│   │   │   └── callback/         # OAuth callback handler
│   │   ├── login/                # Login page
│   │   ├── signup/               # Signup page
│   │   ├── forgot-password/      # Password reset request
│   │   ├── reset-password/       # Password reset
│   │   ├── dashboard/            # Protected dashboard
│   │   ├── subscriptions/        # Subscription management UI
│   │   ├── contact/              # Contact page
│   │   └── [PromptPal pages TBD]
│   │
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── UserMenu.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── layout/               # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── navigation/           # Navigation-specific components
│   │   │   └── Breadcrumbs.tsx
│   │   ├── features/             # Feature-specific components
│   │   │   └── landing/          # Landing page sections
│   │   ├── common/               # Shared utility components
│   │   │   ├── theme-toggle.tsx
│   │   │   └── loading-spinner.tsx
│   │   ├── ui/                   # shadcn/ui components (auto-generated)
│   │   └── [PromptPal components TBD]
│   │       ├── prompts/          # Future: Prompt management
│   │       ├── folders/          # Future: Folder organization
│   │       └── modules/          # Future: Module management
│   │
│   ├── lib/                      # Utility functions and helpers
│   │   ├── auth/
│   │   │   └── server.ts         # Server-side auth utilities
│   │   ├── supabase/
│   │   │   ├── client.ts         # Browser Supabase client
│   │   │   └── server.ts         # Server Supabase client
│   │   ├── subscriptions.ts      # Subscription management
│   │   ├── utils.ts              # Shared utilities (cn helper)
│   │   ├── constants.ts          # App configuration
│   │   ├── types.ts              # Shared TypeScript types
│   │   ├── navigation-registry.ts
│   │   └── navigation-discovery.ts
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── auth.ts               # Authentication types
│   │   ├── subscription.ts       # Subscription/billing types
│   │   ├── stripe.ts             # Stripe helper functions
│   │   ├── navigation.ts         # Navigation config types
│   │   └── [PromptPal types TBD]
│   │       ├── prompts.ts        # Future: Prompt types
│   │       ├── modules.ts        # Future: Module types
│   │       └── variables.ts      # Future: Variable types
│   │
│   ├── contexts/                 # React Context providers
│   │   ├── AuthContext.tsx       # Authentication state
│   │   └── NavigationContext.tsx # Navigation state
│   │
│   ├── styles/                   # Global styles
│   │   └── globals.css
│   │
│   └── middleware.ts             # Route protection middleware
│
├── docs/                         # Documentation
│   ├── project/                  # 📋 Project planning documents
│   │   ├── brief.md
│   │   ├── promptpal-brief.md
│   │   ├── promptpal-mvp-webapp.md
│   │   └── design-roadmap-junior.md
│   ├── architecture/             # 🏗️ Architecture & requirements
│   │   ├── architecture.md       # Technical architecture
│   │   ├── architecture-review.md
│   │   ├── prd.md               # Complete Product Requirements
│   │   └── prd-review.md
│   ├── prd/                      # 📑 Sharded PRD sections (42 files)
│   │   ├── 1-executive-summary.md
│   │   ├── 61-story-11-database-schema-and-core-models.md
│   │   └── [39 more story files...]
│   └── qa/                       # 🧪 Quality assurance
│       ├── gates/                # QA gates
│       └── assessments/          # QA assessments
│
├── supabase/                     # Supabase configuration
│   ├── migrations/               # Database migrations
│   │   └── 20251107235422_setup_vault_encryption_secret.sql
│   ├── archive/                  # 🗄️ Archived/rollback scripts
│   │   └── 20251108000921_create_promptpal_schema_rollback.sql
│   ├── config.toml               # Supabase configuration
│   ├── README.md                 # Supabase setup guide
│   └── MIGRATION_DEPLOYMENT.md   # Migration deployment guide
│
├── tests/                        # Playwright E2E tests
│   ├── utils/                    # Test utilities
│   │   ├── auth-helpers.ts
│   │   ├── subscription-helpers.ts
│   │   └── api-helpers.ts
│   └── subscription/             # Subscription tests
│       ├── subscription-page-loads.spec.ts
│       └── authentication-integration.spec.ts
│
├── public/                       # Static assets
│   ├── fonts/
│   └── images/
│
└── [Root Configuration Files]
    ├── package.json              # Dependencies and scripts
    ├── tsconfig.json             # TypeScript configuration
    ├── next.config.ts            # Next.js configuration
    ├── tailwind.config.ts        # Tailwind CSS configuration
    ├── components.json           # shadcn/ui configuration
    ├── prettier.config.js        # Code formatting
    ├── eslint.config.mjs         # Linting rules
    ├── playwright.config.ts      # E2E testing configuration
    ├── .gitignore                # Git ignore rules
    ├── .env.local.example        # Environment variables template
    ├── README.md                 # Quick start guide
    ├── CLAUDE.md                 # AI assistant instructions
    ├── INSTALL.md                # Installation guide
    ├── STRIPE.md                 # Stripe integration guide
    └── PROJECT_STRUCTURE.md      # This file
```

## Key Conventions

### Development Pages (`_dev/`)
- **Purpose**: Demo and test pages for development
- **Routing**: Next.js ignores folders prefixed with `_`, so these won't create production routes
- **Access**: Navigate to `/_dev/testnav` or `/_dev/sidebar-demo` in development
- **Note**: Can be gitignored later if desired (see `.gitignore` comment)

### Documentation Organization
- **`docs/project/`**: Planning documents, briefs, and roadmaps
- **`docs/architecture/`**: Technical architecture and PRD
- **`docs/prd/`**: Sharded PRD sections (42 topic-based files)
- **`docs/qa/`**: Quality assurance gates and assessments

### Component Organization
Components are organized by function, not by "accelerator vs promptpal":
- **`components/auth/`**: All authentication-related components
- **`components/layout/`**: Layout and navigation components
- **`components/features/`**: Feature-specific components (landing, etc.)
- **`components/ui/`**: Reusable shadcn/ui components
- **Future**: PromptPal-specific components will be added as sibling directories

### API Routes
- **Current**: `/api/subscriptions/`, `/api/plans/`
- **Future**: `/api/prompts/`, `/api/modules/`, `/api/folders/`, `/api/llm/`

### Database Migrations
- **Location**: `supabase/migrations/`
- **Naming**: `YYYYMMDDHHMMSS_description.sql`
- **Archive**: Old/rollback scripts go in `supabase/archive/`

## Development Workflow

### Adding New Features

1. **Create feature branch**: `git checkout -b feature/story-X.X-description`
2. **Follow story sequence**: See `docs/architecture/prd.md` or `docs/prd/` for story order
3. **Add migrations**: Use `supabase migration new <name>` for database changes
4. **Add types**: Update TypeScript definitions in `src/types/`
5. **Add components**: Create in appropriate `src/components/` directory
6. **Add pages**: Create in `src/app/` directory
7. **Add tests**: Create in `tests/` directory following existing patterns
8. **Integration verification**: Test that existing features still work

### Working with Documentation

- **Start with**: `docs/architecture/prd.md` for complete context
- **Refer to**: `docs/prd/` shards for specific topics
- **Update**: `CLAUDE.md` when project structure changes significantly

### Testing

```bash
# Run E2E tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific test suite
npx playwright test tests/subscription/
```

### Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. See `INSTALL.md` for complete setup instructions
3. See `STRIPE.md` for Stripe integration setup

## Important Files

### Configuration Entry Points
- **`CLAUDE.md`**: Primary instructions for AI assistants
- **`README.md`**: Quick start guide for developers
- **`INSTALL.md`**: Detailed installation instructions
- **`docs/architecture/prd.md`**: Complete product requirements

### Code Entry Points
- **`src/app/layout.tsx`**: Root layout with providers
- **`src/app/page.tsx`**: Landing page
- **`src/middleware.ts`**: Route protection
- **`src/lib/constants.ts`**: App configuration

## Next Steps

As you implement PromptPal features (Stories 1.1-1.15), you'll add:
- Database migrations in `supabase/migrations/`
- API routes in `src/app/api/prompts/`, `modules/`, `folders/`, etc.
- Components in `src/components/prompts/`, `folders/`, `modules/`
- Types in `src/types/prompts.ts`, `modules.ts`, `variables.ts`
- Pages in `src/app/library/`, `prompts/`, etc.

The structure will evolve organically as features are built, maintaining clean separation of concerns while keeping everything as one unified PromptPal application.

---

**Last Updated**: 2025-11-10
**Branch**: feature/project-cleanup
