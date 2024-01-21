import { formatCount, formatTimeAgo } from "../utils/helpers";
import { BiDislike, BiLike } from "react-icons/bi";

const Comment = ({ comment }) => {
  const {
    // eslint-disable-next-line react/prop-types
    authorDisplayName,authorProfileImageUrl,textOriginal,updatedAt,likeCount} = comment.snippet.topLevelComment.snippet;
    const replies =  comment?.replies?.comments;
  return (
    <>
    <div className="flex gap-4 p-2 items-start my-2 w-full">
      <img
        src={authorProfileImageUrl}
        alt="img"
        className="w-10 h-10    rounded-full border border-black"
      />
      <div className="w-full">
        <div className="flex gap-2">
          <h4 className="font-bold text-base">{authorDisplayName}</h4>
          <p className="text-gray-700">{formatTimeAgo(updatedAt)}</p>
        </div>
        <p className="text-wrap w-full">{textOriginal}</p>
        <div className="flex py-2 rounded-full  text-xl items-center">
          <span className=" flex items-center gap-1 ">
            <BiLike />
            {!likeCount ? null : <span className="text-base">{formatCount(likeCount)}</span>}
          </span>
          <span className="px-3">
            <BiDislike />
          </span>
        </div>
      </div>
    </div>
   {replies && <Replies replies={replies} />}
    </>
  );
};

export default Comment;


const Replies = ({replies}) => {
  return(
    <div className="ml-16">
      <h5 className="font-medium text-blue-700">{replies?.length} replies</h5>
      {replies && replies.map(reply =>
        <div key={reply.id} className=" p-4 flex gap-2">
          <img src={reply?.snippet?.authorProfileImageUrl} alt="profilePic" className="rounded-full h-9 w-9"/>
          <div>
          <p className="flex gap-2 text-sm">
            <span className="font-medium">{reply?.snippet?.authorDisplayName}</span>
            <span className="text-gray-700 font-normal">{formatTimeAgo(reply?.snippet?.publishedAt)}</span>
          </p>
          <p>{reply?.snippet?.textDisplay}</p>

          {/* like dislike buttons  */}
          <div className="flex py-2 rounded-full  text-xl items-center">
          <span className=" flex items-center gap-1 ">
            <BiLike />      
            {!reply?.snippet?.likeCount ? null : <span className="text-base">{formatCount(reply?.snippet?.likeCount)}</span>
}
          </span>
          <span className=" px-3">
            <BiDislike />
          </span>
        </div>
          </div>
        </div>
    )}
    </div>
  )
}