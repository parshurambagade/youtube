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
    "channel-details"
  );
  if (securityResult) return securityResult;

  const { id } = event.queryStringParameters || {};

  // Validate channel ID
  const validation = validateRequiredParam(
    { id },
    "id",
    VALIDATORS.youtubeChannelId
  );
  if (!validation.valid) {
    return createErrorResponse(400, validation.error);
  }

  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    if (!YOUTUBE_API_KEY) {
      return createErrorResponse(500, "YouTube API key not configured");
    }

    const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=${YOUTUBE_API_KEY}&id=${id}`;

    const response = await fetch(url);
    const data = await response.json();

    return createSuccessResponse(data, 300); // Cache for 5 minutes
  } catch (error) {
    return createErrorResponse(500, "Failed to fetch channel details");
  }
};
