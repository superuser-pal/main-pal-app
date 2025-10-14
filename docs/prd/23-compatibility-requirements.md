# 2.3 Compatibility Requirements

## CR1: Existing Authentication System
PromptPal features must integrate seamlessly with existing Supabase authentication (JWT tokens, session management, protected routes middleware) without modification to auth flows.

## CR2: Existing Subscription System
Prompt library limits and feature access must utilize existing Stripe subscription tier system (Free/Pro/Enterprise) and `hasFeatureAccess()` utility functions without breaking current subscription management.

## CR3: Database Schema Compatibility
New database tables (prompts, modules, options, variables, folders) must follow existing naming conventions, use Supabase RLS policies for row-level security, and maintain foreign key relationships with users table.

## CR4: UI/UX Consistency
New prompt management interfaces must use existing shadcn/ui component library, follow established design tokens (colors, spacing, typography), support dark/light themes, and match existing navigation patterns.

## CR5: API Consistency
New API routes (/api/prompts/*, /api/folders/*, etc.) must follow existing patterns for authentication (middleware), error responses (JSON format), and rate limiting using NextJS App Router conventions.

## CR6: Testing Infrastructure
New features must integrate with existing Playwright test setup, use established test helpers pattern (auth-helpers.ts), and follow existing test organization structure.

---
