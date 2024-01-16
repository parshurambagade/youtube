import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts, SiYoutubemusic } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const showMenu = useSelector((state) => state.menu.showMenu);

  

  return !showMenu ? "" : (
    <div className="w-[15%]  bg-white flex flex-col gap-4 p-4 shadow-lg border border-slate-200 ">

        <div className="border-b pb-4 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Link to="/" className="flex gap-2 items-center"><FaHome /> Home</Link></div>
        <div className="flex gap-2 items-center"><SiYoutubeshorts />Shorts</div>
        <div className="flex gap-2 items-center"><MdSubscriptions />Subscriptions</div>
        <div className="flex gap-2 items-center"><SiYoutubemusic />MyTube Music</div>
        </div>

        <div className="border-b pb-4 flex flex-col gap-4">
        <div className="flex gap-2 items-center"><FaHome /> Home</div>
        <div className="flex gap-2 items-center"><SiYoutubeshorts />Shorts</div>
        <div className="flex gap-2 items-center"><MdSubscriptions />Subscriptions</div>
        <div className="flex gap-2 items-center"><SiYoutubemusic />MyTube Music</div>
        </div>

        <div className="border-b pb-4 flex flex-col gap-4">
        <div className="flex gap-2 items-center"><FaHome /> Home</div>
        <div className="flex gap-2 items-center"><SiYoutubeshorts />Shorts</div>
        <div className="flex gap-2 items-center"><MdSubscriptions />Subscriptions</div>
        <div className="flex gap-2 items-center"><SiYoutubemusic />MyTube Music</div>
        </div>


    </div>
  )
}

export default Sidebar