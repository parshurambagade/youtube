import { useCallback, useEffect, useState } from "react";
import { FETCH_RELATED_VIDEOS } from "../data/constants";

const useRelatedVideos = (videoId) => {
  const [relatedVideos, setRelatedVideos] = useState([]);

  const fetchRelatedVideos = useCallback(async () => {
    try {
      const data = await fetch(`${FETCH_RELATED_VIDEOS + videoId}`);
      const json = await data.json();
      setRelatedVideos(json.videos);
    } catch (err) {
      console.error(err);
    }
  }, [videoId]);

  useEffect(() => {
    videoId && fetchRelatedVideos();
  }, [videoId, fetchRelatedVideos]);

  return relatedVideos;
};

export default useRelatedVideos;
