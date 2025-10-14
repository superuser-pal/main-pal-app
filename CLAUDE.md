# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PromptPal** is a sophisticated prompt management web application built on the Vibin Coders SaaS Accelerator foundation. PromptPal enables AI power users to create, organize, and execute complex prompts with a modular architecture, variable systems, and multi-provider LLM integration.

### Project Type
**Brownfield Enhancement** - Building specialized prompt management features on top of existing Next.js 15+ SaaS infrastructure.

**📚 Key Documentation**:
- **[docs/prd.md](docs/prd.md)**: Complete Product Requirements Document (BMAD format)
- **[docs/prd/](docs/prd/)**: Sharded PRD sections (42 files organized by topic)
- **[INSTALL.md](INSTALL.md)**: Installation guide with Supabase, Stripe, and all integrations
- **[STRIPE.md](STRIPE.md)**: Stripe integration setup guide
- **README.md**: Quick start guide and project overview

### Core Features (From PRD)
- **Modular Prompt Architecture**: Compose prompts from reusable modules with multiple options
- **Variable System**: Template variables with types, validation, and real-time substitution
- **Folder Organization**: Hierarchical organization with search and filtering
- **Multi-Provider LLM Integration**: OpenAI, Anthropic, and extensible provider support
- **Import/Export**: JSON/CSV import with conflict resolution
- **Extension API**: Browser extension sync for in-context prompt execution
- **Subscription Tiers**: Free (100 prompts), Pro (1000 prompts), Enterprise (unlimited)

## Technology Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Authentication**: Supabase Auth with JWT tokens
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Theming**: next-themes for dark/light mode support
- **Icons**: Lucide React
- **Package Manager**: npm

## Development Commands

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues automatically
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting
npm run type-check      # Run TypeScript type checking

# Testing
npx playwright test     # Run all Playwright tests
npx playwright test --ui    # Run tests in UI mode
npx playwright test --headed   # Run tests with browser visible
npx playwright test tests/subscription/  # Run specific test directory

# Stripe Integration (requires Stripe CLI: brew install stripe/stripe-cli/stripe)
stripe login            # Authenticate Stripe CLI
stripe listen --forward-to localhost:3000/api/subscriptions/webhook  # Forward webhooks to local dev
stripe trigger checkout.session.completed  # Test webhook events locally

# Utilities
npm run clean           # Clean build artifacts
```

## Project Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── plans/         # Get available subscription plans
│   │   └── subscriptions/
│   │       ├── checkout/  # Create Stripe checkout session
│   │       ├── portal/    # Create customer portal session
│   │       ├── current/   # Get current subscription
│   │       └── webhook/   # Handle Stripe webhooks
│   ├── auth/
│   │   └── callback/      # OAuth callback handler
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── forgot-password/   # Password reset request page
│   ├── reset-password/    # Password reset page
│   ├── dashboard/         # Protected dashboard page (requires auth)
│   ├── subscriptions/     # Subscription management page
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components (auto-generated)
│   ├── auth/              # Authentication components
│   │   ├── LoginForm.tsx         # Login form with validation
│   │   ├── SignupForm.tsx        # Signup form with validation
│   │   ├── ForgotPasswordForm.tsx  # Password reset request form
│   │   ├── ResetPasswordForm.tsx   # Password reset form
│   │   ├── UserMenu.tsx          # User dropdown menu in header
│   │   ├── ProtectedRoute.tsx    # Server-side route protection
│   │   └── ClientProtectedRoute.tsx  # Client-side route protection
│   ├── layout/            # Layout components
│   │   ├── header.tsx     # Site header with navigation
│   │   ├── footer.tsx     # Site footer
│   │   ├── navigation.tsx # Navigation menu
│   │   └── MainLayout.tsx # Main layout with sidebar and breadcrumbs
│   ├── navigation/        # Navigation-specific components
│   │   ├── Sidebar.tsx    # Collapsible sidebar navigation
│   │   └── Breadcrumbs.tsx  # Breadcrumb trail
│   ├── features/          # Feature-specific components
│   │   └── landing/       # Landing page sections
│   │       ├── hero-section.tsx
│   │       ├── features-section.tsx
│   │       └── pricing-preview.tsx
│   └── common/            # Shared utility components
│       ├── theme-toggle.tsx     # Dark/light mode toggle
│       ├── theme-provider.tsx   # Theme context provider
│       └── loading-spinner.tsx  # Loading indicator
├── contexts/
│   ├── AuthContext.tsx        # Authentication context provider
│   └── NavigationContext.tsx  # Navigation state management
├── lib/
│   ├── auth/
│   │   └── server.ts          # Server-side auth utilities
│   ├── supabase/
│   │   ├── client.ts          # Browser Supabase client
│   │   └── server.ts          # Server Supabase client
│   ├── subscriptions.ts       # Subscription management utilities
│   ├── utils.ts               # Utility functions (cn helper)
│   ├── constants.ts           # App configuration and constants
│   ├── types.ts               # Shared TypeScript interfaces
│   ├── navigation-registry.ts # Navigation configuration registry
│   └── navigation-discovery.ts  # Automatic navigation discovery
├── styles/
│   └── globals.css            # Additional custom styles
├── types/
│   ├── auth.ts                # Authentication type definitions
│   ├── subscription.ts        # Subscription/billing type definitions
│   ├── stripe.ts              # Stripe helper functions and types
│   └── navigation.ts          # Navigation configuration types
├── middleware.ts              # Route protection middleware
└── tests/                     # Playwright E2E tests
    ├── utils/
    │   ├── auth-helpers.ts          # Authentication test utilities
    │   ├── subscription-helpers.ts  # Subscription test utilities
    │   └── api-helpers.ts           # API request test utilities
    └── subscription/
        ├── subscription-page-loads.spec.ts
        └── authentication-integration.spec.ts
```

