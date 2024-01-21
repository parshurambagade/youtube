import React, { useEffect, useState } from 'react'
import { FETCH_CHANNEL_DETAILS } from '../utils/constants';
import { formatCount } from '../utils/helpers';

const Channelnfo = ({channelId}) => {

    const [channelInfo, setChannelInfo] = useState(null);

    useEffect(() => {
        fetchChannelDetails();
    },[channelId]);

    const fetchChannelDetails = async () => {
        const data = await fetch(FETCH_CHANNEL_DETAILS + channelId);
        const json = await data.json();
        setChannelInfo(json.items[0]);
    }
  return (channelInfo &&
    <div className="flex gap-4 items-center">
    <img src={channelInfo?.snippet?.thumbnails?.medium?.url} className="rounded-full w-10 h-10"/>
    <div className="flex flex-col gap-0 leading-none">
      <span className="text-lg font-semibold">
        {channelInfo?.snippet?.title} 
      </span>
      <span className="text-gray-600 text-sm">
        {formatCount(channelInfo?.statistics?.subscriberCount)} subscribers
      </span>
    </div>
    </div> 
  );    
}

export default Channelnfo