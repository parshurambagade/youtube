import { useEffect, useState } from "react";
import { FETCH_VIDEOS_BY_KEYWORD } from "../utils/constants";
import { Link, useSearchParams } from "react-router-dom";
import { formatTimeAgo } from "../utils/helpers";

const Results = () => {
  const [results, setResults] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("search");

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(FETCH_VIDEOS_BY_KEYWORD + q);
    const json = await data.json();
    setResults(json.items);
  };

  return (
    <div className="w-full flex flex-col items-center my-12">
      {results?.length &&  
        results.map((video) => (
          <Link to={'/watch?v=' + video.id.videoId} key={video.id.videoId} className="w-full flex justify-center">
          <VideoCard key={video?.id?.videoId} video={video} />
          </Link>
        ))}
    </div>
  );
};

export default Results;

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
        <h4 className="font-medium text-lg text-black">{title}</h4>
        <span>{timeAgo} </span>
        <span>{channelTitle}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};
