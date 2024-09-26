import React, { useEffect, useState } from "react";
import { getCommentsByPostId } from "../../Managers/CommentManager.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { CommentCard } from "./Comment.js"

export const CommentList = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const navigate = useNavigate();
    
  
    useEffect(() => {
      getCommentsByPostId(id).then(commentsList => {
        setComments(commentsList);
        setLoading(false);
    })
    }, [id]); 


    return (
        <>
        {loading ? (
            <h1 style={{textAlign: "center", fontSize: "40px", marginTop: "5rem"}}>
                Loading...
            </h1>
        ) : (
            <div className="container">
                <div className="row justify-content-center">
                    { comments.length > 0 ? 
                    (
                    <>
                    <h2 style={{textAlign: "center", margin: "1.5rem 0"}}>Comments for Post: "{comments[0]?.post.title}"</h2>
                    <div className="row justify-content-center" style={{marginBottom: "1.5rem"}}>
                        <div className="col text-center" style={{marginBottom: "1.5rem"}}>
                            <Link to={`/comments/add/${id}`} 
                                className="comments-link ml-auto" 
                                style={{position: "absolute", left: "4rem"}}>
                            <Button color="dark" outline>Add Comment</Button>
                            </Link>
                            <Link to={`/post/${comments[0]?.post.id}`}>
                                <Button color="info">Back to Post</Button>
                            </Link>
                        </div>
                            <div className="cards-column">
                            {comments.map((comment) => (
                                <CommentCard key={comment.id} comment={comment} />
                                ))}
                            </div>
                    </div>
                    </>
                    )
                    :
                    (
                    <>
                    <div className="row justify-content-center" style={{marginBottom: "1.5rem"}}>
                        <h2 style={{textAlign: "center", margin: "1.5rem 0"}}>There are no comments for this post.</h2>
                        <div className="col text-center" style={{marginBottom: "1.5rem"}}>
                                <Link to={`/comments/add/${id}`} 
                                        className="comments-link ml-auto" 
                                        style={{display: "flex", justifyContent: "center", margin: "2rem 0", textDecoration: "none", color: "inherit"}}>
                                    <Button color="dark" outline>Add Comment</Button>
                                </Link>
                                <Button color="secondary" onClick={() => navigate(-1)}>Back to Post</Button>
                        </div>
                    </div>
                    </>
                    )
                    }
                </div>
            </div>
        )}
        </>
    )


}    