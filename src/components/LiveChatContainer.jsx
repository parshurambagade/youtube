import LiveChat from "./LiveChat"
import { mockLiveChats } from '../utils/mockLiveChats';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from "../utils/liveChatSlice";
import { generateName, randomLiveChat } from "../utils/helpers";

const LiveChatContainer = () => {
    const [liveUsersChat, setLiveUsersChat] = useState("");

    const dispatch = useDispatch();
    const liveChat = useSelector((state) => state.liveChat);

    useEffect(() => {
        const i = setInterval(() => {
            dispatch(addChat({
                name:generateName(),
                text:randomLiveChat()
            }));
        }, 1500);

        return () => clearInterval(i);
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addChat({
            name:"Default User",
            text:liveUsersChat
        }))
        setLiveUsersChat("");
    }
  return (
    <div className="w-[20vw] border border-gray-600 rounded-lg h-[600px] mx-6 p-2 pb-0 ">
        <div className="h-[90%] overflow-y-scroll">
            {liveChat.map((chat, i) => (<LiveChat key={i} name={chat.name} text={chat.text} />))}
        </div>
        <form className=" h-[10%] bg-white border-t flex gap-2 items-center w-full" onSubmit={handleSubmit}>
            <input type="text" name="liveChat" className="border border-gray-400 px-2 py-1 w-[85%] rounded-xl" value={liveUsersChat} onChange={(e) => setLiveUsersChat(e.target.value)} placeholder="chat as a subscriber" autoComplete="off" />
            <button type="submit"  className="border border-blue-500 bg-blue-300 text-gray-800 px-2 py-1 rounded-xl">Send</button>
        </form>
    </div>
  )
}

export default LiveChatContainer