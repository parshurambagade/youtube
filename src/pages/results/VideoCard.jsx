import { formatTimeAgo } from "../../utils/helpers";

const VideoCard = ({ video }) => {
    const { title, description, publishTime, channelTitle, thumbnails } =
      video.snippet;
  
    const timeAgo = formatTimeAgo(publishTime);
  
    return (
      <div className="flex flex-col md:shadow-md lg:flex-row w-full my-1 lg:my-2 lg:w-3/4 border border-slate-100 lg:shadow-md rounded-lg">
        <img
          src={thumbnails?.medium?.url}
          alt="thumbnail"
          className="rounded-lg w-full lg:w-[40%]"
        />
        <div className="flex flex-col gap-0 md:gap-2 lg:gap-2 py-2 px-2  lg:px-4 w-full lg:w-[60%] text-gray-500">
          <h4 className="font-normal text-base md:text-[1.25rem] text-black">{title}</h4>
          <div className="flex lg:flex-col gap-4 text-sm md:text-base">
          <span>{timeAgo} </span>
          <span>{channelTitle}</span>
          <span className="hidden lg:block">{description}</span>
          </div>
        </div>
      </div>
    );
  };

export default VideoCard;