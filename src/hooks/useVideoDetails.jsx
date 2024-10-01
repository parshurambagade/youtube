import { useCallback, useEffect, useState } from "react";
import { FETCH_VIDEOS_DETAILS } from "../data/constants";

const useVideoDetails = (videoId) => {
  const [video, setVideo] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const videoData = await fetch(FETCH_VIDEOS_DETAILS + videoId);
      const videoJson = await videoData.json();
      setVideo(videoJson?.items[0]);
    } catch (err) {
      console.error(err);
    }
  }, [videoId]);

  useEffect(() => {
    videoId && fetchData();
  }, [videoId, fetchData]);

  return video;
};

export default useVideoDetails;
