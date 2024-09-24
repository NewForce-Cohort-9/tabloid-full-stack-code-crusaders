import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import { deletePost, getPostById } from "../../Managers/PostManager";

export const PostDelete = () => {
    const [post, setPost] = useState({});
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPostById(postId).then(postObj => setPost(postObj))
    }, [postId])

    const handleDelete = () => {
        deletePost(postId).then(() => {
            navigate("/Post");
        });
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="delete-container">
            <Card className="m-4">
                <CardBody>
                    <h1>Delete </h1>
                    <p>Are you sure you want to delete the Post: 
                        <strong>{post.title}</strong>?</p>
                    <Button color="danger" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                    <Button color="secondary" onClick={() => navigate("/Post")}>
                        Cancel
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};
