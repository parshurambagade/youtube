import { useEffect, useState } from "react";
import { FETCH_VIDEOS_BY_KEYWORD } from "../../data/constants";
import { Link, useSearchParams } from "react-router-dom";
import { formatTimeAgo } from "../../utils/helpers";
import ButtonsContainer from '../../components/ButtonsContainer';
import VideoCard from './VideoCard';

const Results = () => {
  const [results, setResults] = useState([]);

  let [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("search");

  useEffect(() => {
    getVideos();
  }, [q]);

  const getVideos = async () => {
    const data = await fetch(FETCH_VIDEOS_BY_KEYWORD + q);
    const json = await data.json();
    setResults(json.items);
  };

  return (
    <div className="w-full my-16">
      
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


