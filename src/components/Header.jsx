import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell, FaUserCircle, FaYoutube} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/menuSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_AUTOCOMPLETE_API } from "../utils/constants";
import { cacheSuggestions } from "../utils/searchSlice";

const Header = () => {
  
  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const cachedSuggestions = useSelector((state) => state.search);

  // console.log(cachedSuggestions);

  useEffect(() => {
    // console.log(searchSuggestions);
    const timer = setTimeout(() => {

      if(cachedSuggestions[searchText]){ 
        setSearchSuggestions(cachedSuggestions[searchText])
      }else{
      fetchSearchSuggestions();

      }
      
    }, 200)

    return ( () => clearTimeout(timer))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchText])
  
  const fetchSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_AUTOCOMPLETE_API + searchText);
    const json = await data.json();
    setSearchSuggestions(json[1]);
    dispatch(cacheSuggestions({[searchText]: json[1]}));
  }



  
  const toggleMenuClicked = () => {
    dispatch(toggleMenu());
  }

  const searchHandleChange = (e) => {
    
    setSearchText(e.target.value);
    // console.log(searchText);
  }


  return (
    <div className="w-full  bg-white flex shadow-lg lg:px-8 lg:py-4 lg:justify-between text-2xl" >

        <div className="flex w-max items-center gap-5">
            <span onClick={() => toggleMenuClicked()} className="cursor-pointer"><FiMenu /></span>
            <span className="flex items-center font-bold gap-1">
              <span className="text-3xl text-red-500"><FaYoutube /></span>YouTube</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex w-[60rem] justify-center">
            <input type="text" name="search" autoComplete="off" placeholder="Search" className="border text-lg px-4 py-1 rounded-l-full border-slate-300 w-1/2" onChange={searchHandleChange} value={searchText} onFocus={() => setShowSuggestions(true)} onBlur={() => setShowSuggestions(false)}/>
            <button className="flex justify-center items-center border bg-gray-200 border-slate-300 rounded-r-full px-4 text-lg"><FiSearch /></button>
          </div>
          
          {showSuggestions && <div className="w-[30rem] relative shadow-xl ">
            <ul className={!searchSuggestions.length ? "border-none bg-transparent" : "w-[29.5rem] px-4 py-2 absolute border border-gray-200 -left-5 bg-white rounded-xl"}>
              {searchSuggestions && searchSuggestions.map((suggestion, i) => {
                return (<li key={i} className="border-b border-gray-100 py-1 text-base flex  items-center  gap-4"><FiSearch /> {suggestion}</li>)
              })}
            </ul>
          </div>}
        </div>

        <div className="flex w-max items-center gap-4">
            <span><FaBell /></span>
            <span><FaUserCircle /></span>
        </div>
    </div>
  )
}

export default Header