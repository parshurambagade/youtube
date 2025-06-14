exports.handler = async (event, context) => {
  const { video_id } = event.queryStringParameters || {};
  
  if (!video_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Video ID parameter "video_id" is required' })
    };
  }
  
  try {
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
    
    if (!RAPIDAPI_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'RapidAPI key not configured' })
      };
    }

    const url = `https://youtube-v2.p.rapidapi.com/video/recommendations?video_id=${video_id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
      }
    });
    
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
      body: JSON.stringify({ error: 'Failed to fetch related videos' })
    };
  }
};