const {
  securityMiddleware,
  createErrorResponse,
  createSuccessResponse,
  validateRequiredParam,
  VALIDATORS,
} = require("./shared/security");

exports.handler = async (event, context) => {
  // Apply security middleware
  const securityResult = await securityMiddleware(
    event,
    context,
    "video-details"
  );
  if (securityResult) return securityResult;

  const { id } = event.queryStringParameters || {};

  // Validate video ID
  const validation = validateRequiredParam(
    { id },
    "id",
    VALIDATORS.youtubeVideoId
  );
  if (!validation.valid) {
    return createErrorResponse(400, validation.error);
  }

  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    if (!YOUTUBE_API_KEY) {
      return createErrorResponse(500, "YouTube API key not configured");
    }

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&type=video&key=${YOUTUBE_API_KEY}&id=${id}`;

    const response = await fetch(url);
    const data = await response.json();

    return createSuccessResponse(data, 600); // Cache for 10 minutes
  } catch (error) {
    return createErrorResponse(500, "Failed to fetch video details");
  }
};
