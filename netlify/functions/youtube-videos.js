exports.handler = async (event, context) => {
  const { categoryId } = event.queryStringParameters || {};
  
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    
    if (!YOUTUBE_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'YouTube API key not configured' })
      };
    }

    let url;
    if (categoryId) {
      url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=${YOUTUBE_API_KEY}&videoCategoryId=${categoryId}`;
    } else {
      url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=${YOUTUBE_API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log("Data: ", data);
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
      body: JSON.stringify({ error: 'Failed to fetch videos' })
    };
  }
};