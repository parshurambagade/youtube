import LiveChat from "./LiveChat"
import profile from "../assets/R.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from "../utils/liveChatSlice";
import { generateName, randomLiveChat, generateRandomImage } from "../utils/helpers";

const LiveChatContainer = () => {
    const [liveUsersChat, setLiveUsersChat] = useState("");

    const dispatch = useDispatch();
    const liveChat = useSelector((state) => state.liveChat);

    const liveChatContainerRef = useRef(null);

    useEffect(() => {
        const i = setInterval(() => {
            dispatch(addChat({
                name:generateName(),
                text:randomLiveChat(),
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
        }))
        setLiveUsersChat("");
    }
  return (
    <div className="w-[20vw] border border-gray-600 rounded-lg h-[600px] mx-6 p-2  ">
        <h2 className="my-1 h-[5%] font-medium ">Live chat:</h2>
        <div className="h-[85%] overflow-y-scroll border-t" ref={liveChatContainerRef}>
            {liveChat.map((chat, i) => (<LiveChat key={i} name={chat.name} text={chat.text} />))}  
        </div>
        <form className=" h-[10%] bg-white border-t flex gap-2 items-center w-full" onSubmit={handleSubmit} >
            <input type="text" name="liveChat" className="border text-sm border-gray-400 px-2 py-1 w-[85%] rounded-xl" value={liveUsersChat} onChange={(e) => setLiveUsersChat(e.target.value)} placeholder="chat as a default user" autoComplete="off" />
            <button type="submit"  className="border text-sm  border-blue-500 bg-blue-300 text-gray-800 px-2 py-1 rounded-xl">Send</button>
        </form>
    </div>
  )
}

export default LiveChatContainer