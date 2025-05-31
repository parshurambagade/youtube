import { FaHistory, FaHome, FaMusic } from "react-icons/fa";
import { SiYoutubeshorts, SiYoutubemusic, SiYoutubegaming } from "react-icons/si";
import { MdSubscriptions, MdWatchLater } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { BiSolidUserRectangle, BiSolidVideos } from "react-icons/bi";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { BsFire } from "react-icons/bs";
import { RiLiveFill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { hideMobileMenu } from "../redux/menuSlice";

const MobileMenu = () => {
  // const showMenu = useSelector((state) => state.menu.showMenu);
  const showMobileMenu = useSelector(state => state.menu.showMobileMenu);
  // const showMobileSearchbar = useSelector(state => state.mobileSearchbar.showMobileSearchbar);
  // console.log(showMobileSearchbar)
    const dispatch = useDispatch();

    // TODO: Remove text in the mobile menu, keep only icons;
    // TODO: Adjust the size of mobile menu;
    
  return !showMobileMenu ? "" : (
    <nav className={`${(!showMobileMenu) && "hidden"}   mt-16  mb-4x md:pl-12 text-center md:text-left w-[100vw] h-max  max-h-screen overflow-hidden bg-white flex flex-col gap-4 p-4 md:my-20 text-lg`}>

        <ul className="border-b py-6 flex flex-col gap-6 mx-auto w-1/2">
        <li className="flex gap-2 items-center">
          <Link to="/" className="flex gap-6 items-center" onClick={() => dispatch(hideMobileMenu())}><FaHome /> Home</Link></li>
        <li className="flex gap-6 items-center "><SiYoutubeshorts />Shorts</li>
        <li className="flex gap-6 items-center"><MdSubscriptions />Subscriptions</li>
        <li className="flex gap-6 items-center"><SiYoutubemusic />VideoX Music</li>
        </ul>

        <ul className="border-b py-6 flex flex-col gap-6 mx-auto w-1/2">
        <li className="flex gap-6 items-center"><BiSolidUserRectangle /> Your channel</li>
        <li className="flex gap-6 items-center"><FaHistory />History</li>
        <li className="flex gap-6 items-center"><BiSolidVideos />Your videos</li>
        <li className="flex gap-6 items-center"><PiDownloadSimpleBold />Downloads</li>
        <li className="flex gap-6 items-center"><MdWatchLater />Watch later</li>
        </ul>

        <ul className="border-b py-6 flex flex-col gap-6 mx-auto w-1/2">
        <li className="flex gap-6 items-center"><BsFire /> Trending</li>
        <li className="flex gap-6 items-center"><GiShoppingBag />Shopping</li>
        <li className="flex gap-6 items-center"><FaMusic />Music</li>
        <li className="flex gap-6 items-center"><RiLiveFill />Live</li>
        <li className="flex gap-6 items-center"><SiYoutubegaming />Gaming</li>
        </ul>

    </nav>
  )
}

export default MobileMenu