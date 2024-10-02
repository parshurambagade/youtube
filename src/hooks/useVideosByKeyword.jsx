import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideMobileMenu } from "../redux/menuSlice";
import { FETCH_VIDEOS_BY_KEYWORD } from "../data/constants";

const useVideosByKeyword = (q, setResults) => {
  const dispatch = useDispatch();

  const getVideos = useCallback(async () => {
    try {
      const data = await fetch(FETCH_VIDEOS_BY_KEYWORD + q);
      const json = await data.json();
      setResults(json.items);
    } catch (err) {
      console.error(err);
    }
  }, [q, setResults]);

  useEffect(() => {
    q && getVideos();
    dispatch(hideMobileMenu());
  }, [q, dispatch, getVideos]);
};

export default useVideosByKeyword;
