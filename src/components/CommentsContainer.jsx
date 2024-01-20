import CommentsList from "./CommentsList"
import { mockComments } from '../utils/mockComments';

const CommentsContainer = ({comments}) => {

  return (
    <div className="px-4 py-2 w-[58vw]">
        <h2 className="text-xl font-bold">{comments.length} Comments:</h2>
        {comments && <CommentsList data={comments} />}
    </div>
  )
}

export default CommentsContainer