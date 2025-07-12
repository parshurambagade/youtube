// Shared security utilities for Netlify functions
const rateLimitMaps = new Map(); // Store rate limit maps for each function

/**
 * Rate limiting configuration for different endpoints
 */
const RATE_LIMIT_CONFIG = {
  'youtube-videos': { window: 60000, maxRequests: 15 },
  'search-videos': { window: 60000, maxRequests: 12 },
  'video-details': { window: 60000, maxRequests: 10 },
  'channel-details': { window: 60000, maxRequests: 10 },
  'video-comments': { window: 60000, maxRequests: 8 },
  'related-videos': { window: 60000, maxRequests: 10 }
};

/**
 * Check rate limit for a specific function and client IP
 */
function checkRateLimit(functionName, clientIP) {
  const config = RATE_LIMIT_CONFIG[functionName];
  if (!config) return true; // No rate limiting if config not found

  const now = Date.now();
  const windowStart = now - config.window;
  
  if (!rateLimitMaps.has(functionName)) {
    rateLimitMaps.set(functionName, new Map());
  }
  
  const functionRateMap = rateLimitMaps.get(functionName);
  
  if (!functionRateMap.has(clientIP)) {
    functionRateMap.set(clientIP, []);
  }
  
  const requests = functionRateMap.get(clientIP);
  // Remove old requests outside the window
  const recentRequests = requests.filter(time => time > windowStart);
  functionRateMap.set(clientIP, recentRequests);
  
  if (recentRequests.length >= config.maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  return true;
}

/**
 * Validate if the request origin is allowed
 */
function isValidOrigin(origin, referer) {
  const allowedOrigins = [
    'https://vtube1.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
  ];
  
  // Check if origin is in allowed list
  if (origin && allowedOrigins.includes(origin)) {
    return true;
  }
  
  // Check referer as fallback
  if (referer) {
    return allowedOrigins.some(allowed => referer.startsWith(allowed));
  }
  
  return false;
}

/**
 * Common CORS headers
 */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://vtube1.netlify.app',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

/**
 * Input validators
 */
const VALIDATORS = {
  youtubeVideoId: /^[a-zA-Z0-9_-]{11}$/,
  youtubeChannelId: /^UC[a-zA-Z0-9_-]{22}$/,
  categoryId: /^\d+$/,
  searchQuery: (query) => {
    if (!query || query.trim().length === 0) {
      return { valid: false, error: 'Search query cannot be empty' };
    }
    if (query.length > 100) {
      return { valid: false, error: 'Search query too long (max 100 characters)' };
    }
    return { valid: true };
  }
};

/**
 * Security middleware for Netlify functions
 */
async function securityMiddleware(event, context, functionName) {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get client IP for rate limiting
  const clientIP = event.headers['x-forwarded-for'] || 
                   event.headers['x-real-ip'] || 
                   context.clientContext?.ip || 
                   'unknown';

  // Check rate limit
  if (!checkRateLimit(functionName, clientIP)) {
    return {
      statusCode: 429,
      headers: {
        ...CORS_HEADERS,
        'Retry-After': '60'
      },
      body: JSON.stringify({ 
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: 60 
      })
    };
  }

  // Validate origin/referer
  const origin = event.headers.origin;
  const referer = event.headers.referer;
  
  if (!isValidOrigin(origin, referer)) {
    return {
      statusCode: 403,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Access denied. Invalid origin.' })
    };
  }

  // Optional: Check for API key in headers for additional security
  const apiKeyHeader = event.headers['x-api-key'];
  const FRONTEND_API_KEY = process.env.FRONTEND_API_KEY;
  
  if (FRONTEND_API_KEY && (!apiKeyHeader || apiKeyHeader !== FRONTEND_API_KEY)) {
    return {
      statusCode: 401,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid or missing API key' })
    };
  }

  // Return null if all security checks pass
  return null;
}

/**
 * Create error response with proper headers
 */
function createErrorResponse(statusCode, message) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify({ error: message })
  };
}

/**
 * Create success response with proper headers and caching
 */
function createSuccessResponse(data, cacheMaxAge = 300) {
  return {
    statusCode: 200,
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': `public, max-age=${cacheMaxAge}`
    },
    body: JSON.stringify(data)
  };
}

/**
 * Validate required parameter
 */
function validateRequiredParam(params, paramName, validator) {
  const value = params[paramName];
  
  if (!value) {
    return { valid: false, error: `${paramName} parameter is required` };
  }
  
  if (validator) {
    if (typeof validator === 'function') {
      return validator(value);
    } else if (validator instanceof RegExp) {
      if (!validator.test(value)) {
        return { valid: false, error: `Invalid ${paramName} format` };
      }
    }
  }
  
  return { valid: true, value };
}

module.exports = {
  securityMiddleware,
  createErrorResponse,
  createSuccessResponse,
  validateRequiredParam,
  VALIDATORS,
  CORS_HEADERS
};