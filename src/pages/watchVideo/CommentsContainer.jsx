import { FETCH_VIDEO_COMMENTS } from "../../data/constants";
import { useEffect, useState } from "react";
import Comment from './Comment';

const CommentsContainer = ({videoId}) => {
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    const data = await fetch(FETCH_VIDEO_COMMENTS + videoId);
    const json = await data.json();
    setComments(json.items);
  }
  return (
    <div className="px-4 py-2 w-full">
        <h2 className="text-xl font-bold">{comments.length} Top Comments:</h2>
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