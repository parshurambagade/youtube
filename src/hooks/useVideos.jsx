import { useCallback, useEffect } from "react";
import {
  FETCH_POPULAR_VIDEOS_BY_CATEGORY_ID,
  YOUTUBE_VIDEOS_API,
} from "../data/constants";
import { useDispatch } from "react-redux";
import { addVideos } from "../redux/videoSlice";

const useVideos = (category) => {
  const dispatch = useDispatch();

  const getVideos = useCallback(async () => {
    try {
      const data = await fetch(
        category
          ? FETCH_POPULAR_VIDEOS_BY_CATEGORY_ID + category
          : YOUTUBE_VIDEOS_API
      );
      const json = await data.json();
      dispatch(addVideos(json.items));
    } catch (err) {
      console.error(err);
    }
  }, [category, dispatch]);

  useEffect(() => {
    getVideos(category);
  }, [category, dispatch, getVideos]);
};

export default useVideos;
