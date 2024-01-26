import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell, FaUserCircle, FaYoutube} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/menuSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_AUTOCOMPLETE_API } from "../data/constants";
import { cacheSuggestions } from "../redux/searchSlice";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  
  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const cachedSuggestions = useSelector((state) => state.search);
  const navigate = useNavigate();

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
    //FIX CORS ERROR
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
  }

  const handleSuggestionClick = (selectedSuggestion) => {
    setSearchText(selectedSuggestion);
    setShowSuggestions(false)
    handleFormSubmit();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?search=${searchText}`);
    setSearchText("");

  }

  return (
    <div className=" w-[100vw] box-border  h-[6vh] fixed bg-white lg:flex px-2 py-2 md:px-4 lg:px-8 lg:py-3 justify-between text-2xl items-center" >

        <div className="flex w-[10%] md:w-[15%] lg:w-max items-center gap-3 lg:gap-5">
            <span onClick={() => toggleMenuClicked()} className="cursor-pointer"><FiMenu /></span>
            <Link to='/' className="items-center font-bold gap-1 flex">
              <span className="text-3xl text-red-500"><FaYoutube /></span>
              <span className="hidden md:flex">YouTube</span>
            </Link>
        </div>

        <div className="flex w-[75%] py-0 sm:w-[80%] md:w-[70%] lg:w-[50%]  flex-col justify-center items-center md:items-end lg:items-center"   >
          <form className="flex w-full justify-center" onSubmit={handleFormSubmit}>   
            <input type="text" name="search" autoComplete="off" placeholder="Search" className="border text-sm sm:text-base lg:text-lg px-4 py-1 rounded-l-full border-slate-300 border-r-0 w-full md:w-3/4 focus:outline-none " onChange={searchHandleChange} value={searchText} onFocus={() => setShowSuggestions(true)}/>
            {searchText && <span className="border border-l-0 px-2 flex items-center text-lg py-1 cursor-pointer text-gray-700 " onClick={() => setSearchText("")} ><IoClose /></span>}
            <button className="border bg-gray-200 border-slate-300 rounded-r-full px-4  text-lg"><FiSearch /></button>
          </form>
          
          {showSuggestions && <div className=" w-3/4 lg:relative shadow-xl ">
            <ul className={!searchSuggestions.length ? "border-none bg-transparent" : "w-full px-4 py-2 absolute border border-gray-200 -left-5 bg-white rounded-xl"}>
              {searchSuggestions && searchSuggestions.map((suggestion, i) => {
                return (<li onClick={() => handleSuggestionClick(suggestion)} key={i} className="border-b cursor-pointer border-gray-100 py-1 text-base flex  items-center  gap-4"><FiSearch /> {suggestion}</li>)
              })}
            </ul>
          </div>}
        </div>

        <div className="hidden sm:flex w-[5%] lg:w-max gap-0 items-center justify-end lg:gap-4">
            <span className="hidden lg:flex"><FaBell /></span>
            <span><FaUserCircle /></span>
        </div>
    </div>
  )
}

export default Header