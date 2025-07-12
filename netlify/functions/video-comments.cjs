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
    "video-comments"
  );
  if (securityResult) return securityResult;

  const { videoId } = event.queryStringParameters || {};

  // Validate video ID
  const validation = validateRequiredParam(
    { videoId },
    "videoId",
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

    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&key=${YOUTUBE_API_KEY}&videoId=${videoId}`;

    const response = await fetch(url);
    const data = await response.json();

    return createSuccessResponse(data, 300); // Cache for 5 minutes
  } catch (error) {
    return createErrorResponse(500, "Failed to fetch video comments");
  }
};
