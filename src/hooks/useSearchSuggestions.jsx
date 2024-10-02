import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_AUTOCOMPLETE_API } from "../data/constants";
import { cacheSuggestions } from "../redux/searchSlice";
import { useEffect } from "react";

const useSearchSuggestions = (searchText, setSearchSuggestions) => {
  const cachedSuggestions = useSelector((state) => state.search);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSearchSuggestions = async () => {
      try {
        const data = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            YOUTUBE_SEARCH_AUTOCOMPLETE_API + searchText
          )}`
        );
        const json = await data.json();
        setSearchSuggestions(JSON.parse(json.contents)[1]);
        dispatch(cacheSuggestions({ [searchText]: json[1] }));
      } catch (err) {
        console.error(err);
      }
    };

    const timer = setTimeout(() => {
      if (cachedSuggestions[searchText]) {
        setSearchSuggestions(cachedSuggestions[searchText]);
      } else {
        fetchSearchSuggestions();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchText, setSearchSuggestions, cachedSuggestions, dispatch]);
};

export default useSearchSuggestions;
