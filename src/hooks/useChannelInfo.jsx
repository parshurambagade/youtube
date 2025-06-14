import { useCallback, useEffect, useState } from "react";
import { FETCH_CHANNEL_DETAILS } from "../data/constants";

const useChannelInfo = (channelId) => {
    const [channelInfo, setChannelInfo] = useState(null);

    const fetchChannelDetails = useCallback(async () => {
        try{
          const data = await fetch(FETCH_CHANNEL_DETAILS + channelId);
          const json = await data.json();
          json.items!==undefined && setChannelInfo(json.items[0]);
        }catch(err){
          console.error(err);
        }
         
      },[channelId]);

    useEffect(() => {
        channelId && fetchChannelDetails();
    },[channelId, fetchChannelDetails]);

    return channelInfo;
}

export default useChannelInfo;