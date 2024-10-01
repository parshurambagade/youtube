/* eslint-disable react/prop-types */
import Comment from './Comment';
import useComments from "../../hooks/useComments";

const CommentsContainer = ({videoId}) => {
  
  const comments = useComments(videoId);

  if(comments===undefined || comments.length===0) return;
  
  return (
    <div className=" lg:px-0 py-2 w-full">
        <h2 className="text-base lg:text-xl font-bold">Top Comments:</h2>
        <div className="w-full">
        {comments.map((comment,i) => (
          <div key={i} className="w-full">
              <Comment key={i} comment={comment} />
          </div>)
        )}
        </div>
    </div>
  )
}

export default CommentsContainer