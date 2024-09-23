import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../../Managers/PostManager";

export const PostDelete = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts().then((posts) => {
            const postToDelete = posts.find((post) => post.id === parseInt(id));
            if (postToDelete) {
                setPost(postToDelete);
            }
        });
    }, [id]);

    const handleDelete = () => {
        deletePost(id).then(() => {
            navigate("/Post");
        });
    };

    if (!category) return <p>Loading...</p>;

    return (
        <div className="delete-container">
            <Card className="m-4">
                <CardBody>
                    <h1>Delete </h1>
                    <p>Are you sure you want to delete the Category: 
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
