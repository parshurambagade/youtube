import { FaHistory, FaHome, FaMusic } from "react-icons/fa";
import { SiYoutubeshorts, SiYoutubemusic, SiYoutubegaming } from "react-icons/si";
import { MdMusicNote, MdSubscriptions, MdWatchLater } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { BiSolidUserRectangle, BiSolidVideos } from "react-icons/bi";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { IoMdMusicalNote } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import { RiLiveFill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { hideMenu, hideMobileMenu } from "../redux/menuSlice";

const MobileMenu = () => {
  // const showMenu = useSelector((state) => state.menu.showMenu);
  const showMobileMenu = useSelector(state => state.menu.showMobileMenu);
  const showMobileSearchbar = useSelector(state => state.mobileSearchbar.showMobileSearchbar);
  // console.log(showMobileSearchbar)
    const dispatch = useDispatch();

    // TODO: Remove text in the mobile menu, keep only icons;
    // TODO: Adjust the size of mobile menu;
    
  return !showMobileMenu ? "" : (
    <div className={`${(!showMobileMenu) && "hidden"}   mt-16  mb-4x md:pl-12 text-center md:text-left w-[100vw] h-max  max-h-screen overflow-hidden bg-white flex flex-col gap-4 p-4 md:my-20 text-lg`}>

        <div className="border-b py-6 flex flex-col gap-6 mx-auto w-1/2">
        <div className="flex gap-2 items-center">
          <Link to="/" className="flex gap-6 items-center" onClick={() => dispatch(hideMobileMenu())}><FaHome /> Home</Link></div>
        <div className="flex gap-6 items-center "><SiYoutubeshorts />Shorts</div>
        <div className="flex gap-6 items-center"><MdSubscriptions />Subscriptions</div>
        <div className="flex gap-6 items-center"><SiYoutubemusic />VideoX Music</div>
        </div>

        <div className="border-b py-6 flex flex-col gap-6 mx-auto w-1/2">
        <div className="flex gap-6 items-center"><BiSolidUserRectangle /> Your channel</div>
        <div className="flex gap-6 items-center"><FaHistory />History</div>
        <div className="flex gap-6 items-center"><BiSolidVideos />Your videos</div>
        <div className="flex gap-6 items-center"><PiDownloadSimpleBold />Downloads</div>
        <div className="flex gap-6 items-center"><MdWatchLater />Watch later</div>
        </div>

        <div className="border-b py-6 flex flex-col gap-6 mx-auto w-1/2">
        <div className="flex gap-6 items-center"><BsFire /> Trending</div>
        <div className="flex gap-6 items-center"><GiShoppingBag />Shopping</div>
        <div className="flex gap-6 items-center"><FaMusic />Music</div>
        <div className="flex gap-6 items-center"><RiLiveFill />Live</div>
        <div className="flex gap-6 items-center"><SiYoutubegaming />Gaming</div>
        </div>


    </div>
  )
}

export default MobileMenu