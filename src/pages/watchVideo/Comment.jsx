import { useState } from "react";
import { formatCount, formatTimeAgo } from "../../utils/helpers";
import { BiDislike, BiLike } from "react-icons/bi";

const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  const {
    // eslint-disable-next-line react/prop-types
    authorDisplayName,authorProfileImageUrl,textOriginal,updatedAt,likeCount} = comment.snippet.topLevelComment.snippet;
    const replies =  comment?.replies?.comments;
  return (
    <>
    <div className="flex gap-2 lg:gap-4  p-2 lg:px-2 items-start my-0 lg:my-2 w-full overflow-hidden text-wrap">
      <img
        src={authorProfileImageUrl}
        alt="img"
        className="w-10 h-10    rounded-full border border-black"
      />
      <div className="w-[90%] lg:w-full text-wrap">
        <div className="flex gap-2">
          <h4 className="font-bold text-sm lg:text-base">{authorDisplayName}</h4>
          <p className="text-gray-700 text-xs lg:text-sm">{formatTimeAgo(updatedAt)}</p>
        </div>
        <p className="text-wrap text-sm lg:text-base">{textOriginal}</p>
        <div className="flex py-2 rounded-full  text-xl items-center">
          <span className=" flex items-center gap-1 ">
            <BiLike />
            {!likeCount ? null : <span className="text-base">{formatCount(likeCount)}</span>}
          </span>
          <span className="px-3">
            <BiDislike />
          </span>
          {replies?.length > 0 && <h5 className="font-medium text-base cursor-pointer text-blue-700" onClick={() => setShowReplies(!showReplies)}>{replies?.length} replies</h5>}
        </div>
        
      </div>
    </div>
    
   {showReplies && 
   <Replies replies={replies} />
   }
    </>
  );
};

export default Comment;


const Replies = ({replies}) => {
  return(
    <div className="ml-8 lg:ml-16">
      
      {replies && replies.map(reply =>
        <div key={reply.id} className=" p-2 lg:pb-4 lg:pt-0 flex gap-2">
          <img src={reply?.snippet?.authorProfileImageUrl} alt="profilePic" className="rounded-full h-9 w-9"/>
          <div>
          <p className="flex gap-2 text-sm text-wrap">
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