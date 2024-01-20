import profilePic from "../assets/R.png";
import { formatCount, formatTimeAgo } from "../utils/helpers";
import { BiDislike, BiLike } from "react-icons/bi";
const Comment = ({ comment }) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    authorChannelUrl,
    textOriginal,
    updatedAt,
    likeCount,
  } = comment.snippet.topLevelComment.snippet;
  const replies = comment?.replies?.comments;
  return (
    <div className="flex gap-4  p-2 items-start my-2">
      <img
        src={authorProfileImageUrl}
        alt="img"
        className="w-10 h-10    rounded-full border border-black"
      />
      <div className="">
        <div className="flex gap-2">
          <h4 className="font-bold text-lg">{authorDisplayName}</h4>
          <p className="text-gray-700">{formatTimeAgo(updatedAt)}</p>
        </div>
        <p>{textOriginal}</p>
        <div className="flex py-2 rounded-full  text-xl items-center">
                  <span className=" flex items-center gap-1 "><BiLike />{formatCount(likeCount)}</span>
                  <span className="mx-1 px-3"><BiDislike /></span>
                </div>
      </div>
      
    </div>
  );
};

export default Comment;
