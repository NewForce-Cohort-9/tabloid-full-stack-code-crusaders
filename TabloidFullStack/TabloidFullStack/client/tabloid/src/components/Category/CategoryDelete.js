import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { deleteCategory, getAllCategories } from "../../Managers/CategoryManager.js";

export const CategoryDelete = () => {
    const [category, setCategory] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories().then((categories) => {
            const categoryToDelete = categories.find((category) => category.id === parseInt(id));
            if (categoryToDelete) {
                setCategory(categoryToDelete);
            }
        });
    }, [id]);

    const handleDelete = () => {
        deleteCategory(id).then(() => {
            navigate("/Category");
        });
    };

    if (!category) return <p>Loading...</p>;

    return (
        <div className="delete-container">
            <h1>Delete Category</h1>
            <p>Are you sure you want to delete the Category: <strong>{category.name}</strong>?</p>
            <Button color="danger" onClick={handleDelete}>
                Confirm Delete
            </Button>
            <Button color="secondary" onClick={() => navigate("/Category")}>
                Cancel
            </Button>
        </div>
    );
};
