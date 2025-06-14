export const YOUTUBE_SEARCH_AUTOCOMPLETE_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

// Updated to use Netlify functions
export const YOUTUBE_VIDEOS_API = `/.netlify/functions/youtube-videos`;

export const FETCH_POPULAR_VIDEOS_BY_CATEGORY_ID = `/.netlify/functions/youtube-videos?categoryId=`

export const FETCH_VIDEOS_BY_KEYWORD = `/.netlify/functions/search-videos?q=`

export const FETCH_VIDEOS_DETAILS = `/.netlify/functions/video-details?id=`

export const FETCH_VIDEO_COMMENTS = `/.netlify/functions/video-comments?videoId=`

export const FETCH_CHANNEL_DETAILS = `/.netlify/functions/channel-details?id=`   

export const FETCH_CHANNEL_ICON = `/.netlify/functions/channel-details?id=`

export const FETCH_SUBSCRIPTIONS = `https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.subscriptions.list?part=snippet,contentDetails&mine=true`


export const FETCH_RELATED_VIDEOS = '/.netlify/functions/related-videos?video_id=';