### Component Architecture

- **Layout Components**: Responsive header with navigation, footer with links, mobile-friendly design, main layout with sidebar and breadcrumbs
- **Authentication System**: Complete Supabase auth integration with login/signup forms, password reset flows, user menu, and route protection (server and client-side)
- **Subscription System**: Stripe checkout integration, customer portal access, feature-based access control
- **Navigation System**: Hierarchical navigation with collapsible sidebar, breadcrumb trails, and automatic page registration
- **Landing Sections**: Hero section, features showcase, pricing preview with 3-tier structure
- **UI Utilities**: Loading spinners, theme toggle, reusable shadcn/ui components
- **Type System**: Comprehensive TypeScript definitions for auth, subscriptions, navigation, and Stripe integration

### Styling System

- **Design Tokens**: Custom color palette with brand colors (blues/purples)
- **Dark Mode**: Automatic system detection with manual toggle
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Animation**: Custom animations for fade-in, slide-in effects
- **Component Variants**: shadcn/ui design system with consistent styling

## Configuration Files

- **tailwind.config.ts**: Extended with custom colors, animations, and brand tokens
- **prettier.config.js**: Code formatting with Tailwind class sorting
- **next.config.ts**: Production optimizations with security headers
- **components.json**: shadcn/ui configuration for consistent theming
- **middleware.ts**: Route protection and authentication middleware
- **.env.local.example**: Template for environment variables (includes Supabase config)

## Current Features

### Implemented
- Complete landing page with hero, features, and pricing sections
- Responsive navigation with mobile menu
- Dark/light mode theming
- **Full Supabase authentication system**
  - JWT token handling with secure cookies
  - Login/signup pages with form validation and error handling
  - Password reset and forgot password flows
  - Protected dashboard page
  - User menu with logout functionality
  - Route protection middleware
  - Server and client-side auth utilities
- **Complete Stripe subscription system**
  - Checkout session creation with Stripe Checkout
  - Subscription webhook handling (create, update, cancel, payment status)
  - Customer portal integration for plan management
  - Database synchronization between Stripe and Supabase
  - Feature-based access control
  - Three-tier pricing (Free, Pro, Enterprise)
- **Testing infrastructure**
  - Playwright end-to-end testing
  - Test helpers for authentication and subscriptions
  - Automated browser testing across multiple devices
- TypeScript type definitions for auth and subscriptions
- Component library setup with shadcn/ui
- Development workflow with linting and formatting

