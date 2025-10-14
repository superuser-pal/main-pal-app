# 4.4 Deployment and Operations

## Build Process Integration
- Leverage existing Next.js build pipeline
- Environment variable validation at build time
- Database migrations run via Supabase CLI before deployment
- Type generation from database schema (`supabase gen types typescript`)

## Deployment Strategy
- **Vercel**: Deploy via Git integration (main branch → production)
- **Staging**: Use Vercel preview deployments for feature branches
- **Database**: Supabase project per environment (dev, staging, prod)
- **Secrets**: Environment variables in Vercel dashboard

## Monitoring and Logging
- Existing Vercel analytics for performance monitoring
- Supabase dashboard for database metrics (connections, query performance)
- Stripe dashboard for webhook delivery monitoring
- Implement structured logging for LLM API calls (provider, model, tokens, latency)
- Error tracking via Vercel logs or Sentry integration (optional)

## Configuration Management
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
