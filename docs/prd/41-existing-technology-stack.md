# 4.1 Existing Technology Stack

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