### PromptPal Features (In Development - See PRD)
**Phase 1 - MVP (15 Stories)**:
- Database schema for prompts, modules, variables, folders
- Folder management API and UI
- Prompt CRUD operations (create, read, update, delete, duplicate)
- Prompt builder with module management (add, reorder, delete, toggle)
- Module options editor with markdown support
- Variable system (definition, insertion, type configuration, validation)
- Real-time prompt preview with variable highlighting
- Library search and filtering (full-text search)
- Import/export functionality (JSON, CSV)
- API key management (encrypted storage for LLM providers)
- Prompt execution with LLM providers (OpenAI, Anthropic)
- Extension API for browser extension sync
- Subscription tier feature gating
- Performance optimization and caching
- Mobile-responsive prompt management

**Phase 2 - Collaboration** (Future):
- Team workspaces with shared prompt libraries
- Real-time collaborative editing
- Prompt sharing via public links
- Comment threads and version history

**Phase 3 - Advanced Features** (Future):
- Prompt templates with wizards
- A/B testing framework
- Prompt analytics and usage tracking
- Batch execution and scheduling

**Phase 4 - Enterprise** (Future):
- SSO integration
- Advanced audit logging
- Custom branding and white-label options

## Authentication System

### Architecture Overview
The authentication system uses Supabase Auth with JWT tokens and follows security best practices:

- **Client-side**: React Context (`AuthContext`) provides user state and auth methods
- **Server-side**: Utilities in `src/lib/auth/server.ts` for SSR and API routes
- **Route Protection**: Next.js middleware handles automatic redirects
- **Session Management**: Secure HTTP-only cookies with automatic refresh

### Environment Variables Required
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-secret-key
```

### Page Protection Methods

**Method 1: Automatic Folder Protection (Recommended)**
```typescript
// Pages in these folders are automatically protected:
src/app/dashboard/    // All dashboard pages require auth
src/app/settings/     // All settings pages require auth  
src/app/profile/      // All profile pages require auth
```
Configure protected folders in `src/middleware.ts`:
```typescript
const protectedRoutes = ['/dashboard', '/settings', '/profile']
```

**Method 2: Server Component Protection**
```typescript
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function MyPage() {
  return (
    <ProtectedRoute>
      <PageContent />
    </ProtectedRoute>
  )
}
```

**Method 3: Client Component Protection**
```typescript
import ClientProtectedRoute from '@/components/auth/ClientProtectedRoute'

export default function MyPage() {
  return (
    <ClientProtectedRoute>
      <InteractiveContent />
    </ClientProtectedRoute>
  )
}
```

**Method 4: Mixed Content (Public + Private)**
```typescript
import { useAuth } from '@/contexts/AuthContext'

export default function MixedPage() {
  const { user, loading } = useAuth()
  
  return (
    <div>
      <PublicContent />
      {user ? <PrivateContent /> : <SignInPrompt />}
    </div>
  )
}
```

### Authentication Hooks and Utilities

**Client-side Hook:**
```typescript
import { useAuth } from '@/contexts/AuthContext'

const { user, loading, error, signIn, signOut } = useAuth()
```

**Server-side Utilities:**
```typescript
import { getUser, requireAuth } from '@/lib/auth/server'

// Get current user (returns null if not authenticated)
const user = await getUser()

// Require authentication (redirects to login if not authenticated)
const user = await requireAuth()
```

## Stripe Subscription System

### Overview
The application includes a complete Stripe subscription integration with checkout, webhooks, and customer portal. The system synchronizes subscription data between Stripe and Supabase for reliable access control.

**📋 IMPORTANT**: For detailed setup instructions, see [STRIPE.md](STRIPE.md) and [INSTALL.md](INSTALL.md)

### Environment Variables Required
```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # From stripe listen or dashboard
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Schema

The subscription system uses four main tables:

**products**: Subscription plans (Free, Pro, Enterprise)
- `stripe_product_id`: Links to Stripe product
- `sort_order`: Display order for pricing page
- `active`: Whether plan is available for subscription

**prices**: Pricing for each product
- `stripe_price_id`: Links to Stripe price
- `amount`: Price in cents
- `interval_type`: Billing interval (month, year)

**features**: Feature limits and capabilities per product
- `feature_key`: Feature identifier (e.g., 'max_users', 'api_calls_per_month')
- `feature_value`: JSONB value (number for limits, boolean for flags)

