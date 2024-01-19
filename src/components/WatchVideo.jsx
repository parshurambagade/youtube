import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { hideMenu } from "../utils/menuSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChatContainer from "./LiveChatContainer";
import { FETCH_VIDEO_DETAILS } from "../utils/constants";
import { BiDislike, BiLike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";

const WatchVideo = () => {
  const [video, setVideo] = useState({});

  // const dispatch = useDispatch();
  const showMenu = useSelector(state => state.menu.showMenu);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    getVideoDetails();
  }, []);

  const getVideoDetails = async () => {
    const data = await fetch(FETCH_VIDEO_DETAILS + videoId);
    const json = await data.json();
    setVideo(json?.items[0]);
    console.log(video);
  }
  
 

  return (
    <div className="flex flex-col w-full justify-center my-8">
      <div className={showMenu ? "w-full flex justify-normal" : " w-full flex justify-center"}>
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
            <span className="font-bold text-xl">{video?.snippet?.title}</span>

            {/* buttons  */}
            <div className="flex justify-between mt-4 mb-0">

              {/* left side div  */}
              <div className="flex gap-4">
                {/* channel info */}
                <div className="flex gap-2">
                <img src="https://cdn.pixabay.com/photo/2024/01/07/14/12/man-8493244_1280.jpg" alt="profile pic" className="rounded-full w-10 h-10"/>
                <div className="flex flex-col">
                  <span className="text-medium font-semibold">{video?.snippet?.channelTitle}</span>
                  <span className="text-gray-600">10.5k subscribers</span>
                </div>
                </div>
                {/* subscribe button  */}
                <button className="rounded-full bg-black text-white text-sm px-3 py-1">Subscribe</button>
              </div>

              {/* right side div  */}
              <div className="flex gap-4">
                {/* like/dislike  buttons*/}
                <div className="flex px-4 py-1 text-base bg-gray-100 rounded-full items-center">
                  <span className="border-r mx-1 flex items-center gap-1 px-3"><BiLike /> 100</span>
                  <span className="mx-1 px-3"><BiDislike /></span>
                </div>

                {/* share button  */}
                <div className="flex gap-2 px-4 py-2 bg-gray-100 rounded-full text-base items-center">
                  <PiShareFatLight /> Share
                </div>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="whitespace-pre-line px-4 py-2 border-gray-300 bg-gray-100 my-2 rounded-lg"> 
            {video?.snippet?.description}
          </div>
          <div>
        <CommentsContainer />
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
