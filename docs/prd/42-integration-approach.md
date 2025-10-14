# 4.2 Integration Approach

## Database Integration Strategy
- **New Tables**: Create `prompts`, `modules`, `options`, `variables`, `folders` tables
- **Relationships**: Foreign keys to `auth.users` via `user_id` columns
- **RLS Policies**: Enable RLS on all tables, policies enforce `user_id = auth.uid()`
- **Migrations**: Use Supabase migration files (`supabase/migrations/YYYYMMDDHHMMSS_create_prompts.sql`)
- **Queries**: Use Supabase client with TypeScript types (`Database['public']['Tables']`)

## API Integration Strategy
- **Route Convention**: Place routes in `/app/api/prompts/`, `/app/api/folders/`, etc.
- **Authentication**: Use existing `requireAuth()` from `lib/auth/server.ts` in route handlers
- **Error Handling**: Return consistent JSON format `{ error: string, code?: string }`
- **Rate Limiting**: Leverage subscription tier checks before expensive operations
- **Validation**: Use Zod schemas for request body validation

## Frontend Integration Strategy
- **Layout**: Use existing `MainLayout` component with custom navigation config for Library/Builder sections
- **Forms**: Extend existing form patterns (controlled components, validation state, submit handlers)
- **State Management**: React Context for prompt builder state, Server Components for data fetching
- **Caching**: Leverage Next.js App Router caching, revalidate on mutations
- **Real-time**: Use Supabase real-time subscriptions for collaborative features (Phase 2)

## Testing Integration Strategy
- **Unit Tests**: Jest + React Testing Library for component tests (add to existing setup)
- **E2E Tests**: Playwright specs in `/tests/prompts/`, extend existing test helpers
- **Test Data**: Seed scripts for prompt fixtures, use existing Supabase test database
- **CI/CD**: Integrate with existing GitHub Actions workflow
