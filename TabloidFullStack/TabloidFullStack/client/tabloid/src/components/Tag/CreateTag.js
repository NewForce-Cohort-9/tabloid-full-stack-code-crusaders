import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { addTag } from "../../Managers/TagManager.js";
import { Button, Col, Form, Input, Row } from "reactstrap";

export const CreateTag = () => {
    const [name, setName] = useState("");
    const userTypeId = localStorage.getItem("userTypeId");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTag = {
            name,
        };

        addTag(newTag).then((c) => {
            navigate("/Tag");
        });
    };

    if (userTypeId !== "1") {
        return null; // Render nothing if the userTypeId is not 1
      }


    return (
        <div className="create-container">
            <h1>Add a Tag</h1>
            <Form>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                    <Input
                        id="tag"
                        type="text"
                        placeholder="New Tag Name Here"
                        onChange={(e) => setName(e.target.value)}
                    />
                    </Col>
                    <Col>
                        <Button color="info" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
};

