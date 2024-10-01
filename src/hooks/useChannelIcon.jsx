import { useCallback, useEffect, useState } from "react";
import { FETCH_CHANNEL_ICON } from "../data/constants";

const useChannelIcon = (channelId) => {
  const [channelIcon, setChannelIcon] = useState("");

  const fetchChannelIcon = useCallback(async () => {
    try {
      const data = await fetch(FETCH_CHANNEL_ICON + channelId);
      const json = await data.json();

      const channelIcon = json?.items[0]?.snippet?.thumbnails?.medium?.url;
      setChannelIcon(channelIcon);
    } catch (err) {
      console.error(err);
    }
  }, [channelId]);

  useEffect(() => {
    channelId && fetchChannelIcon();
  }, [channelId, fetchChannelIcon]);

  return channelIcon;
};

export default useChannelIcon;
