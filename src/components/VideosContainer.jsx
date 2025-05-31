
import VideoCard from './VideoCard';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useVideos from '../hooks/useVideos';

const VideosContainer = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useVideos(category);
  
  const {videosList} = useSelector(state => state.videos);

  return (
      <section aria-label="Videos list" className={`w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 lg:gap-2 justify-between `}>
        {videosList && videosList.map(video => (
        <Link key={video.id} to={"/watch?v=" + video.id}><VideoCard  video={video} /></Link>
        ))}
      </section>
  )
}

export default VideosContainer