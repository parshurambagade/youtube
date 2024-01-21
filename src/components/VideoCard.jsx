import { formatCount, formatTimeAgo } from "../utils/helpers";

const VideoCard = ({ video }) => {

    const {title, channelTitle, thumbnails,publishedAt} = video.snippet;
    const {viewCount} = video.statistics;
    // console.log(typeof(viewCount))
  return (
    <div className=" shadow-lg border border-slate-200  flex flex-col w-full rounded-lg ">
        <img src={thumbnails?.medium?.url} className="rounded-t-lg" alt="" />
        <div className="flex gap-1  flex-col mt-1 w-full p-2">
            <img src="" alt="" />
            <div className="text-gray-500 flex flex-col gap-1">
            <h3 className="font-medium text-black">{title}</h3>
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