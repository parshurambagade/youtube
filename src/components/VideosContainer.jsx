
import VideoCard from './VideoCard';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useVideos from '../hooks/useVideos';

const VideosContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const showMenu = useSelector(state => state.menu.showMenu);

  useVideos(category);
  
  const {videosList} = useSelector(state => state.videos);

  return (
      <div className='w-full  flex flex-col gap-1 lg:gap-4 md:flex-wrap md:flex-row justify-between'>
        {videosList && videosList.map(video => (
        <Link key={video.id} to={"/watch?v=" + video.id} className={`w-full  ${!showMenu ? "md:w-[48.8%] lg:w-[23.5%] xl:w-[18.5%]" : "md:w-[48%] lg:w-[32%] xl:w-[23%]"}  flex`}><VideoCard  video={video} /></Link>
        ))}
      </div>
  )
}

export default VideosContainer