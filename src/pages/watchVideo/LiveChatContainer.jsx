import LiveChat from "./LiveChat"
import profile from "../../assets/R.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from "../../redux/liveChatSlice";
import { generateName, randomLiveChat, generateRandomImage } from "../../utils/helpers";
import { FaWindowClose } from "react-icons/fa";

const LiveChatContainer = ({setShowMobileLiveChat}) => {
    const [liveUsersChat, setLiveUsersChat] = useState("");

    const dispatch = useDispatch();
    const liveChat = useSelector((state) => state.liveChat);

    const liveChatContainerRef = useRef(null);

    useEffect(() => {
        const i = setInterval(() => {
            dispatch(addChat({
                name:generateName(),
                text:randomLiveChat(),
                profilePic: generateRandomImage()
            }));
        }, 1500);

        return () => clearInterval(i);
    },[])


    useEffect(() => {
        //automatically scrolls down when new chat is added
        liveChatContainerRef.current.scrollTop = liveChatContainerRef.current.scrollHeight;
    }, [liveChat]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addChat({
            name:"Default User",
            text:liveUsersChat,
            profilePic: profile
        }))
        setLiveUsersChat("");
    }
  return (
    <div className="w-full lg:w-[20vw] h-full border border-gray-200 rounded-lg shadow-md lg:h-[600px]  lg:mx-6 p-2  ">
        <div className="flex justify-between items-center px-2">
            <h2 className="my-1 h-[5%] font-medium ">Live chat:</h2>
            <span className="flex lg:hidden text-lg text-red-400 rounded-lg mb-2" onClick={() => {setShowMobileLiveChat(false)}}><FaWindowClose /></span>
        </div>
        
        <div className="h-[85%] overflow-y-scroll border-t" ref={liveChatContainerRef}>
            {liveChat.map((chat, i) => (<LiveChat key={i} name={chat.name} text={chat.text} profilePic={chat.profilePic}/>))}  
        </div>
        <form className=" h-[10%]  bg-white border-t flex gap-2 items-center w-full" onSubmit={handleSubmit} >
            <input type="text" name="liveChat" className="border my-2 lg:my-0 text-sm border-gray-400 px-2 py-1 w-[85%] rounded-xl" value={liveUsersChat} onChange={(e) => setLiveUsersChat(e.target.value)} placeholder="chat as a default user" autoComplete="off" />
            <button type="submit"  className="border text-sm   bg-gray-300 border-gray-700 text-black px-2 py-1 rounded-xl">Send</button>
        </form>
    </div>
  )
}

export default LiveChatContainer