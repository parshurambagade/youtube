import CommentsList from "./CommentsList"
import { mockComments } from '../utils/mockComments';

const CommentsContainer = () => {
  return (
    <div className="px-4 py-2 w-[58vw]">
        <h2 className="text-xl font-bold">Comments:</h2>
        <CommentsList data={mockComments} />
    </div>
  )
}

export default CommentsContainer