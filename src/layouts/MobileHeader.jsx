import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell, FaMicrophone, FaUserCircle, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleMobileMenu } from "../redux/menuSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_AUTOCOMPLETE_API } from "../data/constants";
import { cacheSuggestions } from "../redux/searchSlice";
import { IoClose,IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toggleMobileSearchbar } from "../redux/mobileSearchbarSlice";

const MobileHeader = () => {
  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

    const showMobileSearchbar = useSelector((state) => state.mobileSearchbar.showMobileSearchbar);
    
  const dispatch = useDispatch();
  const cachedSuggestions = useSelector((state) => state.search);
  const navigate = useNavigate();

  // console.log(cachedSuggestions);

  useEffect(() => {
    // console.log(searchSuggestions);
    const timer = setTimeout(() => {
      if (cachedSuggestions[searchText]) {
        setSearchSuggestions(cachedSuggestions[searchText]);
      } else {
        fetchSearchSuggestions();
      }
    }, 200);
    console.log("mobilesearchbar:" + showMobileSearchbar)
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const fetchSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_AUTOCOMPLETE_API + searchText);
    const json = await data.json();
    setSearchSuggestions(json[1]);
    dispatch(cacheSuggestions({ [searchText]: json[1] }));
  };

  const toggleMenuClicked = () => {
    dispatch(toggleMobileMenu());
  };

  const searchHandleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSuggestionClick = (selectedSuggestion) => {
    setSearchText(selectedSuggestion);
    setShowSuggestions(false);
    handleFormSubmit();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?search=${searchText}`);
  };

  return (
    showMobileSearchbar ? 
    <div className="flex flex-col items-center h-max   w-[100vw] py-2 md:py-4 "   >
        <div className="flex w-full justify-evenly items-center" >
            
            <span onClick={() => dispatch(toggleMobileSearchbar())}><IoArrowBack /></span>

            <form className="w-[70%]  flex justify-center " onSubmit={handleFormSubmit}>   
                <input type="text" name="search" autoComplete="off" placeholder="Search" className="border text-sm md:w-full  px-4 py-1 rounded-l-full border-slate-300 border-r-0 focus:outline-none " onChange={searchHandleChange} value={searchText} onFocus={() => setShowSuggestions(true)}/>
                {searchText && 
                <span className="border border-l-0 px-1 flex items-center text-lg py-1 cursor-pointer text-gray-700 " onClick={() => setSearchText("")}><IoClose /></span>}
                <button className="border  bg-gray-200 border-slate-300 rounded-r-full px-2  text-base py-1"><FiSearch /></button>
            </form>

            <span><FaMicrophone /></span>
       </div>
       
       {showSuggestions && 
       <div className="mt-2 w-full  shadow-md ">
            <ul className={!searchSuggestions.length ? "border-none bg-transparent" : "w-full px-2 py-2 border border-gray-200 bg-white "}>
                {searchSuggestions && searchSuggestions.map((suggestion, i) => {
                return (
                <li onClick={() => handleSuggestionClick(suggestion)} key={i} className="border-b cursor-pointer border-gray-100 py-1 text-base flex  items-center  gap-4"><FiSearch /> {suggestion}</li>)})}
            </ul>
       </div>
       }
     </div>
    : 
    <div className="w-[100vw] box-border shadow-md h-[7vh] md:h-[6vh] fixed bg-white flex px-2 py-2 md:px-4 justify-between text-2xl items-center">

        {/* left container  */}
      <div className="flex w-[10%] md:w-[15%] lg:w-max items-center gap-3 lg:gap-5">
        <span onClick={() => toggleMenuClicked()} className="cursor-pointer">
          <FiMenu />
        </span>
        <span className="text-2xl items-center font-bold gap-1 flex">
          <span className=" text-red-500">
            <FaYoutube />
          </span>
          <span className="text-xl">YouTube</span>
        </span>
      </div>

      {/* right container  */}
      <div className="flex gap-4 text-xl">
        <span onClick={() => dispatch(toggleMobileSearchbar())}>
          <FiSearch />
        </span>
        <span>
          <FaUserCircle />
        </span>
      </div>

      
    </div>
  );
};

export default MobileHeader;