**subscriptions**: User subscription records
- `stripe_subscription_id`: Links to Stripe subscription
- `stripe_customer_id`: Links to Stripe customer
- `status`: Subscription status (active, past_due, canceled, etc.)
- `current_period_start/end`: Billing period dates

### API Routes

**POST /api/subscriptions/checkout**
- Creates Stripe checkout session for subscription
- Validates price ID against database
- Creates or reuses Stripe customer
- Returns checkout session URL

**POST /api/subscriptions/portal**
- Creates Stripe customer portal session
- Allows users to manage subscriptions, update payment methods, view invoices
- Returns portal session URL

**POST /api/subscriptions/webhook**
- Handles Stripe webhook events
- Supported events:
  - `checkout.session.completed`: Creates subscription record
  - `customer.subscription.updated`: Updates subscription status and plan
  - `customer.subscription.deleted`: Marks subscription as canceled
  - `invoice.payment_succeeded`: Activates subscription
  - `invoice.payment_failed`: Marks subscription as past_due

**GET /api/subscriptions/current**
- Returns current user's subscription with plan details
- Includes features and limits

**GET /api/plans**
- Returns all available subscription plans
- Includes pricing and features for each tier

### Subscription Management Functions

Located in `src/lib/subscriptions.ts`:

```typescript
// Get user's subscription with full plan details
const subscriptionData = await getUserSubscription(userId)
// Returns: { subscription: UserSubscription | null, plan: Plan }

// Check if user has access to a specific feature
const hasAccess = await hasFeatureAccess(userId, 'advanced_analytics')
const hasLimit = await hasFeatureAccess(userId, 'api_calls_per_month', 10000)

// Check if user has any active subscription
const isActive = await hasActiveSubscription(userId)

// Get all available plans for pricing page
const plans = await getAvailablePlans()
```

### Webhook Flow

1. **User subscribes via Checkout**:
   - Frontend calls `/api/subscriptions/checkout` with price ID
   - API creates Stripe checkout session
   - User completes payment in Stripe Checkout
   - Stripe sends `checkout.session.completed` webhook
   - Webhook handler creates subscription record in database

2. **User switches plans via Portal**:
   - Frontend calls `/api/subscriptions/portal`
   - API creates customer portal session
   - User selects new plan in portal
   - Stripe sends `customer.subscription.updated` webhook
   - Webhook handler updates subscription and product_id

3. **Payment fails**:
   - Stripe sends `invoice.payment_failed` webhook
   - Webhook handler updates status to 'past_due'
   - Application can restrict access based on status

### Stripe Helper Utilities

Located in `src/types/stripe.ts`:

```typescript
// Handle Stripe API version compatibility
getSubscriptionPeriodStart(subscription)  // Works with old and new API
getSubscriptionPeriodEnd(subscription)    // Works with old and new API
getInvoiceSubscriptionId(invoice)         // Handles string or object format
```

### Feature Access Control

Features are stored in the `features` table and checked using `hasFeatureAccess`:

```typescript
// Boolean features
if (await hasFeatureAccess(userId, 'custom_branding')) {
  // Show branding options
}

// Numeric limits (-1 = unlimited)
const canCreate = await hasFeatureAccess(userId, 'max_users', currentCount + 1)

// Support levels
const plan = await getUserSubscription(userId)
if (plan.features.support_level === 'Dedicated') {
  // Provide dedicated support options
}
```

### Three-Tier Pricing Structure

**Free**: $0/month
- 1,000 users, 10,000 API calls/month, 1 GB storage
- Community support

**Pro**: $29/month
- 10,000 users, 100,000 API calls/month, 10 GB storage
- Email support, custom branding, advanced analytics

**Enterprise**: $99/month
- Unlimited users, API calls, and storage
- Dedicated support, SSO, all features

### Testing Subscriptions

Use Stripe test cards:
- Success: `4242424242424242`
- Decline: `4000000000000002`
- Requires authentication: `4000002500003155`

Use Stripe CLI to test webhooks locally:
```bash
stripe listen --forward-to localhost:3000/api/subscriptions/webhook
stripe trigger checkout.session.completed
```

### Production Checklist

