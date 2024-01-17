
import { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import { Link } from 'react-router-dom';

const VideosContainer = () => {

    useEffect(() => {
        getVideos();
    }, [])

    const [videosList, setVideosList] = useState([]);


    const getVideos = async () => {
        const data = await fetch(YOUTUBE_VIDEOS_API);
        const json = await data.json();
        setVideosList(json.items);
        console.log(json.items)
    }
    
  return (
      <div className='w-full flex gap-4 flex-wrap justify-between'>
        {videosList.map(video => (
        <Link key={video.id} to={"/watch?v=" + video.id} className='w-[19%] flex'><VideoCard  video={video} /></Link>
        ))}
      </div>
  )
}

export default VideosContainer