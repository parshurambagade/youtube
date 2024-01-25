// import profilePic from "../assets/R.png";
const LiveChat = ({name, text, profilePic}) => {
  
  return (
    <div className="flex items-center gap-2 w-full0 p-2 ">
        <img src={profilePic} className="w-7 h-7 rounded-full border border-black" alt="profile pic" />
        <div className="">
        <span className="font-bold md:text-xl min-w-max">{name} </span>
        <span className="text-wrap md:text-lg">{text}</span>
        </div>
    </div>
  )
}

export default LiveChat