1. Update environment variables with live Stripe keys
2. Configure production webhook endpoint in Stripe Dashboard
3. Enable Customer Portal in Stripe Dashboard
4. Add all products to Customer Portal catalog
5. Test plan switching in production environment
6. Set up monitoring for webhook failures

## Navigation System

### Overview
The project includes a comprehensive navigation system with hierarchical structure support, sidebar navigation, and breadcrumb trails. The navigation is designed to be flexible and configurable per page.

### Navigation Hierarchy Levels

The navigation system supports 4 levels of hierarchy:

1. **X Level (Header)**: Main navigation in the top header bar
2. **Y Level (Sidebar Primary)**: Main sections in the left sidebar (e.g., Analytics, Settings)  
3. **Z Level (Sidebar Secondary)**: Sub-sections nested under Y items (e.g., Reports, Users, Profile)
4. **W Level (Breadcrumb Only)**: Specific pages shown only in breadcrumbs

### Using the Navigation System

**Basic Page Setup:**
```typescript
'use client';

import { usePathname } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { NavigationConfig } from '@/types/navigation';

const navigationConfig: NavigationConfig = {
  title: 'Page Title',
  sidebar: {
    enabled: true,
    section: 'SectionName',
    icon: 'Home', // Icon from Lucide React
  },
  breadcrumb: {
    path: ['Parent', 'Current Page'],
  },
};

export default function MyPage() {
  const pathname = usePathname();

  return (
    <MainLayout config={navigationConfig} pathname={pathname}>
      {/* Your page content */}
    </MainLayout>
  );
}
```

**Available Icons:**
- Home, BarChart3, Settings, Users, FileText, User

**Navigation Context:**
```typescript
import { useNavigation } from '@/contexts/NavigationContext';

const { 
  sidebarSections,     // Current sidebar structure
  sidebarOpen,         // Sidebar open/closed state
  toggleSidebar,       // Toggle sidebar function
  registerPage         // Register page in navigation
} = useNavigation();
```

### Components

**MainLayout**: Primary layout wrapper that includes sidebar and breadcrumbs
**Sidebar**: Collapsible left navigation with hierarchical menu support  
**Breadcrumbs**: Dynamic breadcrumb trail based on navigation config

### Layout Spacing

The navigation layout uses balanced spacing:
- **Left margin**: 48px total (24px + 24px padding) when sidebar is open
- **Right margin**: 48px padding for visual balance
- **Sidebar widths**: 256px (open) / 64px (collapsed)
- **Breadcrumb border**: Contained within content padding for consistency

## Development Guidelines

### Adding New Components
1. Follow shadcn/ui patterns for consistency
2. Use TypeScript interfaces from `src/types/auth.ts` for auth-related components
3. Implement responsive design with Tailwind classes
4. Add proper ARIA attributes for accessibility

### Styling Conventions
- Use custom CSS variables for brand colors
- Follow mobile-first responsive design
- Implement smooth transitions and animations
- Maintain consistent spacing with Tailwind utilities

### Type Safety
- All components must be properly typed
- Use existing type definitions from `src/types/`
- Extend types in `src/lib/types.ts` for shared interfaces
- Maintain strict TypeScript configuration

## Testing Infrastructure

### Overview
The project uses Playwright for end-to-end testing with comprehensive test helpers for authentication and subscription flows.

### Test Structure

```
tests/
├── utils/
│   ├── auth-helpers.ts          # Authentication utilities for tests
│   ├── subscription-helpers.ts   # Subscription flow utilities
│   └── api-helpers.ts           # API request utilities
└── subscription/
    ├── subscription-page-loads.spec.ts        # Page rendering tests
    └── authentication-integration.spec.ts     # Auth flow tests
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in UI mode (recommended for development)
npx playwright test --ui

# Run tests with visible browser (headless off)
npx playwright test --headed

# Run specific test file
npx playwright test tests/subscription/authentication-integration.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium

# Generate test report
npx playwright show-report
```

### Test Helpers

**Authentication Helpers** (`tests/utils/auth-helpers.ts`):

