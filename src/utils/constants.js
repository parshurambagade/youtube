
export const YOUTUBE_SEARCH_AUTOCOMPLETE_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=25&regionCode=in&key=" + import.meta.env.VITE_YOUTUBE_API_KEY;

export const FETCH_VIDEOS_BY_KEYWORD = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&key=" + import.meta.env.VITE_YOUTUBE_API_KEY + "&q="
