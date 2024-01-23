import { formatTimeAgo } from "../../utils/helpers";

const VideoCard = ({ video }) => {
    const { title, description, publishTime, channelTitle, thumbnails } =
      video.snippet;
  
    const timeAgo = formatTimeAgo(publishTime);
  
    return (
      <div className="flex my-2 w-3/4 border border-slate-100 shadow-md rounded-lg">
        <img
          src={thumbnails?.medium?.url}
          alt="thumbnail"
          className="rounded-lg w-[40%]"
        />
        <div className="flex flex-col gap-2 py-2 px-4 w-[60%] text-gray-500">
          <h4 className="font-normal text-[1.25rem] text-black">{title}</h4>
          <span>{timeAgo} </span>
          <span>{channelTitle}</span>
          <span>{description}</span>
        </div>
      </div>
    );
  };

export default VideoCard;