```typescript
import { loginUser, logoutUser, setupAuthenticatedUser, TEST_USERS } from './utils/auth-helpers'

// Login as test user
await loginUser(page, TEST_USERS.free)

// Setup authenticated test context
await setupAuthenticatedUser(page, 'pro')

// Logout current user
await logoutUser(page)

// Check authentication state
const isAuth = await isUserAuthenticated(page)
```

**Test Users**:
- `TEST_USERS.free`: User without subscription
- `TEST_USERS.pro`: User with Pro subscription
- `TEST_USERS.enterprise`: User with Enterprise subscription
- `TEST_USERS.subscribed`: User with any active subscription

**Subscription Helpers** (`tests/utils/subscription-helpers.ts`):
- Helper functions for testing subscription flows
- Stripe checkout interactions
- Plan switching scenarios

**API Helpers** (`tests/utils/api-helpers.ts`):
- Utilities for testing API endpoints
- Request/response validation
- Error handling scenarios

### Playwright Configuration

Key settings in `playwright.config.ts`:
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Parallel execution**: Enabled for faster test runs
- **Retries**: 2 retries on CI, 0 locally
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Dev server**: Automatically starts before tests

### Writing New Tests

**Basic test structure**:

```typescript
import { test, expect } from '@playwright/test'
import { loginUser, TEST_USERS } from './utils/auth-helpers'

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Setup
    await loginUser(page, TEST_USERS.free)

    // Navigate to page
    await page.goto('/feature')

    // Test interaction
    await page.getByRole('button', { name: 'Action' }).click()

    // Assert result
    await expect(page.getByText('Success')).toBeVisible()
  })
})
```

**Best practices**:
- Use test helpers for common operations (login, logout, API calls)
- Use `getByRole` and `getByText` for resilient selectors
- Add `test.beforeEach` for common setup
- Use `test.afterEach` for cleanup
- Group related tests with `test.describe`
- Use descriptive test names that explain the expected behavior

### Testing Stripe Integration

When testing subscription flows:
1. Use Stripe test cards (4242424242424242)
2. Ensure webhook forwarding is active (`stripe listen`)
3. Test both successful and failed payment scenarios
4. Verify database synchronization after webhook events
5. Test plan switching through customer portal

## PromptPal Architecture

### New Directory Structure (Added to SaaS Accelerator)

```
src/app/
├── library/              # Prompt library view (NEW)
├── prompts/              # Prompt management (NEW)
│   └── [id]/
│       ├── edit/         # Prompt builder interface
│       └── execute/      # Prompt executor with LLM integration
├── api/
│   ├── prompts/          # Prompt CRUD operations (NEW)
│   ├── modules/          # Module management (NEW)
│   ├── folders/          # Folder operations (NEW)
│   └── llm/              # LLM provider integration (NEW)
src/components/
├── prompts/              # Prompt-specific components (NEW)
│   ├── PromptCard.tsx
│   ├── PromptBuilder.tsx
│   ├── ModuleEditor.tsx
│   ├── VariableForm.tsx
│   └── PromptPreview.tsx
├── folders/              # Folder management (NEW)
│   └── FolderTree.tsx
src/lib/
├── prompts.ts            # Prompt utility functions (NEW)
├── modules.ts            # Module utilities (NEW)
├── variables.ts          # Variable substitution logic (NEW)
└── llm-providers.ts      # LLM API client wrappers (NEW)
src/types/
├── prompts.ts            # Prompt type definitions (NEW)
├── modules.ts            # Module type definitions (NEW)
└── variables.ts          # Variable type definitions (NEW)
supabase/migrations/      # Database migrations for PromptPal schema (NEW)
```

### Database Schema (New Tables)

**Core Tables**:
- `prompts`: User prompts with name, description, folder assignment
- `folders`: Flat folder structure for organization
- `modules`: Prompt modules with ordering and visibility
- `module_options`: Module option content with metadata
- `variables`: Variable definitions with type and validation config
- `encrypted_api_keys`: Encrypted LLM provider API keys

**See**: [docs/prd/a-database-schema-detailed.md](docs/prd/a-database-schema-detailed.md) for complete schema

### API Routes (New Endpoints)

**Prompts**: `/api/prompts/*` - CRUD operations, duplication, execution
**Folders**: `/api/folders/*` - Folder management
**Modules**: `/api/modules/*` - Module and option management
**Variables**: `/api/variables/*` - Variable configuration
**LLM**: `/api/llm/*` - LLM provider integration
**Extension**: `/api/extension/*` - Browser extension sync API

