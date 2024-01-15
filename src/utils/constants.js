
export const YOUTUBE_SEARCH_AUTOCOMPLETE_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=" + import.meta.env.VITE_YOUTUBE_API_KEY;

