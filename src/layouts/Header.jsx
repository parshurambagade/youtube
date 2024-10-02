import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/menuSlice";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { login, logout, setToken } from "../redux/userSlice";
import { app } from "../firebase";
import { MdLogout } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import useSearchSuggestions from "../hooks/useSearchSuggestions";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const userState = useSelector((state) => state.user.user);

  const [searchText, setSearchText] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // console.log(cachedSuggestions);

  const auth = getAuth(app);

  useSearchSuggestions(searchText, setSearchSuggestions);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in:", user.email);

        // Extract only serializable fields from the user object
        const serializedUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };

        // Get token from user or localStorage
        const token = user.accessToken || localStorage.getItem("token");

        // Dispatch serializable user data and token to Redux
        dispatch(login(serializedUser)); // Dispatch only serializable data
        dispatch(setToken(token));

        // Save to localStorage for persistence
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(serializedUser)); // Only serializable data
      } else {
        console.log("User is not logged in");

        // Clear Redux state and localStorage
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    });

    // Clean up the subscription when component unmounts
    return () => unsubscribe();
  }, [auth, dispatch]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      // Restore user from localStorage
      dispatch(setToken(savedToken));
      dispatch(login(JSON.parse(savedUser))); // Parse user back to object
    }
  }, [dispatch]);

  const handleLoginClicked = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
    // console.log("login clicked");
    setShowLoginModal(false);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log(credential);

        const token = credential.accessToken;

        const user = result.user;

        if (userState) {
          return;
        } else {
          // Only save serializable data
          const serializedUser = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          };

          dispatch(setToken(token)); // Save token if needed
          dispatch(login(serializedUser)); // Save serializable user data

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(serializedUser));
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // console.log(errorCode);
        const errorMessage = error.message;
        // console.log(errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          `Credential: ${credential}, Error: ${error}, Code: ${errorCode}, Message: ${errorMessage}`
        );
        // ...
      });
  };

  const toggleMenuClicked = () => {
    dispatch(toggleMenu());
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
    setSearchText("");
  };

  const handleLogoutClicked = () => {
    signOut(auth);
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className=" w-[100vw] box-border  h-[6vh] fixed bg-white lg:flex px-2 py-2 md:px-4 lg:px-8 lg:py-8 border-b justify-between text-2xl items-center">
      <div className="flex w-[10%] md:w-[15%] lg:w-max items-center gap-3 lg:gap-5">
        <span onClick={() => toggleMenuClicked()} className="cursor-pointer">
          <FiMenu />
        </span>
        <Link to="/" className="items-center font-bold gap-1 flex">
          <span className="text-3xl text-blue-500">
            <FaYoutube />
          </span>
          <span className="hidden md:flex">VTube</span>
        </Link>
      </div>

      <div className="flex w-[75%] py-0 sm:w-[80%] md:w-[70%] lg:w-[50%]  flex-col justify-center items-center md:items-end lg:items-center">
        <form
          className="flex w-full justify-center"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search"
            className="border text-sm sm:text-base lg:text-lg px-4 py-1 rounded-l-full border-slate-300 border-r-0 w-full md:w-3/4 focus:outline-none "
            onChange={searchHandleChange}
            value={searchText}
            onFocus={() => setShowSuggestions(true)}
          />
          {searchText && (
            <span
              className="border border-l-0 px-2 flex items-center text-lg py-1 cursor-pointer text-gray-700 "
              onClick={() => setSearchText("")}
            >
              <IoClose />
            </span>
          )}
          <button className="border bg-gray-200 border-slate-300 rounded-r-full px-4  text-lg">
            <FiSearch />
          </button>
        </form>

        {showSuggestions && (
          <div className=" w-3/4 lg:relative shadow-xl ">
            <ul
              className={
                !searchSuggestions.length
                  ? "border-none bg-transparent"
                  : "w-full px-4 py-2 absolute border border-gray-200 -left-5 bg-white rounded-xl"
              }
            >
              {searchSuggestions &&
                searchSuggestions.map((suggestion, i) => {
                  return (
                    <li
                      onClick={() => handleSuggestionClick(suggestion)}
                      key={i}
                      className="border-b cursor-pointer border-gray-100 py-1 text-base flex  items-center  gap-4"
                    >
                      <FiSearch /> {suggestion}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>

      <div className="hidden sm:flex w-[5%] lg:w-max gap-0 items-center justify-end lg:gap-4">
        <span className="hidden lg:flex">
          <FaBell />
        </span>
        <div>
          {userState ? (
            <div className="flex gap-4 items-center">
              <img
                src={userState.photoURL}
                alt={userState.displayName}
                className="w-8 h-8 rounded-full"
              />
              <span onClick={handleLogoutClicked} className="cursor-pointer">
                <MdLogout />
              </span>
            </div>
          ) : (
            <button
              className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 lg:py-2 px-2 lg:px-4 rounded"
              onClick={openLoginModal}
            >
              Login
            </button>
          )}

          {showLoginModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen">
                <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  aria-hidden="true"
                ></div>

                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                  <div className="p-4">
                    <div className="text-center pb-8">
                      <Link
                        to="/"
                        className=" justify-center items-center font-bold gap-0 flex flex-col my-6 "
                      >
                        <span className="text-8xl text-blue-500">
                          <FaYoutube />
                        </span>
                        {/* <span className="hidden md:flex">VideoX</span> */}
                      </Link>
                      <h2 className="text-xl font-bold ">
                        Sign In To Your Account
                      </h2>
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
                          className="flex items-center justify-center mx-auto gap-4 text-sm lg:text-base border border-slate-300 bg-white hover:bg-slate-100 text-gray-800 font-bold py-1 lg:py-2 px-2 lg:px-4 rounded mt-5"
                          onClick={handleLoginClicked}
                        >
                          <span className="text-lg">
                            <FcGoogle />
                          </span>
                          <span>Sign in with Google</span>
                        </button>
                      </div>
                      <div className="text-base">
                        Continue without sign in?{" "}
                        <span
                          className="text-blue-700 cursor-pointer"
                          onClick={() => setShowLoginModal(false)}
                        >
                          Explore
                        </span>
                      </div>
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

export default Header;
