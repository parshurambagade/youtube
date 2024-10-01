/* eslint-disable react/prop-types */
import { formatCount } from "../../utils/helpers";
import useChannelInfo from "../../hooks/useChannelInfo";

const Channelnfo = ({ channelId }) => {

  const channelInfo = useChannelInfo(channelId);
  
  return (
    channelInfo && (
      <div className="flex gap-2 lg:gap-4 items-center">
        <img
          src={channelInfo?.snippet?.thumbnails?.medium?.url}
          className="rounded-full w-10 h-10"
        />
        <div className="flex gap-2  lg:flex-col lg:gap-0 leading-none">
          <span className=" text-base md:text-lg font-semibold">
            {channelInfo?.snippet?.title}
          </span>
          <span className="text-gray-600 flex items-center text-xs md:text-sm">
            {formatCount(channelInfo?.statistics?.subscriberCount)}{" "}
            <span className="hidden md:flex mx-2"> subscribers</span>
          </span>
        </div>
      </div>
    )
  );
};

export default Channelnfo;
