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
import { FETCH_VIDEOS_DETAILS } from "../../data/constants";

const WatchVideo = () => {
  const [video, setVideo] = useState({});

  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.menu.showMenu);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    dispatch(hideMenu());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const videoData = await fetch(FETCH_VIDEOS_DETAILS + videoId);
      const videoJson = await videoData.json();
      setVideo(videoJson?.items[0]);
    };
    fetchData();
  }, [videoId]);

  return (
    <div className="flex w-full lg:w-[85%] lg:ml-12 overflow-hidden justify-center my-16">
      <div className={`w-full flex flex-col lg:flex-row ${showMenu ? "justify-start" : "justify-center"}`}
      > 
        {/* video frame */}
        <div className="w-full lg:w-[70%] flex flex-col">
          <iframe
            src={"https://www.youtube.com/embed/" + videoId}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full h-[35vh] lg:h-[600px]"
            allowFullScreen
          ></iframe>
          {/* video info */}
          <div className="p-2 lg:py-4">
            <span className="font-bold text-lg lg:text-[1.3rem]">
              {video?.snippet?.title}
            </span>

            {/* buttons  */}
            <div className="flex flex-col lg:flex-row  lg:px-0 justify-between w-full mt-4 mb-0 gap-4 lg:gap-0 lg:items-center">
              {/* left side div  */}
              <div className="flex gap-4 justify-between lg:justify-normal  py-0 items-center">
                {/* channel info */}
                <Channelnfo channelId={video?.snippet?.channelId} />
                {/* subscribe button  */}
                <button className="rounded-full bg-black text-white text-sm px-3 py-2">
                  Subscribe
                </button>
              </div>

              {/* right side div  */}
              <div className="videoButtonsContainer flex gap-4 text-sm lg:text-base justify-between overflow-x-scroll mb-0 ">
                {/* like/dislike  buttons*/}
                <div className=" flex px-2 lg:px-3 py-2  bg-gray-100 rounded-full items-center">
                  <span className="px-2 border-r mx-1 flex items-center gap-1 lg:px-3">
                    <BiSolidLike />
                    {formatCount(video?.statistics?.likeCount)}
                  </span>
                  <span className="px-2 mx-1 lg:px-3">
                    <BiDislike />
                  </span>
                </div>

                {/* share button  */}
                <div className="px-2 flex gap-2 lg:px-4 py-1 bg-gray-100 rounded-full  items-center">
                  <PiShareFatLight /> Share
                </div>

                {/* download button  */}
                <div className="px-2 flex gap-2 lg:px-4 py-1 bg-gray-100 rounded-full items-center">
                  <LuDownload /> Download
                </div>

                {/* save button  */}
                <div className="px-2 flex gap-2 lg:px-4 py-2 bg-gray-100 rounded-full  items-center">
                  <RiPlayListAddFill /> Save
                </div>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="whitespace-pre-line w-full px-4 py-2 pb-4 border-gray-300 bg-gray-100 my-2 overflow-x-hidden rounded-lg">
            <div className="flex gap-4 font-medium text-base mb-2 text-gray-800">
              <span>{formatCount(video?.statistics?.viewCount)} views</span>
              <span>{formatTimeAgo(video?.snippet?.publishedAt)}</span>
            </div>
            {video?.snippet?.description && (
              <VideoDescription description={video?.snippet?.description} />
            )}
          </div>
          {/* comments*/}
          <div className="w-full lg:w-[1100px]">
            {videoId && <CommentsContainer videoId={videoId} />}
          </div>
        </div>

        <div className=" ">
          <LiveChatContainer />
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
