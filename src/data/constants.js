
export const YOUTUBE_SEARCH_AUTOCOMPLETE_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=" + import.meta.env.VITE_YOUTUBE_API_KEY;

export const FETCH_POPULAR_VIDEOS_BY_CATEGORY_ID = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&videoCategoryId=`

export const FETCH_VIDEOS_BY_KEYWORD = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&regionCode=in&key=" + import.meta.env.VITE_YOUTUBE_API_KEY + "&q="

export const FETCH_VIDEOS_DETAILS = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&id=`

export const FETCH_VIDEO_COMMENTS = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&videoId=`

export const FETCH_CHANNEL_DETAILS = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&id=`   