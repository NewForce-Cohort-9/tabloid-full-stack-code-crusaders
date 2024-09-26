import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Category = ({ category }) => {
  const userTypeId = localStorage.getItem("userTypeId");

  if (userTypeId !== "1") {
    return null; // Render nothing if the userTypeId is not 1
  }
  
  return (
    <Card>
      <CardBody>
        <p>
          {category.name}
          <Link to={`/category/edit/${category.id}`}>
            {" "}
            <Button color="primary" outline size="sm">
              Edit
            </Button>
          </Link>
          <Link to={`/category/delete/${category.id}`}>
            <Button color="success" outline size="sm">
              Delete
            </Button>
          </Link>
        </p>
      </CardBody>
    </Card>
  );
};
