import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";
import useVideosByKeyword from "../../hooks/useVideosByKeyword";

const Results = () => {
  const [results, setResults] = useState([]);

  let [searchParams] = useSearchParams();

  const q = searchParams.get("search");
  const showMobileMenu = useSelector((state) => state.menu.showMobileMenu);
  const showMobileSearchbar = useSelector(
    (state) => state.mobileSearchbar.showMobileSearchbar
  );

  useVideosByKeyword(q, setResults);

  return (
    <div
      className={`${
        showMobileMenu && "hidden"
      } w-full md:px-2 flex md:gap-2 flex-col ${
        showMobileSearchbar ? "my-0" : "my-12 md:my-20"
      }   lg:my-16`}
    >
      {results.length > 0 &&
        results.map((video) => (
          <Link
            to={"/watch?v=" + video.id.videoId}
            key={video.id.videoId}
            className="w-full flex justify-center"
          >
            <VideoCard key={video?.id?.videoId} video={video} />
          </Link>
        ))}
    </div>
  );
};

export default Results;
