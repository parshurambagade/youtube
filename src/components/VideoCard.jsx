import { useEffect, useState } from "react";
import { formatCount, formatTimeAgo } from "../utils/helpers";
import { FETCH_CHANNEL_ICON } from "../data/constants";

const VideoCard = ({ video }) => {
    // console.log(video);
    const [channelIcon, setChannelIcon] = useState("");

    const {title, channelTitle, channelId, thumbnails,publishedAt} = video.snippet;
    const {viewCount} = video.statistics;

    useEffect(() => {
      fetchChannelIcon();
    },[video])

    const fetchChannelIcon = async () => {
      const data = await fetch(FETCH_CHANNEL_ICON + channelId);
      const json = await data.json();
      setChannelIcon(json?.items[0]?.snippet?.thumbnails?.medium?.url);
      // console.log(json?.items[0]?.snippet?.thumbnails?.medium?.url);
    }
    // console.log(typeof(viewCount))
  return (
    <div className=" shadow-lg border border-slate-200  flex flex-col w-full rounded-lg ">
        <img src={thumbnails?.medium?.url} className="rounded-t-lg" alt="" />
        <div className="flex gap-2 lg:gap-3 justify-normal md:mt-1 w-full p-2 pb-4">
         
            <img src={channelIcon} alt="channel thumbnail" className="w-10 h-10 aspect-square rounded-full" />
         
            <div className="text-gray-500 flex  flex-col gap-0 md:gap-1">
            <h3 className="font-medium text-black text-wrap">{title.length>65 ? title.slice(0,65) + "..." : title}</h3>
            <p>{channelTitle}</p>
            <span className="flex gap-2">
            <p>{formatCount(viewCount)} views</p>
            <p className="border-l px-2">{formatTimeAgo(publishedAt)}</p>
            </span>
            </div>
        </div>
    </div>
  )
}


export default VideoCard