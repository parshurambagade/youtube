import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell, FaUserCircle, FaYoutube} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/menuSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_AUTOCOMPLETE_API } from "../utils/constants";

const Header = () => {
  
  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    console.log(searchSuggestions);
    const timer = setTimeout(() => {
      fetchSearchSuggestions();
    }, 200)

    return ( () => clearTimeout(timer))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchText])
  
  const fetchSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_AUTOCOMPLETE_API + searchText);
    const json = await data.json();
    setSearchSuggestions(json[1]);
  }


  const dispatch = useDispatch();
  
  const toggleMenuClicked = () => {
    dispatch(toggleMenu());
  }

  const searchHandleChange = (e) => {
    setSearchText(e.target.value);
    // console.log(searchText);
  }


  return (
    <div className="w-full flex shadow-lg lg:px-8 lg:py-4 lg:justify-between text-2xl" >

        <div className="flex w-max items-center gap-5">
            <span onClick={() => toggleMenuClicked()} className="cursor-pointer"><FiMenu /></span>
            <span className="flex items-center font-bold gap-2">
              <span className="text-3xl"><FaYoutube /></span>YouTube</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex w-[60rem] justify-center">
            <input type="text" name="search" autoComplete="off" placeholder="Search" className="border text-lg px-4 py-1 rounded-l-full border-slate-300 w-1/2" onChange={searchHandleChange} value={searchText}/>
            <button className="flex justify-center items-center border bg-gray-200 border-slate-300 rounded-r-full px-4 text-lg"><FiSearch /></button>
          </div>
          
          <div className="w-1/2 relative shadow-xl">
            <ul className="w-[29.5rem] border border-gray-200 px-4 py-2 absolute rounded-xl -left-5 bg-white ">
              {searchSuggestions && searchSuggestions.map((suggestion, i) => {
                return (<li key={i} className="border-b border-gray-100 py-1 text-base">{suggestion}</li>)
              })}
            </ul>
          </div>
        </div>

        <div className="flex w-max items-center gap-4">
            <span><FaBell /></span>
            <span><FaUserCircle /></span>
        </div>
    </div>
  )
}

export default Header