
import { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { YOUTUBE_VIDEOS_API, FETCH_POPULAR_VIDEOS_BY_CATEGORY_ID } from '../data/constants';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const VideosContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [videosList, setVideosList] = useState([]);
  const showMenu = useSelector(state => state.menu.showMenu);
  console.log(showMenu)

    useEffect(() => {
        getVideos();
    }, [category])

    

    const getVideos = async () => {
        const data = await fetch(category ? FETCH_POPULAR_VIDEOS_BY_CATEGORY_ID + category : YOUTUBE_VIDEOS_API);
        const json = await data.json();
        setVideosList(json.items);
        // console.log(json.items)
    } 
    
  return (
      <div className='w-full  flex flex-col gap-1 lg:gap-4 md:flex-wrap md:flex-row justify-between'>
        {videosList && videosList.map(video => (
        <Link key={video.id} to={"/watch?v=" + video.id} className={`w-full  ${!showMenu ? "md:w-[48.8%] lg:w-[23.5%] xl:w-[18.5%]" : "md:w-[48%] lg:w-[32%] xl:w-[23%]"}  flex`}><VideoCard  video={video} /></Link>
        ))}
      </div>
  )
}

export default VideosContainer