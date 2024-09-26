import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../Managers/CategoryManager.js";
import { Button, Row, Form, Input, Col } from "reactstrap";

export const CategoryCreate = () => {
  const [name, setName] = useState("");
  const userTypeId = localStorage.getItem("userTypeId");

  
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      name,
    };
    addCategory(newCategory).then((c) => {
      navigate("/Category");
    });
  };
  
  if (userTypeId !== "1") {
    return null; // Render nothing if the userTypeId is not 1
  }

  return (
    <div className="create-container">
      <h1>Add Category</h1>
      <Form>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <Input
              id="category"
              type="text"
              placeholder="Name Here"
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
  );
};
