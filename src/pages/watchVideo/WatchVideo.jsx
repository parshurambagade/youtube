import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { hideMenu } from "../../redux/menuSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChatContainer from "./LiveChatContainer";
import { BiDislike, BiSolidLike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { formatCount, formatTimeAgo } from "../../utils/helpers";
import { LuDownload } from "react-icons/lu";
import { RiPlayListAddFill } from "react-icons/ri";
import VideoDescription from "./VideoDescription";
import Channelnfo from "./Channelnfo";
import { FETCH_RELATED_VIDEOS, FETCH_RELATED_VIDEOS_OPTIONS, FETCH_VIDEOS_DETAILS } from "../../data/constants";
import { MdCircle } from "react-icons/md";
import { hideMobileSearchbar } from "../../redux/mobileSearchbarSlice";
import RelatedVideos from "./RelatedVideos";

// TODO: display the relatedvideos container in small devices 

const WatchVideo = () => {
  const [video, setVideo] = useState({});
  const [showMobileLiveChat, setShowMobileLiveChat] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);  
  const showMobileSearchbar = useSelector(state => state.mobileSearchbar.showMobileSearchbar); 
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.menu.showMenu);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    dispatch(hideMenu());
    dispatch(hideMobileSearchbar());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const videoData = await fetch(FETCH_VIDEOS_DETAILS + videoId);
        const videoJson = await videoData.json();
        setVideo(videoJson?.items[0]);
      console.log(relatedVideos)
  
      }catch(err){
        console.log(err);
      }
      
    };
    fetchData();
  }, [videoId]);

  useEffect(() => {
    
    const fetchRelatedVideos = async () => {
      try{
      const data = await fetch(
        FETCH_RELATED_VIDEOS.concat(videoId), FETCH_RELATED_VIDEOS_OPTIONS
      );
      const json = await data.json();
      console.log(json.videos)
      setRelatedVideos(json.videos);
      
      }catch(err){
        console.log(err);
      }
    }

    fetchRelatedVideos();

  },[videoId])
  
  

  
  return (
    <div
      className={`flex w-full mb-0  lg:w-[85%] lg:ml-12 overflow-hidden justify-center ${showMobileSearchbar ? "my-0 md:my-0" : "my-12 md:my-16"} `}
    >
      <div
        className={`w-full  flex flex-col lg:flex-row ${
          showMenu ? "justify-start" : "justify-center"
        }`}
      >
        {/* video frame */}
        <div
          className={`w-[100vw]  lg:${
            showMenu ? "w-[80%]" : "w-[80%]"
          } flex flex-col items-center`}
        >
          <iframe
            src={"https://www.youtube.com/embed/" + videoId}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full h-[34vh] md:h-[40vh] lg:h-[600px]"
            allowFullScreen
          ></iframe>

          {/* live chat in mobile view*/}
          <div className={`flex flex-col md:w-full ${showMobileLiveChat ? "h-[58vh] md:h-[52vh]" : "h-0"} mb-2 lg:hidden`}>
            {showMobileLiveChat && (
              <LiveChatContainer
                setShowMobileLiveChat={setShowMobileLiveChat}
              />
            )}
          </div>
          {/* video info */}
          <div
            className={`p-2 pt-0 w-full md:p-4 ${showMobileLiveChat && "hidden"}`}
          >
            <span className="font-bold text-lg md:text-[1.3rem]">
              {video?.snippet?.title}
            </span>

            {/* buttons  */}
            <div className="flex flex-col lg:flex-row  lg:px-0 justify-between w-full mt-2 lg:mt-4 mb-0 gap-3 lg:gap-0 lg:items-center ">
              {/* left side div  */}
              <div className="w-full lg:w-[35%] flex gap-2 md:gap-4 justify-between lg:justify-normal  py-0 items-center">
                {/* channel info */}
                <Channelnfo channelId={video?.snippet?.channelId} />
                {/* subscribe button  */}
                <button className="rounded-full bg-black text-white text-sm px-3 py-2">
                  Subscribe
                </button>
              </div>

              {/* right side div  */}
              <div className="videoButtonsContainer flex gap-2 md:justify-start md:gap-8 text-sm lg:text-base justify-between overflow-x-scroll mb-0 md:pb-0">
                {/* like/dislike  buttons*/}
                <div className=" flex px-1 lg:px-3 py-2  bg-gray-100 rounded-full items-center">
                  <span className="px-2    border-r mx-1 flex items-center gap-1 lg:px-3">
                    <BiSolidLike />
                    {formatCount(video?.statistics?.likeCount)}
                  </span>
                  <span className=" mx-1 px-1 lg:px-3">
                    <BiDislike />
                  </span>
                </div>

                {/* share button  */}
                <div className="flex gap-2 px-3 lg:px-4 py-1 bg-gray-100 rounded-full  items-center">
                  <PiShareFatLight /> Share
                </div>

                {/* download button  */}
                <div className="flex gap-2 px-3 lg:px-4 py-1 bg-gray-100 rounded-full items-center">
                  <LuDownload /> Download
                </div>

                {/* save button  */}
                <div className=" flex gap-2 px-3 lg:px-4 py-2 bg-gray-100 rounded-full  items-center">
                  <RiPlayListAddFill /> Save
                </div>
              </div>
            </div>
          </div>

          {/* description */}
          <div
            className={` px-1 md:px-4 w-full ${showMobileLiveChat && "hidden"}`}
          >
            <div className=" text-wrap whitespace-pre-line w-full   lg:w-full px-4 py-2 pb-4 border-gray-300 bg-gray-100 md:my-2 md:mt-0  overflow-x-auto rounded-lg">
              <div className="flex gap-2 md:gap-4 font-medium text-[.9rem] md:text-base mb-2 text-gray-800">
                <span>{formatCount(video?.statistics?.viewCount)} views</span>
                <span>{formatTimeAgo(video?.snippet?.publishedAt)}</span>
                <span
                  className="flex items-center gap-2 lg:hidden border text-[.8rem] ml-16 bg-slate-100 px-2 py-1 rounded-xl w-max"
                  onClick={() => {
                    setShowMobileLiveChat(true);
                  }}
                >
                  <span className="text-red-600"><MdCircle /></span> 
                  <span>Live chat</span>
                </span>
              </div>
              {video?.snippet?.description && (
                <VideoDescription description={video?.snippet?.description} />
              )}
            </div>
          </div>
          {/* comments*/}
          <div
            className={`px-2 md:px-4 w-full lg:w-full ${
              showMobileLiveChat && "hidden"
            }`}
          >
            {videoId && <CommentsContainer videoId={videoId} />}
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:items-center">
          <LiveChatContainer />
          <RelatedVideos relatedVideos={relatedVideos} />
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
