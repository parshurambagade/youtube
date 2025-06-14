exports.handler = async (event, context) => {
  const { videoId } = event.queryStringParameters || {};
  
  if (!videoId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Video ID parameter "videoId" is required' })
    };
  }
  
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    
    if (!YOUTUBE_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'YouTube API key not configured' })
      };
    }

    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&key=${YOUTUBE_API_KEY}&videoId=${videoId}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch video comments' })
    };
  }
};