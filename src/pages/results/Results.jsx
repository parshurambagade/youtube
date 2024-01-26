import { useEffect, useState } from "react";
import { FETCH_VIDEOS_BY_KEYWORD } from "../../data/constants";
import { Link, useSearchParams } from "react-router-dom";
import VideoCard from './VideoCard';
import { useDispatch, useSelector } from "react-redux";
import { hideMobileMenu } from "../../redux/menuSlice";

const Results = () => {
  const [results, setResults] = useState([]);
  
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const q = searchParams.get("search");
  const showMobileMenu = useSelector(state => state.menu.showMobileMenu);
  const showMobileSearchbar = useSelector((state) => state.mobileSearchbar.showMobileSearchbar);
  useEffect(() => {
    getVideos();
    dispatch(hideMobileMenu()); 
  }, [q]);

  const getVideos = async () => {
    const data = await fetch(FETCH_VIDEOS_BY_KEYWORD + q);
    const json = await data.json();
    setResults(json.items);
  };

  return (
    <div className={`${showMobileMenu && "hidden"} w-full md:px-2 flex md:gap-2 flex-col ${showMobileSearchbar ? "my-0" : "my-12 md:my-20"}   lg:my-16`}>
      
      {results.length > 0 &&  
        results.map((video) => (
          <Link to={'/watch?v=' + video.id.videoId} key={video.id.videoId} className="w-full flex justify-center">
          <VideoCard key={video?.id?.videoId} video={video} />
          </Link>
        ))}
    </div>
  );
};

export default Results;


