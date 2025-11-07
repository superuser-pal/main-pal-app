/**
 * Extension API Rate Limiting
 *
 * Provides rate limiting for browser extension API endpoints using Upstash Redis.
 * Uses sliding window algorithm for smooth rate limiting.
 *
 * @see docs/architecture.md - Browser Extension Security Model section
 * @see INSTALL.md - Phase 3.2 for Upstash setup instructions
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Subscription tier type for rate limiting
 */
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

/**
 * Duration type for Upstash Ratelimit (milliseconds or time string)
 */
type Duration = Parameters<typeof Ratelimit.slidingWindow>[1];

/**
 * Rate limit configuration per endpoint
 */
interface RateLimitConfig {
  requests: number; // Number of requests allowed
  window: Duration; // Time window (e.g., '1 h', '1 m')
}

/**
 * Endpoint-specific rate limits for Enterprise tier
 * Note: Extension API is Enterprise-only during beta phase
 */
const ENTERPRISE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/v1/extension/prompts': { requests: 30, window: '1 h' as Duration }, // Full sync
  '/api/v1/extension/prompts/sync': { requests: 100, window: '1 h' as Duration }, // Incremental sync
  '/api/v1/extension/usage': { requests: 500, window: '1 h' as Duration }, // Analytics tracking
  '/api/v1/extension/folders': { requests: 50, window: '1 h' as Duration }, // Folder structure
  '/api/v1/extension/auth': { requests: 5, window: '1 h' as Duration }, // Token issuance
};

/**
 * Default rate limit for unknown endpoints
 */
const DEFAULT_LIMIT: RateLimitConfig = { requests: 30, window: '1 h' as Duration };

/**
 * Initialize Redis client (Upstash)
 *
 * Returns null if Upstash credentials not configured (development mode).
 * In production, rate limiting is strongly recommended.
 */
function getRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_URL;
  const token = process.env.UPSTASH_REDIS_TOKEN;

  if (!url || !token) {
    // Rate limiting disabled (development or missing config)
    console.warn(
      'Extension API rate limiting disabled: UPSTASH_REDIS_URL or UPSTASH_REDIS_TOKEN not set. ' +
      'See INSTALL.md Phase 3.2 for setup instructions.'
    );
    return null;
  }

  return new Redis({
    url,
    token,
  });
}

/**
 * Create rate limiter for specific endpoint and tier
 *
 * @param endpoint - API endpoint path (e.g., '/api/v1/extension/prompts')
 * @param tier - User subscription tier
 * @returns Ratelimit instance configured for endpoint
 */
export function createRateLimiter(
  endpoint: string,
  tier: SubscriptionTier
): Ratelimit | null {
  const redis = getRedisClient();

  if (!redis) {
    // Rate limiting disabled (no Redis configured)
    return null;
  }

  // Extension API is Enterprise-only during beta
  if (tier !== 'enterprise') {
    // Block all requests for non-Enterprise tiers
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(0, '1 h'), // 0 requests allowed
      analytics: true,
      prefix: 'extension_api_blocked',
    });
  }

  // Get endpoint-specific limit or use default
  const limit = ENTERPRISE_LIMITS[endpoint] || DEFAULT_LIMIT;

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit.requests, limit.window),
    analytics: true,
    prefix: `extension_api:${endpoint}`,
  });
}

/**
 * Check rate limit for user and endpoint
 *
 * Returns rate limit status with remaining requests and reset time.
 *
 * @param userId - User ID (from JWT token)
 * @param endpoint - API endpoint path
 * @param tier - User subscription tier
 * @returns Rate limit status
 *
 * @example
 * const result = await checkRateLimit('user_123', '/api/v1/extension/prompts', 'enterprise');
 * if (!result.success) {
 *   return NextResponse.json({ error: 'RATE_LIMIT_EXCEEDED' }, { status: 429 });
 * }
 */
export async function checkRateLimit(
  userId: string,
  endpoint: string,
  tier: SubscriptionTier
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<unknown>;
}> {
  const ratelimiter = createRateLimiter(endpoint, tier);

  // If rate limiting disabled (no Redis), allow all requests
  if (!ratelimiter) {
    return {
      success: true,
      limit: Infinity,
      remaining: Infinity,
      reset: Date.now(),
      pending: Promise.resolve(),
    };
  }

  // Identifier: user:endpoint for per-user, per-endpoint rate limiting
  const identifier = `${userId}:${endpoint}`;

  try {
    const result = await ratelimiter.limit(identifier);

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      pending: result.pending,
    };
  } catch (error) {
    // Redis error - fail open (allow request) to avoid blocking users
    console.error('Rate limit check failed:', error);
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: Date.now(),
      pending: Promise.resolve(),
    };
  }
}

/**
 * Add rate limit headers to response
 *
 * Standard rate limit headers for API responses.
 *
 * @param headers - Response headers object
 * @param rateLimit - Rate limit status from checkRateLimit
 *
 * @example
 * const result = await checkRateLimit(userId, endpoint, tier);
 * const headers = new Headers();
 * addRateLimitHeaders(headers, result);
 * return NextResponse.json(data, { headers });
 */
export function addRateLimitHeaders(
  headers: Headers,
  rateLimit: {
    limit: number;
    remaining: number;
    reset: number;
  }
): void {
  headers.set('X-RateLimit-Limit', rateLimit.limit.toString());
  headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
  headers.set('X-RateLimit-Reset', rateLimit.reset.toString());
}

/**
 * Get rate limit configuration for endpoint
 *
 * Utility function for displaying rate limits to users.
 *
 * @param endpoint - API endpoint path
 * @param tier - User subscription tier
 * @returns Rate limit configuration
 *
 * @example
 * const limit = getRateLimitConfig('/api/v1/extension/prompts', 'enterprise');
 * // Returns: { requests: 30, window: '1 h' }
 */
export function getRateLimitConfig(
  endpoint: string,
  tier: SubscriptionTier
): RateLimitConfig {
  // Non-Enterprise tiers blocked
  if (tier !== 'enterprise') {
    return { requests: 0, window: '1 h' };
  }

  return ENTERPRISE_LIMITS[endpoint] || DEFAULT_LIMIT;
}

/**
 * Format rate limit for user display
 *
 * Converts rate limit config to human-readable string.
 *
 * @param config - Rate limit configuration
 * @returns Human-readable rate limit string
 *
 * @example
 * const formatted = formatRateLimit({ requests: 30, window: '1 h' as Duration });
 * // Returns: "30 requests per hour"
 */
export function formatRateLimit(config: RateLimitConfig): string {
  const windowMap: Record<string, string> = {
    '1 m': 'minute',
    '1 h': 'hour',
    '1 d': 'day',
  };

  const windowStr = String(config.window);
  const period = windowMap[windowStr] || windowStr;
  return `${config.requests} requests per ${period}`;
}
