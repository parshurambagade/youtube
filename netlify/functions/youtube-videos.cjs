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
    "youtube-videos"
  );
  if (securityResult) return securityResult;

  const { categoryId } = event.queryStringParameters || {};

  // Validate categoryId if provided
  if (categoryId) {
    const validation = validateRequiredParam(
      { categoryId },
      "categoryId",
      VALIDATORS.categoryId
    );
    if (!validation.valid) {
      return createErrorResponse(400, validation.error);
    }
  }

  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    if (!YOUTUBE_API_KEY) {
      return createErrorResponse(500, "YouTube API key not configured");
    }

    let url;
    if (categoryId) {
      url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=${YOUTUBE_API_KEY}&videoCategoryId=${categoryId}`;
    } else {
      url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=${YOUTUBE_API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return createSuccessResponse(data, 300); // Cache for 5 minutes
  } catch (error) {
    return createErrorResponse(500, "Failed to fetch videos");
  }
};
