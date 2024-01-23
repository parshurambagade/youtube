import { FaHistory, FaHome, FaMusic } from "react-icons/fa";
import { SiYoutubeshorts, SiYoutubemusic, SiYoutubegaming } from "react-icons/si";
import { MdMusicNote, MdSubscriptions, MdWatchLater } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { BiSolidUserRectangle, BiSolidVideos } from "react-icons/bi";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { IoMdMusicalNote } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import { RiLiveFill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
const Sidebar = () => {
  const showMenu = useSelector((state) => state.menu.showMenu);

  

  return !showMenu ? "" : (
    <div className="pl-8 my-12  md:pl-4 text-center md:text-left w-full md:w-1/4 lg:w-[30%] xl:w-[15%] h-full bg-white flex flex-col gap-4 p-4 md:my-16  ">

        <div className="border-b pb-4 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Link to="/" className="flex gap-2 items-center"><FaHome /> Home</Link></div>
        <div className="flex gap-2 items-center"><SiYoutubeshorts />Shorts</div>
        <div className="flex gap-2 items-center"><MdSubscriptions />Subscriptions</div>
        <div className="flex gap-2 items-center"><SiYoutubemusic />MyTube Music</div>
        </div>

        <div className="border-b pb-4 flex flex-col gap-4">
        <div className="flex gap-2 items-center"><BiSolidUserRectangle /> Your channel</div>
        <div className="flex gap-2 items-center"><FaHistory />History</div>
        <div className="flex gap-2 items-center"><BiSolidVideos />Your videos</div>
        <div className="flex gap-2 items-center"><PiDownloadSimpleBold />Downloads</div>
        <div className="flex gap-2 items-center"><MdWatchLater />Watch later</div>
        </div>

        <div className="border-b pb-4 flex flex-col gap-4">
        <div className="flex gap-2 items-center"><BsFire /> Trending</div>
        <div className="flex gap-2 items-center"><GiShoppingBag />Shopping</div>
        <div className="flex gap-2 items-center"><FaMusic />Music</div>
        <div className="flex gap-2 items-center"><RiLiveFill />Live</div>
        <div className="flex gap-2 items-center"><SiYoutubegaming />Gaming</div>
        </div>


    </div>
  )
}

export default Sidebar