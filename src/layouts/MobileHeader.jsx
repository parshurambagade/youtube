import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell, FaMicrophone, FaUserCircle, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleMobileMenu } from "../redux/menuSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_AUTOCOMPLETE_API } from "../data/constants";
import { cacheSuggestions } from "../redux/searchSlice";
import { IoClose,IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toggleMobileSearchbar } from "../redux/mobileSearchbarSlice";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { login, logout, setToken } from "../redux/userSlice";
import { app } from "../firebase";
import { MdLogout } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const MobileHeader = () => {
  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };
  

  const userState = useSelector((state) => state.user.user);
    const showMobileSearchbar = useSelector((state) => state.mobileSearchbar.showMobileSearchbar);
    
  const dispatch = useDispatch();
  const cachedSuggestions = useSelector((state) => state.search);
  const navigate = useNavigate();

  // console.log(cachedSuggestions);
  const auth = getAuth(app);

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
    setSearchText("")
  };

  const handleLoginClicked =  () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
    setShowLoginModal(false);

    signInWithPopup(auth, provider)
    .then((result) => {
      
  
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // console.log(credential);
  
      const token = credential.accessToken;
      
      const user = result.user;
      // console.log(user);
      if(userState){
        return;
      }else{
        dispatch(setToken(token));
        dispatch(login(user));
      }
     
  
  
  
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      // console.log(errorCode);
      const errorMessage = error.message;
      // console.log(errorMessage);
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(`Credential: ${credential}, Error: ${error}, Code: ${errorCode}, Message: ${errorMessage}`);
      // ...
    });
  }

  const handleLogoutClicked = () => {
    dispatch(logout());
  }

  return (
    showMobileSearchbar ? 
    <div className="flex flex-col items-center h-max   w-[100vw] py-2 text-xl px-3 "   >
        <div className={`flex w-full ${showMobileSearchbar ? "justify-between px-2" : "justify-evenly"} items-center`} >
            
            <span onClick={() => dispatch(toggleMobileSearchbar())}><IoArrowBack /></span>

            <form className="w-[70%]  flex justify-center " onSubmit={handleFormSubmit}>   
                <input type="text" name="search" autoComplete="off" placeholder="Search" className="border text-base md:w-full  px-4 py-2 rounded-l-full border-slate-300 border-r-0 focus:outline-none " onChange={searchHandleChange} value={searchText} onFocus={() => setShowSuggestions(true)}/>
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
    <div className="w-[100vw] box-border shadow-md  md:h-[6vh] fixed bg-white flex px-4 py-3 md:px-4 justify-between text-2xl items-center">

        {/* left container  */}
      <div className="flex w-[10%] md:w-[15%] lg:w-max items-center gap-3 lg:gap-5">
        <span onClick={() => toggleMenuClicked()} className="cursor-pointer">
          <FiMenu />
        </span>
        <Link to="/" className="text-4xl items-center font-bold gap-1 flex">
          <span className=" text-blue-500">
            <FaYoutube />
          </span>
          <span className="text-2xl">VideoX</span>
        </Link>
      </div>

      {/* right container  */}
      <div className="flex gap-4 text-2xl items-center">
        <span onClick={() => dispatch(toggleMobileSearchbar())}>
          <FiSearch />
        </span>
        <div>
              {userState ? 
              <div className="flex gap-4 items-center">
               <img src={userState.photoURL} alt={userState.displayName} className="w-8 h-8 rounded-full" />
                <span onClick={handleLogoutClicked} className="cursor-pointer"><MdLogout /></span>
              </div> : <button
        className="text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2  rounded"
        onClick={openLoginModal}
      >
        Login
      </button> }

      {showLoginModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="py-4 px-8">
                <div className="text-center pb-6">
                <Link to='/' className=" justify-center items-center font-bold gap-0 flex flex-col my-6 ">
              <span className="text-8xl text-blue-500"><FaYoutube /></span>
              {/* <span className="hidden md:flex">VideoX</span> */}
            </Link>
                  <h2 className="text-xl font-bold ">Sign In To Your Account</h2>
                  <div className="mt-3 text-center sm:mt-5 mb-4">
                    <button
                      onClick={closeLoginModal}
                      className="absolute top-2 right-2 p-2"
                    >
                      <svg
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <button
                      className="flex items-center justify-center mx-auto gap-4 text-sm lg:text-base border border-slate-300 bg-white hover:bg-slate-100 text-gray-800 font-bold py-2 px-4 rounded mt-5"
                      onClick={handleLoginClicked}
                    >
                      <span className="text-lg"><FcGoogle /></span>
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                  <div className="text-base">Continue without sign in? <span className="text-blue-700 cursor-pointer" onClick={() => setShowLoginModal(false)}>Explore</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
            </div>
      </div>

      
    </div>
  );
};

export default MobileHeader;
