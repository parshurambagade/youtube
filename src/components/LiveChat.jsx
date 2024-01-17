import ProfilePic from "../assets/R.png";

const LiveChat = ({name, text}) => {
  return (
    <div className="flex items-center gap-2 w-full bg-gray-100 p-2 my-1">
        <img src={ProfilePic} className="w-7 rounded-full border border-black" alt="profile pic" />
        <div className="">
        <span className="font-bold min-w-max">{name} </span>
        <span className="text-wrap">{text}</span>
        </div>
    </div>
  )
}

export default LiveChat