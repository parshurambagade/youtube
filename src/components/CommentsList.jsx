import Comment from "./Comment"

const CommentsList = ({data}) => {
    return (<div>
        {data && data.map((comment,i) => (<div key={i}>
            <Comment key={i} comment={comment} />
        </div>)
        )}
        </div>
    )
    
    
   
}

export default CommentsList