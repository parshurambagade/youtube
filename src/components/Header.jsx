import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell, FaUserCircle, FaYoutube} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/menuSlice";

const Header = () => {
  
  const dispatch = useDispatch();
  
  const toggleMenuClicked = () => {
    dispatch(toggleMenu());
  }

  return (
    <div className="flex shadow-lg lg:px-8 lg:py-4 lg:justify-between text-2xl" >

        <div className="flex w-max items-center gap-5">
            <span onClick={() => toggleMenuClicked()} className="cursor-pointer"><FiMenu /></span>
            <span className="flex items-center font-bold gap-2">
              <span className="text-3xl"><FaYoutube /></span>YouTube</span>
        </div>

        <div className="flex w-1/2 justify-center">
            <input type="text" name="search" placeholder="Search" className="border text-lg px-4 py-1 rounded-l-full border-slate-300 w-1/2"/>
            <button className="flex justify-center items-center border bg-gray-200 border-slate-300 rounded-r-full px-4 text-lg"><FiSearch /></button>
        </div>

        <div className="flex w-max items-center gap-4">
            <span><FaBell /></span>
            <span><FaUserCircle /></span>
        </div>
    </div>
  )
}

export default Header