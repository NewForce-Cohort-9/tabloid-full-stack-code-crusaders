import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import { deletePost, getPostById } from "../../Managers/PostManager";

export const PostDelete = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPostById(id)
            .then(postObj => {
                setPost(postObj);
            })
            .catch(error => {
                console.error("Error fetching post:", error);
            });
    }, [id]);

    const handleDelete = () => {
        deletePost(id)
            .then(() => {
                navigate("/Post");
            })
            .catch(error => {
                console.error("Error deleting post:", error);
                alert("Failed to delete post. It may have existing comments or reactions.");
            });
    };


    if (!post) return <p>Post not found.</p>;

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
