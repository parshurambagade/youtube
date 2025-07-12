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
    "related-videos"
  );
  if (securityResult) return securityResult;

  const { video_id } = event.queryStringParameters || {};

  // Validate video ID
  const validation = validateRequiredParam(
    { video_id },
    "video_id",
    VALIDATORS.youtubeVideoId
  );
  if (!validation.valid) {
    return createErrorResponse(400, validation.error);
  }

  try {
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

    if (!RAPIDAPI_KEY) {
      return createErrorResponse(500, "RapidAPI key not configured");
    }

    const url = `https://youtube-v2.p.rapidapi.com/video/recommendations?video_id=${video_id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "youtube-v2.p.rapidapi.com",
      },
    });

    const data = await response.json();

    return createSuccessResponse(data, 600); // Cache for 10 minutes
  } catch (error) {
    return createErrorResponse(500, "Failed to fetch related videos");
  }
};
