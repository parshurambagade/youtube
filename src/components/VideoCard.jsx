/* eslint-disable react/prop-types */
import { formatCount, formatTimeAgo } from "../utils/helpers";
import useChannelIcon from "../hooks/useChannelIcon";

const VideoCard = ({ video }) => {
  const { title, channelTitle, channelId, thumbnails, publishedAt } =
    video.snippet;
  const { viewCount } = video.statistics;

  const channelIcon = useChannelIcon(channelId);

  return (
    <div className="shadow-sm  border-slate-200  flex flex-col w-full rounded-lg ">
      <img src={thumbnails?.medium?.url} className="rounded-t-lg" alt={title} />
      <div className="flex gap-2 lg:gap-3 justify-normal md:mt-1 w-full p-2 pb-4">
        <img
          src={channelIcon && channelIcon}
          alt="channel thumbnail"
          className="w-10 h-10 aspect-square rounded-full"
        />

        <div className="text-gray-500 flex  flex-col gap-0 md:gap-1/2">
          <h3 className="font-medium text-black text-wrap">
            {title.length > 65 ? title.slice(0, 65) + "..." : title}
          </h3>
          <p className="text-sm">{channelTitle}</p>
          <span className="flex gap-2">
            <p className="text-sm">{formatCount(viewCount)} views</p>
            <p className="border-l px-2 text-sm">{formatTimeAgo(publishedAt)}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
