import React from 'react'
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const RelatedVideos = ({relatedVideos}) => {
    if(!relatedVideos || relatedVideos.length === 0) return;

  return (
    <div className='flex flex-col items-center w-full lg:w-[20vw]'>
        {relatedVideos.map(video => <Link to={"/watch?v=" + video.video_id} key={video.video_id}><VideoCard video={video}  /></Link>)}
    </div>
  )
}

export default RelatedVideos