# 6.0 Story 1.0: Architecture Alignment and Migration Setup

**As a** developer,
**I want** the architecture document aligned with the actual repository structure and migration workflow established,
**so that** the team can implement PromptPal features without confusion or structural mismatches.

## Acceptance Criteria

1. ✅ **Repository structure documentation matches actual codebase** (no npm workspaces, single Next.js app)
2. ✅ **Supabase migration infrastructure created** (`supabase/` directory with workflow documentation)
3. ✅ **Migration workflow documented** with step-by-step instructions for creating, testing, and deploying migrations
4. ✅ **Schema drift prevention strategy defined** (5 key rules in architecture doc)
5. ✅ **Database management npm scripts added** to package.json documentation
6. ✅ **Package.json tooling scripts implemented** (Playwright and Supabase CLI scripts now in package.json)
7. ⏳ **API key encryption strategy completed** (production storage, rotation, ownership guidance needed)
8. ⏳ **Browser extension security model defined** (token issuance, refresh, CORS strategy)

## What Was Fixed (Completed)

### 1. Repository Structure Mismatch (✅ RESOLVED)
- **Problem**: Architecture doc assumed npm workspaces with `packages/prompt-engine/` and `packages/llm-providers/`
- **Solution**: Updated docs/architecture.md:95-140 to reflect single Next.js app structure
- **Files Changed**:
  - `docs/architecture.md` (lines 95-140, 1193-1301)
- **Rationale**: Maintains brownfield simplicity, follows Next.js conventions, no workspace overhead

### 2. Missing Migration Infrastructure (✅ RESOLVED)
- **Problem**: Architecture referenced `supabase/migrations/` directory that didn't exist
- **Solution**: Created directory structure with comprehensive workflow documentation
- **Files Created**:
  - `supabase/README.md` - Complete migration workflow guide
  - `supabase/migrations/.gitkeep` - Directory placeholder with instructions
- **Documentation Added**: Migration workflow section in architecture.md (lines 1120-1182)

### 3. Schema Drift Prevention (✅ RESOLVED)
- **Problem**: Large schema spec (lines 924-1073) had no versioning/generation guidance
- **Solution**: Added concrete workflow for migration creation, testing, and type generation
- **Key Guidelines**:
  - Never manually edit DB via Supabase Dashboard
  - Always create migrations for schema changes
  - Commit migrations to git before deploying
  - Regenerate TypeScript types after each migration
  - Test locally before production push

### 4. Package.json Tooling Scripts (✅ RESOLVED)
- **Problem**: Architecture doc referenced scripts not in actual package.json
- **Solution**: Implemented all documented scripts in package.json
- **Files Changed**:
  - `package.json` (lines 15-21)
  - `docs/architecture.md` (lines 1279-1319) - updated to reflect implemented scripts
- **Scripts Added**:
  - `"test": "playwright test"` - Run E2E tests (was placeholder)
  - `"test:ui": "playwright test --ui"` - Interactive test debugging
  - `"test:headed": "playwright test --headed"` - Visual test execution
  - `"db:migrate": "supabase db push"` - Deploy migrations to production
  - `"db:reset": "supabase db reset"` - Reset local database
  - `"db:types": "supabase gen types typescript..."` - Generate TypeScript types
  - `"db:migration": "supabase migration new"` - Create new migration file
- **Verification**: ✅ Tested `npm run test -- --list` successfully lists all Playwright tests

## What Remains (To Do)

### 5. API Key Encryption Production Strategy (⏳ PENDING)
- **Problem**: `API_KEY_ENCRYPTION_SECRET` in `.env.local` lacks:
  - Production storage guidance (Supabase Vault? Vercel env? External KMS?)
  - Key rotation strategy
  - Ownership and access control
  - Secret recovery procedures
- **Action Required**: Define complete encryption key lifecycle
- **Files to Update**:
  - `docs/architecture.md` (new section: "API Key Encryption Strategy")
  - `INSTALL.md` (production deployment section)
  - `.env.local.example` (add with guidance comments)

### 6. Browser Extension Security Model (⏳ PENDING)
- **Problem**: Extension API endpoints (lines 679-864) lack:
  - Token issuance mechanism (JWT? API keys?)
  - Token refresh/expiration strategy
  - CORS configuration details
  - Rate limiting per extension client
- **Action Required**: Define extension authentication architecture
- **Files to Update**:
  - `docs/architecture.md` (new section: "Extension Security Model")
  - `src/middleware.ts` (CORS configuration)

## Integration Verification

- **IV1**: ✅ Existing authentication system unaffected by architecture updates
- **IV2**: ✅ Existing Stripe subscription system continues to function
- **IV3**: ✅ Development workflow (npm run dev, build, lint) remains unchanged
- **IV4**: ✅ New test scripts work correctly (verified with Playwright)
- **IV5**: ⏳ New database scripts work when Supabase CLI is installed and linked

## Technical Notes

**Migration Setup Prerequisites:**
```bash
# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref <your-project-ref>

# Create first migration
supabase migration new create_prompts_schema

# Copy schema from docs/architecture.md lines 952-1117
# into: supabase/migrations/YYYYMMDDHHMMSS_create_prompts_schema.sql

# Test locally
supabase db reset

# Generate types
supabase gen types typescript --local > src/types/database.ts
```

**Implemented Package.json Scripts:**
```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "db:migrate": "supabase db push",
    "db:reset": "supabase db reset",
    "db:types": "supabase gen types typescript --local > src/types/database.ts",
    "db:migration": "supabase migration new"
  }
}
```

**Note**: Supabase CLI is installed globally (`npm install -g supabase`), not as a devDependency, following Supabase's recommended installation method.

## Dependencies

- **Blocks**: Story 1.1 (Database Schema) - requires migration infrastructure to be functional
- **Blocked By**: None - this is the foundational story

## Estimation

- **Completed Work**: ~3 hours
  - Architecture doc fixes: 1 hour
  - Directory setup and workflow documentation: 1 hour
  - Package.json script implementation: 1 hour
- **Remaining Work**: ~3 hours
  - API encryption strategy definition: 2 hours
  - Extension security model design: 1 hour

## Definition of Done

- [x] Architecture document matches actual repository structure
- [x] Migration directory exists with workflow documentation
- [x] Schema drift prevention strategy documented
- [x] All documented npm scripts implemented in package.json
- [x] Test scripts verified working (Playwright)
- [ ] Supabase CLI commands tested and verified working (requires CLI installation)
- [ ] API key encryption production strategy documented
- [ ] Browser extension security model documented
- [ ] INSTALL.md updated with migration setup instructions
- [ ] Architecture review findings resolved or documented as future work

## References

- **Architecture Review**: `docs/architecture-review.md` (source of findings)
- **Architecture Doc**: `docs/architecture.md` (lines 95-140, 1120-1182, 1279-1319)
- **Package.json**: `package.json` (lines 5-22) - scripts section
- **Migration Infrastructure**: `supabase/README.md`
- **Existing Auth**: `src/lib/auth/server.ts`, `src/middleware.ts`
- **Existing Subscriptions**: `src/lib/subscriptions.ts`

---

**Status**: 🟡 **IN PROGRESS** (75% complete - infrastructure and tooling done, security strategy pending)
**Priority**: 🔴 **HIGH** (blocks all database-dependent stories)
**Risk**: 🟢 **LOW** (completed work is stable, remaining work is additive)
