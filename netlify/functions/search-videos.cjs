const {
  securityMiddleware,
  createErrorResponse,
  createSuccessResponse,
  validateRequiredParam,
  VALIDATORS,
} = require("./shared/security.cjs");

exports.handler = async (event, context) => {
  // Apply security middleware
  const securityResult = await securityMiddleware(
    event,
    context,
    "search-videos"
  );
  if (securityResult) return securityResult;

  const { q } = event.queryStringParameters || {};

  // Validate search query
  const validation = validateRequiredParam({ q }, "q", VALIDATORS.searchQuery);
  if (!validation.valid) {
    return createErrorResponse(400, validation.error);
  }

  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    if (!YOUTUBE_API_KEY) {
      return createErrorResponse(500, "YouTube API key not configured");
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&regionCode=in&key=${YOUTUBE_API_KEY}&q=${encodeURIComponent(
      q
    )}`;

    const response = await fetch(url);
    const data = await response.json();

    return createSuccessResponse(data, 180); // Cache for 3 minutes
  } catch (error) {
    return createErrorResponse(500, "Failed to search videos");
  }
};
