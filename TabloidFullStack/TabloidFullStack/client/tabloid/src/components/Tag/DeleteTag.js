import { useNavigate, useParams } from "react-router-dom";
import { deleteTag, getAllTags } from "../../Managers/TagManager.js";
import { Button } from "reactstrap";
import { useEffect, useState } from "react";

export const DeleteTag = () => {
    const [tag, setTag] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const userTypeId = localStorage.getItem("userTypeId");

    useEffect(() => {
        // Fetch the tag details based on the ID for confirmation
        getAllTags().then((tags) => {
            const tagToDelete = tags.find((tag) => tag.id === parseInt(id));
            if (tagToDelete) {
                setTag(tagToDelete);
            }
        });
    }, [id]);

    const handleDelete = () => {
        deleteTag(id).then(() => {
            navigate("/Tag"); // Redirect to the TagList
        });
    };

    if (userTypeId !== "1") {
        return null; // Render nothing if the userTypeId is not 1
      }

    if (!tag) return <p>Loading...</p>;

    return (
        <div className="delete-container">
            <h1>Delete Tag</h1>
            <p>Are you sure you want to delete the tag: <strong>{tag.name}</strong>?</p>
            <Button color="danger" onClick={handleDelete}>
                Confirm Delete
            </Button>
            <Button color="secondary" onClick={() => navigate("/Tag")}>
                Cancel
            </Button>
        </div>
    );
};
