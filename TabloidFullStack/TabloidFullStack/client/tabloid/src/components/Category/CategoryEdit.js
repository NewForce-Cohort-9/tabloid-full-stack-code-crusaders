import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";
import {
  getAllCategories,
  updateCategory,
} from "../../Managers/CategoryManager.js";
import { Link, useNavigate, useParams } from "react-router-dom";

export const CategoryEdit = () => {
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((categories) => {
      const categoryToEdit = categories.find(
        (category) => category.id === parseInt(id)
      );
      if (categoryToEdit) {
        setName(categoryToEdit.name);
      }
    });
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    const editCategory = {
      id: parseInt(id),
      name,
    };
    updateCategory(editCategory).then(() => {
      navigate("/Category");
    });
  };

  return (
    <div className="category-container">
        <h1>Edit Category</h1>
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
                    <Button color="info" onClick={handleSave}>
                        Update Category
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
);
};
