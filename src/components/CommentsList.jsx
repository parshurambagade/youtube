import Comment from "./Comment"

const CommentsList = ({data}) => {
    return (<div>
        {data.map((comment,i) => (<div key={i}>
            <Comment key={i} comment={comment} />
            <div className="pl-10 border-l border-black">
                <CommentsList data={comment.replies} />
            </div>
        </div>)
        )}
        </div>
    )
    
    
   
}

export default CommentsList