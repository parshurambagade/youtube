import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { hideMenu } from '../utils/menuSlice';

const WatchVideo = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hideMenu());
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    console.log(videoId);
  return (
    <div>
        <iframe width="1100" height="600" src={"https://www.youtube.com/embed/" + videoId} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  )
}

export default WatchVideo