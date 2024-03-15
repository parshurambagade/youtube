import { formatCount, formatTimeAgo } from "../../utils/helpers";

const VideoCard = ({ video }) => {
    const { title, published_time, author, thumbnails, number_of_views } = video;
  
  
    return (
      <div className="flex flex-col md:shadow-md lg:flex-row w-full my-1   border border-slate-100 lg:shadow-md rounded-lg">
        <img
          src={thumbnails?.[0].url}
          alt="thumbnail"
          className="rounded-lg w-full lg:w-[40%]"
        />
        <div className="flex flex-col justify-start gap-0 md:gap-1 lg:gap-1 py-2 px-2  lg:px-4 w-full lg:w-[60%] text-gray-500">
          <h4 className="font-bold text-sm  text-black">{title.length>50 ? title.slice(0,50)+"..." : title}</h4>
          <div className="flex lg:flex-col gap-1 text-sm">
          <span>{author}</span>
          <div className="flex gap-2">
          <span className="hidden lg:block">{formatCount(number_of_views)}</span>
          <span>-</span>
          <span>{published_time} </span>
          </div>
          </div>
        </div>
      </div>
    );
  };

export default VideoCard;