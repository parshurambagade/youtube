import { FaHistory, FaHome, FaMusic } from "react-icons/fa";
import { SiYoutubeshorts, SiYoutubemusic, SiYoutubegaming } from "react-icons/si";
import { MdSubscriptions, MdWatchLater } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { BiSolidUserRectangle, BiSolidVideos } from "react-icons/bi";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { BsFire } from "react-icons/bs";
import { RiLiveFill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
const Sidebar = () => {
  const showMenu = useSelector((state) => state.menu.showMenu);

  

  return !showMenu ? "" : (
    <aside className="transition-all duration-300  pl-8 my-12  md:pl-8 text-center md:text-left w-full lg:w-[15vw] bg-white lg:flex flex-col gap-4 shadow-md p-4 md:my-20 ">

        <ul className="border-b pb-4 flex flex-col gap-4">
        <li className="flex gap-2 items-center">
          <Link to="/" className="flex gap-2 items-center"><FaHome /> Home</Link>
          </li>
        <li className="flex gap-2 items-center"><SiYoutubeshorts />Shorts</li>
        <li className="flex gap-2 items-center"><MdSubscriptions />Subscriptions</li>
        <li className="flex gap-2 items-center"><SiYoutubemusic />VideoX Music</li>
        </ul>

        <ul className="border-b pb-4 flex flex-col gap-4">
        <li className="flex gap-2 items-center"><BiSolidUserRectangle /> Your channel</li>
        <li className="flex gap-2 items-center"><FaHistory />History</li>
        <li className="flex gap-2 items-center"><BiSolidVideos />Your videos</li>
        <li className="flex gap-2 items-center"><PiDownloadSimpleBold />Downloads</li>
        <li className="flex gap-2 items-center"><MdWatchLater />Watch later</li>
        </ul>

        <ul className="border-b pb-4 flex flex-col gap-4">
        <li className="flex gap-2 items-center"><BsFire /> Trending</li>
        <li className="flex gap-2 items-center"><GiShoppingBag />Shopping</li>
        <li className="flex gap-2 items-center"><FaMusic />Music</li>
        <li className="flex gap-2 items-center"><RiLiveFill />Live</li>
        <li className="flex gap-2 items-center"><SiYoutubegaming />Gaming</li>
        </ul>


    </aside>
  )
}

export default Sidebar