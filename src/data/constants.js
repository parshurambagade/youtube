
export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const YOUTUBE_SEARCH_AUTOCOMPLETE_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=${YOUTUBE_API_KEY}`;

export const FETCH_POPULAR_VIDEOS_BY_CATEGORY_ID = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=${YOUTUBE_API_KEY}&videoCategoryId=`

export const FETCH_VIDEOS_BY_KEYWORD = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&regionCode=in&key=${YOUTUBE_API_KEY}&q=`

export const FETCH_VIDEOS_DETAILS = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&type=video&key=${YOUTUBE_API_KEY}&id=`

export const FETCH_VIDEO_COMMENTS = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&key=${YOUTUBE_API_KEY}&videoId=`

// export const FETCH_RELATED_VIDEOS = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${YOUTUBE_API_KEY}&relatedToVideoId=`

export const FETCH_CHANNEL_DETAILS = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${YOUTUBE_API_KEY}&id=`   

export const FETCH_CHANNEL_ICON = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=${YOUTUBE_API_KEY}&id=`

// export const FETCH_SUBSCRIPTIONS = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&key=${YOUTUBE_API_KEY}&mySubscribers=false&channelId=`

export const FETCH_SUBSCRIPTIONS = `https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.subscriptions.list?part=snippet,contentDetails&mine=true`


export const FETCH_RELATED_VIDEOS = 'https://youtube-v2.p.rapidapi.com/video/recommendations?video_id=';
export const FETCH_RELATED_VIDEOS_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd3a49925bbmshfab16c20f7d8626p190320jsn4241f59eb1a2',
    'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
  }
};