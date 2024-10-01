import { useCallback, useEffect, useState } from "react";
import { FETCH_VIDEO_COMMENTS } from "../data/constants";

const useComments = (videoId) => {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const data = await fetch(FETCH_VIDEO_COMMENTS + videoId);
      const json = await data.json();
      setComments(json.items);
    } catch (err) {
      console.error(err);
    }
  }, [videoId]);

  useEffect(() => {
    videoId && fetchComments();
  }, [videoId, fetchComments]);

  return comments;
};

export default useComments;
