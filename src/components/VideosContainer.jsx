
import { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { YOUTUBE_VIDEOS_API, FETCH_POPULAR_VIDEOS_BY_CATEGORY_ID } from '../utils/constants';
import { Link, useSearchParams } from 'react-router-dom';

const VideosContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [videosList, setVideosList] = useState([]);
  console.log(category);

    useEffect(() => {
        getVideos();
    }, [category])

    

    const getVideos = async () => {
        const data = await fetch(category ? FETCH_POPULAR_VIDEOS_BY_CATEGORY_ID + category : YOUTUBE_VIDEOS_API);
        const json = await data.json();
        setVideosList(json.items);
        console.log(json.items)
    } 
    
  return (
      <div className='w-full flex gap-4 flex-wrap justify-between'>
        {videosList && videosList.map(video => (
        <Link key={video.id} to={"/watch?v=" + video.id} className='w-[19%] flex'><VideoCard  video={video} /></Link>
        ))}
      </div>
  )
}

export default VideosContainer