**See**: [docs/prd/b-api-route-specifications.md](docs/prd/b-api-route-specifications.md) for complete API specs

### Subscription Tier Limits (PromptPal Specific)

Extends existing Stripe subscription system with PromptPal features:

**Free Tier**:
- 100 prompts maximum
- 10 folders maximum
- 10 API executions per day

**Pro Tier** ($29/month):
- 1,000 prompts maximum
- 50 folders maximum
- 100 API executions per day
- Advanced search and filtering
- Import/export functionality

**Enterprise Tier** ($99/month):
- Unlimited prompts
- Unlimited folders
- 1,000 API executions per day
- Priority support
- Extension API access
- Future: Team collaboration features

### Environment Variables (Added)

```bash
# New PromptPal Variables (add to .env.local)
API_KEY_ENCRYPTION_SECRET=          # 32-byte hex for AES-256 encryption
MAX_PROMPTS_FREE=100
MAX_PROMPTS_PRO=1000
MAX_FOLDERS_FREE=10
MAX_FOLDERS_PRO=50
API_EXECUTIONS_FREE=10
API_EXECUTIONS_PRO=100
API_EXECUTIONS_ENTERPRISE=1000

# Optional: Server-side LLM API keys (for demo/testing)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

**See**: [docs/prd/c-environment-variables.md](docs/prd/c-environment-variables.md) for complete list

## Development Workflow (PromptPal)

### Working with the PRD

1. **Read Full PRD**: Start with [docs/prd.md](docs/prd.md) for complete context
2. **Browse Shards**: Navigate [docs/prd/](docs/prd/) for specific sections
3. **Story Implementation**: Follow story sequence (1.1 → 1.15) in [docs/prd/index.md](docs/prd/index.md)
4. **Integration Verification**: Each story includes IV steps to verify existing features remain intact

### Story Sequencing Strategy

Stories are ordered to minimize brownfield integration risk:

1. **Foundation** (1.1-1.3): Database schema → Folders → Basic CRUD
2. **Core Features** (1.4-1.7): Modules → Options → Variables → Preview
3. **Discovery** (1.8-1.9): Search → Import/Export
4. **Integration** (1.10-1.12): API Keys → LLM Execution → Extension API
5. **Polish** (1.13-1.15): Feature Gates → Performance → Mobile

### Key Development Guidelines

**Database Migrations**:
- Use Supabase CLI: `supabase migration new <name>`
- Test migrations on staging before production
- Include rollback scripts for complex migrations

**Type Safety**:
- Generate types from Supabase schema: `supabase gen types typescript`
- Update type definitions in `src/types/prompts.ts`, `modules.ts`, `variables.ts`

**Testing**:
- E2E tests in `tests/prompts/` directory
- Follow existing Playwright patterns from `tests/subscription/`
- Use test helpers for authentication and setup

**Performance**:
- Implement pagination for large libraries (50 items/page)
- Use database indexes on `user_id`, `created_at`, search columns
- Lazy load prompt builder components

## Key Constants

Important configuration values are centralized in `src/lib/constants.ts`:
- App metadata and branding
- Subscription tier definitions (extended for PromptPal)
- Feature flags and permissions
- API configuration
- Validation rules and limits
- PromptPal-specific limits (prompts, folders, executions)

## Related Documentation

- **PRD**: Complete requirements in [docs/prd.md](docs/prd.md)
- **PRD Shards**: Topic-based sections in [docs/prd/](docs/prd/)
- **Stories**: User stories in [docs/prd/61-story-11-database-schema-and-core-models.md](docs/prd/61-story-11-database-schema-and-core-models.md) through [docs/prd/615-story-115-mobile-responsive-prompt-management.md](docs/prd/615-story-115-mobile-responsive-prompt-management.md)
- **Database Schema**: [docs/prd/a-database-schema-detailed.md](docs/prd/a-database-schema-detailed.md)
- **API Specs**: [docs/prd/b-api-route-specifications.md](docs/prd/b-api-route-specifications.md)

This project transforms the SaaS accelerator foundation into a specialized prompt management platform for AI power users.