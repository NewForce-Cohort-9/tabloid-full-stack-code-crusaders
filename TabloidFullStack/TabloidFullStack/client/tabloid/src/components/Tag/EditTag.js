import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTag, getAllTags } from "../../Managers/TagManager.js";
import { Button, Col, Form, Input, Row } from "reactstrap";

export const EditTag = () => {
    const [name, setName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetching the current tag details
        getAllTags().then((tags) => {
            const tagToEdit = tags.find((tag) => tag.id === parseInt(id));
            if (tagToEdit) {
                setName(tagToEdit.name);
            }
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTag = {
            id: parseInt(id), // Keep the tag's ID intact for editing
            name,
        };

        editTag(updatedTag).then(() => {
            navigate("/Tag");  // Redirect to the TagList
        });
    };

    return (
        <div className="edit-container">
            <h1>Edit Tag</h1>
            <Form>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Input
                            id="tag"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button color="info" onClick={handleSubmit}>
                            Update Tag
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
