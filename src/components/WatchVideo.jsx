import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { hideMenu } from "../utils/menuSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChatContainer from "./LiveChatContainer";
import { FETCH_CHANNEL_DETAILS, FETCH_VIDEOS_DETAILS, FETCH_VIDEO_COMMENTS } from "../utils/constants";
import { BiDislike, BiSolidLike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { formatCount, formatTimeAgo } from "../utils/helpers";
import { LuDownload } from "react-icons/lu";
import { RiPlayListAddFill } from "react-icons/ri";
import VideoDescription from "./VideoDescription";
import profilePic from "../assets/R.png"
import Channelnfo from './Channelnfo';

const WatchVideo = () => {
  const [video, setVideo] = useState({});  

  const dispatch = useDispatch();
  const showMenu = useSelector(state => state.menu.showMenu);
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
    <div className="flex w-[100vw] overflow-hidden justify-center my-16">
      <div className={showMenu ? "w-full flex justify-center" : " w-full flex justify-center"}>
        {/* video frame */}
        <div className="w-[1100px] flex flex-col">
          <iframe
            width="1100"
            height="600"
            src={"https://www.youtube.com/embed/" + videoId}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* video info */}
          <div className="p-2 py-4">
            <span className="font-bold text-[1.3rem]">{video?.snippet?.title}</span>

            {/* buttons  */}
            <div className="flex justify-between mt-4 mb-0 items-center">

              {/* left side div  */}
              <div className="flex gap-4  py-0 items-center">
                {/* channel info */}
                <Channelnfo channelId={video?.snippet?.channelId} />
                {/* subscribe button  */}
                <button className="rounded-full bg-black text-white text-sm px-3 py-2">Subscribe</button>
              </div>

              {/* right side div  */}
              <div className="flex gap-4 text-base justify-between">
                {/* like/dislike  buttons*/}
                <div className="flex px-3 py-2  bg-gray-100 rounded-full items-center">
                  <span className="border-r mx-1 flex items-center gap-1 px-3"><BiSolidLike />{formatCount(video?.statistics?.likeCount)}</span>
                  <span className="mx-1 px-3"><BiDislike /></span>
                </div>

                {/* share button  */}
                <div className="flex gap-2 px-4 py-1 bg-gray-100 rounded-full  items-center">
                  <PiShareFatLight /> Share
                </div>

                {/* download button  */}
                <div className="flex gap-2 px-4 py-1 bg-gray-100 rounded-full items-center">
                  <LuDownload /> Download
                </div>

                {/* save button  */}  
                <div className="flex gap-2 px-4 py-2 bg-gray-100 rounded-full  items-center">
                  <RiPlayListAddFill /> Save
                </div>
              </div>
            </div>
        </div>
          {/* description */}
          <div className="whitespace-pre-line w-[1100px] px-4 py-2 pb-4 border-gray-300 bg-gray-100 my-2 rounded-lg"> 
            <div className="flex gap-4 font-medium text-base mb-2 text-gray-800">
              <span>{formatCount(video?.statistics?.viewCount)} views</span>
              <span>{formatTimeAgo(video?.snippet?.publishedAt)}</span>
            </div>
            {video?.snippet?.description && <VideoDescription description={video?.snippet?.description} />}
            
          </div>
          {/* comments*/}
          <div className="w-[1100px]">
          {videoId && <CommentsContainer videoId={videoId}/>}
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
